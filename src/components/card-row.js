import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding 10px;
  margin: 5px 10px;
  border-radius: 4px;
  width: 100px;
`;

function CardRow({provided, innerRef, card}) {
  return (
    <Container
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}>
        {card.name}
    </Container>
  );
}

export default CardRow;
