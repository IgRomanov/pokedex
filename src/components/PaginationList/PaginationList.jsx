import { PaginationListStyle, ButtonAction } from "./styled";
import PageStore from "../../store/PageStore";
import PokemonsStore from "../../store/PokemonsStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

const PaginationList = observer(({ handlePreviousClick, handleNextClick, currentCards }) => {
    const [searchParams] = useSearchParams();
    const currentId = searchParams.get("page");
    let lastPage;
    if (currentCards) {
        lastPage = Math.ceil(currentCards.length / PageStore.currentLimit);
    }
    return (
        <PaginationListStyle>
            {
                PokemonsStore.currentMode === 'list' ?
                    <>
                        <li>
                            <ButtonAction disabled={!PageStore.previousUrl} onClick={handlePreviousClick}>Previous</ButtonAction>
                        </li>
                        <li>
                            <ButtonAction disabled={!PageStore.nextUrl} onClick={handleNextClick}>Next</ButtonAction>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <ButtonAction disabled={currentId === 1 ? true : ''} onClick={handlePreviousClick}>Previous</ButtonAction>
                        </li>
                        <li>
                            <ButtonAction disabled={currentId >= lastPage ? true : ''} onClick={handleNextClick}>Next</ButtonAction>
                        </li>
                    </>
            }
        </PaginationListStyle>
    )
});

export default PaginationList;