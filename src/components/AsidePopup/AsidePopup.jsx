import { useId } from "react";
import styled from "styled-components";
import PokemonsStore from "../../store/PokemonsStore";

const NavContainer = styled.nav`
    position: fixed;
    background-color: #3b3b3b;
    top: 12%;
    left: 1%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 10px 30px;
`;

const TypesUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavHeader = styled.h4`
    color: white;
    text-align: center;
`;

const RadioType = styled.input`
    display: none;
`;

const LabelType = styled.label`
    & {
        cursor: pointer;
        text-shadow: 0 0 2px #faba65;
        transition: box-shadow ease-in-out .4s;
        color: #faba65;
    }
    
    &:hover {
        text-shadow: 0 0 4px #ff8800;
    }
`;

const AsidePopup = ({ types }) => {
    const typeId = useId();

    const handleTypeClick = (e) => {
        PokemonsStore.setSelectedType([...PokemonsStore.selectedTypes, e.target.value])
    };

    return (
        <NavContainer>
            <NavHeader>Search by type:</NavHeader>
            <TypesUl>
                {types.map((type, index) => (
                    <LabelType key={`${type}-${index}`} onChange={handleTypeClick}><RadioType type="radio" name="type" value={type.name} />{type.name}</LabelType>
                ))}
            </TypesUl>
        </NavContainer>
    )
};  

export default AsidePopup;