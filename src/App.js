import { useState } from 'react';
import './App.css';
import { cardsData, columnsData, categoriesOrderData } from './mock-data';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CardColumn from './components/cards-column';
import Category from './components/category';
import CardsContainer from './components/cards-container';

const Container = styled.div`
  display: flex;
`;

const CategoriesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 1 70%;
  border: 1px solid lightgrey;
  border-radius: 4px;
  margin: 10px;
`;

function App() {
  const [cards, setCards] = useState(cardsData);
  const [columns, setColumns] = useState(columnsData);
  const [categoriesOrder, setCategoriesOrder] = useState(categoriesOrderData);

  const onDragEnd = ({ source, destination, draggableId}) => {
    if (!destination) return;

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const rearrangedCards = Array.from(start.cardIds);
      rearrangedCards.splice(source.index, 1);
      rearrangedCards.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        cardIds: rearrangedCards,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);

    const newStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  }

  return (
    <Container>
      <DragDropContext className="App" onDragEnd={onDragEnd}>
        <Droppable droppableId={columns['cards-1'].id}>
          {provided => (
            <CardsContainer provided={provided} innerRef={provided.innerRef}>
              <CardColumn cards={cards} column={columns['cards-1']} />
              {provided.placeholder}
            </CardsContainer>
          )}
        </Droppable>
        <CategoriesContainer>
          {categoriesOrder.map(categoryId => {
            const column = columns[categoryId];
            return <Category key={categoryId} column={column} cards={cards} />
          })}
        </CategoriesContainer>
      </DragDropContext>
    </Container>
  );
}

export default App;
