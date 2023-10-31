import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import PokemonsStore from '../../store/PokemonsStore';
import PageStore from '../../store/PageStore';
import { useId } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';
import PaginationList from "../PaginationList/PaginationList";
import Grid from "../Grid/Grid";
import Search from '../Search/Search';
import AsidePopup from '../AsidePopup/AsidePopup';
import { observer } from 'mobx-react-lite';
import { filterBySearch, filterByTypes, filterByParams } from '../../utils/const';

const App = observer(() => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [limitValue, setLimitValue] = useState(PageStore.currentLimit);
    const [types, setTypes] = useState([]);
    const cardId = useId();
    const paginationId = useId();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
    };

    const resetFilter = () => {
        setSearchValue('');
        PokemonsStore.setSelectedType([]);
    };

    const handlePreviousClick = async () => {
        resetFilter();
        try {
            const dataToPush = [];
            PageStore.setPage(PageStore.currentPage - 1);
            const { data } = await axios.get(PageStore.previousUrl);
            data.results.forEach(async (pokemon, index) => {
                const currentPokemonId = Number(pokemon.url.split('/pokemon/')[1].replace('/', ''));
                const res = await axios.get(`${BASE_URL}pokemon/${currentPokemonId}`);
                dataToPush.push({ name: res.data.name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: res.data.base_experience })
                PokemonsStore.setPokemons(dataToPush);
            })
            PageStore.setPreviousUrl(data.previous);
            PageStore.setNextUrl(data.next);
            navigate(`/${PageStore.currentPage}`);
            if (data.previous) {
                PageStore.setPreviousUrl(data.previous);
            };
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextClick = async () => {
        resetFilter();
        try {
            const dataToPush = [];
            PageStore.setPage(PageStore.currentPage + 1);
            const { data } = await axios.get(PageStore.nextUrl);
            data.results.forEach(async (pokemon, index) => {
                const currentPokemonId = Number(pokemon.url.split('/pokemon/')[1].replace('/', ''));
                const res = await axios.get(`${BASE_URL}pokemon/${currentPokemonId}`);
                dataToPush.push({ name: res.data.name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: res.data.base_experience })
                PokemonsStore.setPokemons(dataToPush);
            })
            PageStore.setPreviousUrl(data.previous);
            PageStore.setNextUrl(data.next);
            navigate(`/${PageStore.currentPage}`);
            if (data.next) {
                PageStore.setNextUrl(data.next);
            };
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        const currentId = Number(window.location.pathname.slice(1));
        PageStore.setPage(currentId);
        const getData = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}pokemon?limit=100000&offset=0`);
                PokemonsStore.setPokemons(data.results);
                if (data.next) {
                    PageStore.setNextUrl(data.next);
                };
                if (data.previous) {
                    PageStore.setPreviousUrl(data.previous);
                };

            }
            catch (e) {
                console.log(e);
            }
        }
        getData();
    }, [PageStore.currentLimit]);

    const filteredPokemons = useMemo(() => {
        if (PokemonsStore.selectedTypes.length > 0 & searchValue.length > 0) {
            let filtredTasks = filterBySearch(PokemonsStore.allPokemons, searchValue);
            return filterByTypes(filtredTasks, PokemonsStore.selectedTypes);
        } else if (PokemonsStore.selectedTypes.length > 0) {
            return filterByTypes(PokemonsStore.allPokemons, PokemonsStore.selectedTypes);
        } else if (searchValue.length > 0) {
            return filterBySearch(PokemonsStore.allPokemons, searchValue);
        }
    }, [searchValue, PokemonsStore.selectedTypes]);

    useEffect(() => {
        axios.get(`${BASE_URL}type`)
            .then(res => res.data)
            .then((data) => {
                setTypes(data.results);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path=":id" element={
                    <main>
                        <Search handleSearchChange={handleSearchChange} handleSubmitClick={handleSubmitClick} setLimitValue={setLimitValue} limitValue={limitValue} />
                        <Grid cardId={cardId} limit={PageStore.currentLimit} />
                        <PaginationList handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick} paginationId={paginationId} />
                    </main>
                } />
            </Routes>
            <AsidePopup types={types} />
        </div>
    )
})
export default App;
