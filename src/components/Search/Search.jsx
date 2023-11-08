import { SearchWrapper, SearchForm, SearchLabel, SearchInput, SearchBtn, LimitContainer, RadioUl, RadioInput } from "./styled";
import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useId } from "react";

const Search = observer(({ handleSubmitClick, handleSearchChange, setLimitValue, limitValue }) => {
    const limitBtnId = useId();

    const limitButtons = [10, 20, 30];

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
                    {
                        limitButtons.map((value, i) => (
                            <li key={`${limitBtnId}-${i}`}>{value}<RadioInput type="radio" value={value} name="limit" onChange={handleLimitChange} checked={limitValue === value} /></li>
                        ))
                    }
                </RadioUl>
            </LimitContainer>
        </SearchWrapper>
    )
});

export default Search;