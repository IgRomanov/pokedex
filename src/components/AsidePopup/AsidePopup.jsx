import styled from "styled-components";
import PokemonsStore from "../../store/PokemonsStore";
import { observer } from "mobx-react-lite";

const NavContainer = styled.nav`
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

const CheckboxType = styled.input`
    cursor: pointer;
`;

const LabelType = styled.label`
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

const AsidePopup = observer(({ types }) => {

    const handleTypeClick = (e) => {
        if (e.target.value === 'reset') {
            PokemonsStore.setSelectedType([]);
            PokemonsStore.setCurrentMode('list');
        } else {
            PokemonsStore.setCurrentMode('search');
            if (!e.target.checked) {
                PokemonsStore.setSelectedType(PokemonsStore.selectedTypes.filter((type) => type !== e.target.value));
            } else {
                PokemonsStore.setSelectedType([...PokemonsStore.selectedTypes, e.target.value]);
            }
        }

    };

    return (
        <NavContainer>
            <NavHeader>Search by type:</NavHeader>
            <form>
                <TypesUl>
                    {types.map((type, index) => (
                        <LabelType key={`${type}-${index}`} onChange={handleTypeClick} ><CheckboxType type="checkbox" name="type" value={type.name} />{type.name}</LabelType>
                    ))}
                    <input onClick={handleTypeClick} type="reset" value="reset" />
                </TypesUl>
            </form>
        </NavContainer>
    )
});

export default AsidePopup;