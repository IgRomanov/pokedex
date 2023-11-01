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
import { useDebounce } from "../../hooks/useDebounce";

const App = observer(() => {
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [limitValue, setLimitValue] = useState(PageStore.currentLimit);
    const [types, setTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const searchData = useDebounce(searchValue, 1000);

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
        try {
            PageStore.setPage(PageStore.currentPage - 1);
            if (PokemonsStore.currentMode !== 'search') {
                const { data } = await axios.get(PageStore.previousUrl);
                PokemonsStore.setPokemons(data.results);
                PageStore.setPreviousUrl(data.previous);
                PageStore.setNextUrl(data.next);
                if (data.previous) {
                    PageStore.setPreviousUrl(data.previous);
                };
            } 
            navigate(`/${PageStore.currentPage}`);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextClick = async () => {
        try {
            PageStore.setPage(PageStore.currentPage + 1);
            if (PokemonsStore.currentMode !== 'search') {
                setCurrentData([]);
                const { data } = await axios.get(PageStore.nextUrl);
                PokemonsStore.setPokemons(data.results);
                PageStore.setPreviousUrl(data.previous);
                PageStore.setNextUrl(data.next);
                if (data.next) {
                    PageStore.setNextUrl(data.next);
                };
            }
            navigate(`/${PageStore.currentPage}`);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        if (searchValue === '') {
            const currentId = Number(window.location.pathname.slice(1));
            PageStore.setPage(currentId);
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

                }
                catch (e) {
                    console.log(e);
                }
            }
            getData();
        }
    }, [searchValue]);

    useEffect(() => {
        const getPokemonsByType = async (type) => {
            try {
                let dataNames = [];
                const { data } = await axios.get(`${BASE_URL}type/${type}`);
                data.pokemon.forEach((pokemon) => {
                    dataNames.push(pokemon.pokemon.name);
                });
                if (PokemonsStore.allLightData.length === 0) {
                    const { data } = await axios.get(`${BASE_URL}pokemon?limit=100000&offset=0.`);
                    PokemonsStore.setPokemons(data.results);
                    PokemonsStore.setPokemons(PokemonsStore.allPokemons.filter(pokemon => dataNames.includes(pokemon.name)));
                }

            } catch (e) {
                console.log(e);
            }
        }
        selectedTypes.forEach((type) => {
            getPokemonsByType(type);
        });

    }, [selectedTypes])

    useEffect(() => {
        const getAllData = async (limit = 100000, offset = 0) => {
            try {
                const { data } = await axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}.`);
                PokemonsStore.setAllLightData(data.results);
                PokemonsStore.setPokemons(PokemonsStore.allLightData.filter(pokemon => pokemon.name.includes(searchData)))

                // PokemonsStore.setPokemons(data.results);
                // PokemonsStore.setPokemons(PokemonsStore.allPokemons.filter(pokemon => pokemon.name.includes(searchData)));
                PokemonsStore.setCurrentMode('search');
                navigate("/1");
            } catch (e) {
                console.log(e);
            }
        }
        if (searchData !== '') {
            getAllData();
        } else {
            PokemonsStore.setCurrentMode('list');
        }
    }, [searchData])

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
                        <Search searchValue={searchValue} handleSearchChange={handleSearchChange} handleSubmitClick={handleSubmitClick} setLimitValue={setLimitValue} limitValue={limitValue} />
                        <Grid setCurrentData={setCurrentData} currentData={currentData} limit={PageStore.currentLimit} />
                        <PaginationList handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick} paginationId={paginationId} />
                    </main>
                } />
            </Routes>
            <AsidePopup types={types} setCurrentData={setCurrentData} currentData={currentData} setSelectedTypes={setSelectedTypes} selectedTypes={selectedTypes}/>
        </div>
    )
})
export default App;
