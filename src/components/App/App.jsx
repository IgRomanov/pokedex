/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import PokemonsStore from '../../store/PokemonsStore';
import PageStore from '../../store/PageStore';
import { useId } from 'react';
import axios from 'axios';
import PaginationList from "../PaginationList";
import Grid from "../Grid";
import Search from '../Search';
import AsidePopup from '../AsidePopup';
import { observer } from 'mobx-react-lite';
import { useDebounce } from "../../hooks/useDebounce";
import { getAllData, getTypes, getDataWithParams, getType } from '../../utils/api';
import { Dnd } from '../Dnd';

const App = observer(() => {
    const [,setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const [limitValue, setLimitValue] = useState(PageStore.currentLimit);
    const [types, setTypes] = useState([]);
    const [namesByType, setNamesByType] = useState([]);
    const [allData, setAlldata] = useState([]);
    const location = useLocation();
    const searchData = useDebounce(searchValue, 1000);

    const paginationId = useId();

    const getData = async () => {
        try {
            const { data } = await getDataWithParams(PageStore.currentOffset, PageStore.currentLimit);
            setAlldata(data.results);
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
    };

    const getDataByType = async (controller) => {
        try {
            const { data } = await getAllData(controller);
            setAlldata(data.results);
        } catch (e) {
            console.log(e)
        }
    };

    const getAllTypes = async () => {
        try {
            const { data } = await getTypes();
            setTypes(data.results);
        } catch (e) {
            console.log(e);
        }
    };

    const getCurrentType = async (type) => {
        try {
            const { data } = await getType(type);
            let names = data.pokemon.map(pokemon => pokemon.pokemon.name);
            setNamesByType([...namesByType, ...names]);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
    };

    const handlePreviousClick = async () => {
        const isList = namesByType.length === 0 && searchData === '';
        try {
            PageStore.setPage(PageStore.currentPage - 1);
            if (isList) {
                const { data } = await axios.get(PageStore.previousUrl)
                setAlldata(data.results);
                PokemonsStore.setPokemons(data.results);
                PageStore.setNextUrl(data.next);
                if (data.previous) {
                    PageStore.setPreviousUrl(data.previous);
                } else {
                    PageStore.setPreviousUrl('');
                };
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextClick = async () => {
        try {
            PageStore.setPage(PageStore.currentPage + 1);
            if (namesByType.length === 0 && searchData === '') {
                const { data } = await axios.get(PageStore.nextUrl)
                setAlldata(data.results);
                PokemonsStore.setPokemons(data.results);
                PageStore.setPreviousUrl(data.previous);
                if (data.next) {
                    PageStore.setNextUrl(data.next);
                } else {
                    PageStore.setNextUrl('');
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (PokemonsStore.selectedTypes.length > 0) {
            PokemonsStore.selectedTypes.forEach((type) => {
                getCurrentType(type);
            })
        } else {
            setNamesByType([]);
        }
    }, [PokemonsStore.selectedTypes])

    const currentCards = useMemo(() => {
        let data = allData;
        if (namesByType.length > 0) {
            data = data.filter(pokemon => namesByType.includes(pokemon.name));
        };
        if (searchData !== '') {
            data = data.filter(pokemon => pokemon.name.toLowerCase().includes(searchData.toLowerCase()))
        };
        if (location.pathname === "/dnd") {
            const localData = JSON.parse(localStorage.getItem('cards'));
            if (localData) {
                localData.forEach((localCard) => {
                    data = data.filter(card => card.name !== localCard.name);
                });
            }
        };
        return data;

    }, [namesByType, searchData, allData, location.pathname, PokemonsStore.lastAddedCard]);

    useEffect(() => {
        getData();
        getAllTypes();
        if (!JSON.parse(localStorage.getItem('cards'))) {
            localStorage.setItem('cards', JSON.stringify([]));
        };
    }, []);

    useEffect(() => {
        const filterController = new AbortController();
        const isList = namesByType.length === 0 && searchData === '';
        if (isList) {
            getData();
        } else {
            getDataByType(filterController);
        }
        PageStore.setPage(1);
        return () => {
            if (filterController.abort) {
                filterController.abort();
            }
        }
    }, [namesByType, searchData, limitValue]);

    useEffect(() => {
        if (location.pathname !== "/dnd") {
            setSearchParams({ page: PageStore.currentPage });
        }
    }, [PageStore.currentPage]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <>
                        <main>
                            <Search searchValue={searchValue} handleSearchChange={handleSearchChange} handleSubmitClick={handleSubmitClick} setLimitValue={setLimitValue} limitValue={limitValue} />
                            <Grid currentCards={currentCards} namesByType={namesByType} searchData={searchData} />
                            <PaginationList isList={namesByType.length === 0 && searchData === ''} currentCards={currentCards} handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick} paginationId={paginationId} />
                        </main>
                        <AsidePopup types={types} setNamesByType={setNamesByType} />
                    </>
                }/>
                <Route path="dnd" element={
                    <Dnd currentCards={currentCards} namesByType={namesByType} searchData={searchData} />
                }/>
            </Routes>
        </div>
    )
})
export default App;
