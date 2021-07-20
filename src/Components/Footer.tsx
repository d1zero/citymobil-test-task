import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 128px;
    background-color: #5C00CE;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Footer() {
    return (
        <Wrapper><h2>Sidebar</h2></Wrapper>
    )
}
