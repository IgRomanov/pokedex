import { PopupWrapper } from "./styled";

const PokemonPopup = ({ isVisible, popupInfo }) => {
    const { height, weight, baseExperience } = popupInfo;
    return (
        <PopupWrapper $isVisible={isVisible}>
            <span>Height: {height}</span>
            <span>Weight: {weight}</span>
            <span>Base experience: {baseExperience}</span>
        </PopupWrapper>
    )
}

export default PokemonPopup;