import { Draggable } from 'react-beautiful-dnd';
import CardRow from './card-row';


function CardColumn({ cards, column }) {
  return column.cardIds.map((cardId, index) => {
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
    );
  })
}

export default CardColumn
