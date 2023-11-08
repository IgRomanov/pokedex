import { MainDnd } from "./styled";
import { CardsColumn } from "../CardsColumn";
import { LocalStorageCardsColumn } from "../LocalStorageCardsColumn";

const Dnd = ({ currentCards }) => {
    return (
        <MainDnd>
            <CardsColumn currentCards={currentCards} />
            <LocalStorageCardsColumn />
        </MainDnd>
    );
}

export default Dnd;