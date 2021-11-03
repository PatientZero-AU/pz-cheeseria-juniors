import styled from 'styled-components';

export const RecentItem = styled.div`
    display: grid;
    height: 200px;
    width:400px;
    margin-bottom: 10px;
    align-items: end;
    /* grid-template-rows: 75% 25%; */
  
    img {
        grid-column: 1/-1;
        grid-row: 1/-1;
        height: 100%;
        width:100%;
        object-fit: cover;
    }
    div{
        grid-column: 1/-1;
        grid-row: 1/-1;
        height: max-content;
        color: white;
        background-color: rgba(0,0,0,0.5);
        padding: 10px;
    }
`;

export const RecentPurchasesContainer = styled.div`
    padding: 20px;
    width: 400px;
`;
