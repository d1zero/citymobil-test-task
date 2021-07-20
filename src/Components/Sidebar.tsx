import styled from 'styled-components'

const Wrapper = styled.div`
    min-width: 224px;
    background-color: #E41A50;
    color:white;
    display: flex;
    justify-content: center;
`;

export default function Sidebar() {
    return (
        <Wrapper><h2>Sidebar</h2></Wrapper>
    )
}
