import styled from "styled-components";

export const NavContainer = styled.nav`
    position: fixed;
    background-color: #3b3b3b;
    top: 12%;
    left: 1%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 10px 30px;
`;

export const TypesUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NavHeader = styled.h4`
    color: white;
    text-align: center;
`;

export const CheckboxType = styled.input`
    cursor: pointer;
`;

export const LabelType = styled.label`
    & {
        cursor: pointer;
        text-shadow: 0 0 2px #faba65;
        transition: box-shadow ease-in-out .4s;
        color: #faba65;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    &:hover {
        text-shadow: 0 0 4px #ff8800;
    }
`;