import styled from "styled-components";
import PageStore from "../../store/PageStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const SearchWrapper = styled.div`
    background-color: black;
    padding-top: 30px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
`;

const SearchLabel = styled.label`
    display: block;
    width: 50%;
`;

const SearchInput = styled.input`
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

const SearchForm = styled.form`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;

const SearchBtn = styled.button`
    padding: 5px;
    padding-right: 10px;
    border: none;
    background-color: white;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const RadioUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 10px;
`;

const LimitContainer = styled.div`
    margin-left: auto;
    width: 20%;
`;

const RadioInput = styled.input`
    margin-left: 5px;
`;

const Search = observer(({ searchValue, handleSubmitClick, handleSearchChange, setLimitValue, limitValue }) => {
    const navigate = useNavigate();
    const handleLimitChange = (e) => {
        PageStore.setLimit(e.target.value);
        PageStore.setPreviousUrl('');
        PageStore.setPage(1);
        setLimitValue(Number(e.target.value));
        navigate("/1");
    };

    return (
        <SearchWrapper>
            <SearchForm onSubmit={handleSubmitClick}>
                <SearchLabel>
                    <SearchInput placeholder="Enter the name..." onChange={handleSearchChange}></SearchInput>
                </SearchLabel>
                <SearchBtn>Search</SearchBtn>
            </SearchForm>
            <LimitContainer>
                <h4>Cards per page:</h4>
                <RadioUl>   
                    <li>10<RadioInput type="radio" value={10} name="limit" onChange={handleLimitChange} checked={limitValue === 10 ? true : false} /></li>
                    <li>20<RadioInput type="radio" value={20} name="limit" onChange={handleLimitChange} checked={limitValue === 20 ? true : false} /></li>
                    <li>50<RadioInput type="radio" value={50} name="limit" onChange={handleLimitChange} checked={limitValue === 50 ? true : false} /></li>
                </RadioUl>
            </LimitContainer>
        </SearchWrapper>
    )
});

export default Search;