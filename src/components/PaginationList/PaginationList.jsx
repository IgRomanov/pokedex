import styled from "styled-components";

const PaginationListStyle = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    justify-content: center;
    gap: 10px;
`;

const PaginationList = ({currentNumbers, handlePreviousClick, paginationId, handleNextClick, disabledNext, disabledPrevious}) => {
    return (
        <PaginationListStyle>
            <li>
                <button disabled={disabledPrevious ? true : ''} onClick={handlePreviousClick}>Previous</button>
            </li>
            {
                currentNumbers.map((elem, index) => (
                    <li key={`${paginationId}-${index}`}>{elem}</li>
                ))

            }
            <li>
                <button disabled={disabledNext ? true : ''} onClick={handleNextClick}>Next</button>
            </li>
        </PaginationListStyle>
    )
};

export default PaginationList;