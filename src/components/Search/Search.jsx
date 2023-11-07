import { SearchWrapper, SearchForm, SearchLabel, SearchInput, SearchBtn, LimitContainer, RadioUl, RadioInput } from "./styled";
import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";

const Search = observer(({ handleSubmitClick, handleSearchChange, setLimitValue, limitValue }) => {
    const handleLimitChange = (e) => {
        PageStore.setLimit(e.target.value);
        PageStore.setPreviousUrl('');
        PageStore.setPage(1);
        setLimitValue(Number(e.target.value));
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
                    <li>10<RadioInput type="radio" value={10} name="limit" onChange={handleLimitChange} checked={limitValue === 10} /></li>
                    <li>20<RadioInput type="radio" value={20} name="limit" onChange={handleLimitChange} checked={limitValue === 20} /></li>
                    <li>50<RadioInput type="radio" value={50} name="limit" onChange={handleLimitChange} checked={limitValue === 50} /></li>
                </RadioUl>
            </LimitContainer>
        </SearchWrapper>
    )
});

export default Search;