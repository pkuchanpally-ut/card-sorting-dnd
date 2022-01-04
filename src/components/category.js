import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import CardRow from './card-row';

const CategoryContainer = styled.div`
  margin: 0 10px;
  border: 1px solid lightgrey;
  padding 10px;
  margin: 5px 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

function Category({ cards, column }) {
  return (
    <Droppable droppableId={column.id}>
      {provided => (
        <CategoryContainer ref={provided.innerRef} {...provided.droppableProps}>
          <h3>{column.name}</h3>
            {column.cardIds.map((cardId, index) => {
              const card = cards[cardId];
              return (
                <Draggable draggableId={cardId} index={index} key={cardId}>
                  {provided => (
                    <CardRow
                      card={card}
                      provided={provided}
                      innerRef={provided.innerRef} />
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
        </CategoryContainer>
      )}
    </Droppable>
  );
}

export default Category;
