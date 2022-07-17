import styled from 'styled-components';

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;

  .cart-buttons {
    display: flex;
    justify-content: space-between;

    .purchase-button,
    .clear-button {
      border: 1px solid skyblue;
    }
  }
`;
