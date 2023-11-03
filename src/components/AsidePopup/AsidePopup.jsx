import { NavContainer, NavHeader, TypesUl, LabelType, CheckboxType } from "./styled";
import PokemonsStore from "../../store/PokemonsStore";
import { observer } from "mobx-react-lite";

const AsidePopup = observer(({ types, setNamesByType }) => {
    const handleTypeClick = (e) => {
        if (e.target.value === 'reset') {
            PokemonsStore.setSelectedType([]);
                setNamesByType([]);
        } else if (!e.target.checked) {
                PokemonsStore.setSelectedType(PokemonsStore.selectedTypes.filter((type) => type !== e.target.value));
                setNamesByType([]);
             
        } else {
            PokemonsStore.setSelectedType([...PokemonsStore.selectedTypes, e.target.value]);
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