import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 128px;
    background-color: #5C00CE;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
`;

export default function Header() {
    return (
        <Wrapper><h2>Header</h2></Wrapper>
    )
}
