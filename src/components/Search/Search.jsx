import { SearchWrapper, SearchForm, SearchLabel, SearchInput, SearchBtn, LimitContainer, RadioUl, RadioInput } from "./styled";
import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useId } from "react";

const Search = observer(({ handleSubmitClick, handleSearchChange, setLimitValue, limitValue }) => {
    const limitBtnId = useId();

    const limitButtons = [
        {
            value: 10,
        },
        {
            value: 20,
        },
        {
            value: 50,
        },
    ];

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
                        limitButtons.map((button, i) => (
                            <li key={`${limitBtnId}-${i}`}>{button.value}<RadioInput type="radio" value={button.value} name="limit" onChange={handleLimitChange} checked={limitValue === button.value} /></li>
                        ))
                    }
                </RadioUl>
            </LimitContainer>
        </SearchWrapper>
    )
});

export default Search;