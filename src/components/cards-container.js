import styled from 'styled-components';

const Container = styled.div`
  flex: 1 1 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 4px;
  margin: 10px;
`;

function CardsContainer({provided, innerRef, children}) {
  return (
    <Container {...provided.droppableProps} ref={innerRef}>
      {children}
    </Container>
  );
}

export default CardsContainer;
