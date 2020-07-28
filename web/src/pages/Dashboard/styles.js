import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;
     
    button {
      border: 0;
      background: none;
    }

    strong {
      color: #FFF;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Meetup = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #FFF;

  opacity: ${props => (props.past ? 0.6 : 1)};

  img {
    width: 100%;
  }

  strong {
    margin-top: 10px;
    display: block;
    color: ${props => (props.noRegistrations ? '#999' : '#7159c1')};
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${props => (props.noRegistrations ? '#999' : '#666')};
  }
`;
