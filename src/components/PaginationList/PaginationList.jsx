import { PaginationListStyle, ButtonAction } from "./styled";
import PageStore from "../../store/PageStore";
import PokemonsStore from "../../store/PokemonsStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

const PaginationList = observer(({ handlePreviousClick, handleNextClick, currentCards, isList }) => {
    const [searchParams] = useSearchParams();
    const currentId = searchParams.get("page");
    let lastPage;
    if (currentCards) {
        lastPage = Math.ceil(currentCards.length / PageStore.currentLimit);
    }
    return (
        <PaginationListStyle>
            <li>
                <ButtonAction disabled={isList ? !PageStore.previousUrl : PageStore.currentPage === 1} onClick={handlePreviousClick}>Previous</ButtonAction>
            </li>
            <li>
                <ButtonAction disabled={isList ? !PageStore.nextUrl : PageStore.currentPage === lastPage} onClick={handleNextClick}>Next</ButtonAction>
            </li>
        </PaginationListStyle>
    )
});

export default PaginationList;