import styled from "styled-components"

const PopupWrapper = styled.div`
    position: absolute;
    visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
    opacity: ${props => props.$isVisible ? '1' : '.1'};
    display: flex;
    flex-direction: column;
    background-color: #e9dcff;
    padding: 40px 20px;
    border-radius: 16px;
    box-shadow: 0 0 15px purple;
    top: 5%;
    right: -60%;
    z-index: 2;
    transition: visibility ease-in-out .4s,
                opacity ease-in-out .4s;
`;

const PokemonPopup = ({ isVisible, height, weight, baseExperience }) => {
    return (
        <PopupWrapper $isVisible={isVisible}>
            <span>Height: {height}</span>
            <span>Weight: {weight}</span>
            <span>Base experience: {baseExperience}</span>
        </PopupWrapper>
    )
}

export default PokemonPopup;