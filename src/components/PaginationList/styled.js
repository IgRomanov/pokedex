import styled from "styled-components";

export const PaginationListStyle = styled.ul`
    margin: 0;
    margin-top: 60px;
    padding: 0;
    padding-bottom: 90px;
    display: flex;
    list-style: none;
    justify-content: center;
    gap: 10px;
`;

export const ButtonAction = styled.button`
    & {
        padding: 0;
        width: 140px;
        height: 30px;
        cursor: pointer;
        border-radius: 15px;
        border: none;
        background-color: #ef73ff;
        border: 2px solid #55315c;
        transition: transform ease-in-out .4s;
    }
    &:hover {
        transform: scale(1.1);
    }
`;