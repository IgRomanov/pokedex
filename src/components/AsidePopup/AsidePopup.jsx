import styled from "styled-components";
import PokemonsStore from "../../store/PokemonsStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import PageStore from "../../store/PageStore";

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

const AsidePopup = observer(({ types, setCurrentData, currentData, setSelectedTypes, selectedTypes }) => {
    const [currentRendering, setCurrentRendering] = useState(PokemonsStore.allPokemons);

    const handleTypeClick = (e) => {
        if (e.target.value === 'reset') {
            PokemonsStore.setSelectedType([]);
            PokemonsStore.setCurrentMode('list');
            const getData = async () => {
                 try {
                     const { data } = await axios.get(`${BASE_URL}pokemon?limit=${PageStore.currentLimit}}&offset=${PageStore.currentOffset}}`);
                     PokemonsStore.setPokemons(data.results);
                     if (data.next) {
                         PageStore.setNextUrl(data.next);
                     };
                     if (data.previous) {
                         PageStore.setPreviousUrl(data.previous);
                     };
                 } catch (e) {
                    console.log(e);
                 }
            }
            getData();
        } else {
            PokemonsStore.setCurrentMode('search');
            if (!e.target.checked) {
                const filteredTypes = selectedTypes.filter((type) => type !== e.target.value);
                if (filteredTypes.length > 0) {
                    setSelectedTypes(selectedTypes.filter((type) => type !== e.target.value));
                } else {
                    PokemonsStore.setCurrentMode('list');
                    const getData = async () => {
                        try {
                            const { data } = await axios.get(`${BASE_URL}pokemon?limit=${PageStore.currentLimit}}&offset=${PageStore.currentOffset}}`);
                            PokemonsStore.setPokemons(data.results);
                            if (data.next) {
                                PageStore.setNextUrl(data.next);
                            };
                            if (data.previous) {
                                PageStore.setPreviousUrl(data.previous);
                            };
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    getData();
                }
            } else {
                setSelectedTypes([...selectedTypes, e.target.value]);
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