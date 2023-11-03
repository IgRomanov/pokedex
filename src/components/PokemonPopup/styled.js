import styled from "styled-components"

export const PopupWrapper = styled.div`
    position: absolute;
    visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
    opacity: ${props => props.$isVisible ? '1' : '.1'};
    display: flex;
    flex-direction: column;
    background-color: #e9dcff;
    padding: 40px 20px;
    border-radius: 16px;
    box-shadow: 0 0 15px purple;
    width: calc(100% - 90px);
    top: 0%;
    left: 50%;
    transform: translate(-50%, -0%);
    z-index: 2;
    transition: visibility ease-in-out .4s,
                opacity ease-in-out .4s;
`;