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
import { getAllData, getTypes } from '../../utils/api';

const App = observer(() => {
    const navigate = useNavigate();
    const [currentData, setCurrentData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [limitValue, setLimitValue] = useState(PageStore.currentLimit);
    const [types, setTypes] = useState([]);
    const [namesByType, setNamesByType] = useState([]);
    const searchData = useDebounce(searchValue, 1000);

    const paginationId = useId();

    const handleSearchChange = (e) => {
        PokemonsStore.setCurrentMode('search');
        setSearchValue(e.target.value);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
    };

    const handlePreviousClick = async () => {
        try {
            if (PokemonsStore.currentMode !== 'search') {
               const { data } = await axios.get(PageStore.previousUrl)
                PageStore.setPage(PageStore.currentPage - 1);
                PokemonsStore.setPokemons(data.results);
                PageStore.setPreviousUrl(data.previous);
                PageStore.setNextUrl(data.next);
                navigate(`/${PageStore.currentPage}`);
                if (data.previous) {
                    PageStore.setPreviousUrl(data.previous);
                };
            };
            PageStore.setPage(PageStore.currentPage - 1);
            navigate(`/${PageStore.currentPage}`);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextClick = async () => {
        try {
            if (PokemonsStore.currentMode !== 'search') {
                setCurrentData([]);
                const { data } = await axios.get(PageStore.nextUrl)
                PageStore.setPage(PageStore.currentPage + 1);
                PokemonsStore.setPokemons(data.results);
                PageStore.setPreviousUrl(data.previous);
                PageStore.setNextUrl(data.next);
                navigate(`/${PageStore.currentPage}`);
                if (data.next) {
                    PageStore.setNextUrl(data.next);
                };  
            };
            PageStore.setPage(PageStore.currentPage + 1);
            navigate(`/${PageStore.currentPage}`);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (PokemonsStore.currentMode === 'list') {
            const getData = async () => {
                try {
                    const { data } = await axios.get(`${BASE_URL}pokemon?offset=${PageStore.currentOffset}&limit=${PageStore.currentLimit}`);
                    PokemonsStore.setPokemons(data.results);
                    if (data.next) {
                        PageStore.setNextUrl(data.next);
                    };
                    if (data.previous) {
                        PageStore.setPreviousUrl(data.previous);
                    };
                } catch(e) {
                    console.log(e);
                }
            }
            getData();
        } else if (PokemonsStore.currentMode === 'search') {
            const getDataByType = async () => {
                try {
                    const { data } = await getAllData();
                    if (PokemonsStore.selectedTypes.length > 0) {
                        PokemonsStore.selectedTypes.forEach((type) => {
                            axios.get(`${BASE_URL}type/${type}`)
                                .then(res => res.data)
                                .then((dataOfType) => {
                                    let names = dataOfType.pokemon.map(pokemon => pokemon.pokemon.name);
                                    setNamesByType([...namesByType, ...names]);
                                    
                                })
                        })
                        PokemonsStore.setPokemons(data.results
                            .filter(pokemon => namesByType.includes(pokemon.name))
                            .filter(pokemon => pokemon.name.toLowerCase().includes(searchData.toLowerCase())));
                    } else {
                        PokemonsStore.setPokemons(data.results.filter(pokemon => pokemon.name.toLowerCase().includes(searchData.toLowerCase())));
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            getDataByType()         
        }
    }, [searchData, PokemonsStore.selectedTypes]);  
   
    useEffect(() => {
        const getTypes = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}type`);
                setTypes(data.results);
            } catch (e) {
                console.log(e);
            }
        };
        getTypes();
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
            <AsidePopup types={types} />
        </div>
    )
})
export default App;
