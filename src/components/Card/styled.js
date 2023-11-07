import styled from "styled-components";

export const CardWrapper = styled.div`
    & {
        position: relative;
        padding: 18px 10px;
        background-color: #ffffff;
        border: 3px solid purple;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        cursor: ${props => props.$cursor};
        color: black;
        height: 265px;
        transition: background-color ease-in-out .4s,
                    border ease-in-out .4s;
    }
    &:hover {
        background-color: rgba(255, 255, 255, .8);
        border: 3px solid orange;
    }

`;

export const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
`;

export const ListElement = styled.li`
    text-shadow: 1px 1px 2px #faba65;
    color: #faba65;
`;

export const Avatar = styled.img`
    width: 100px;
    height: 100px;
`