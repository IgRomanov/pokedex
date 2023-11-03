import styled from "styled-components";

export const SearchWrapper = styled.div`
    background-color: black;
    padding-top: 30px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
`;

export const SearchLabel = styled.label`
    display: block;
    width: 50%;
`;

export const SearchInput = styled.input`
    border: none;
    padding: 5px;
    padding-left: 10px;
    width: 100%;
    display: block;
    margin: 0 auto;
    box-sizing: border-box;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
`;

export const SearchForm = styled.form`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

export const SearchBtn = styled.button`
    padding: 5px;
    padding-right: 10px;
    border: none;
    background-color: white;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
`;

export const RadioUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 10px;
`;

export const LimitContainer = styled.div`
    margin-left: auto;
    width: 20%;
`;

export const RadioInput = styled.input`
    margin-left: 5px;
    cursor: pointer;
`;