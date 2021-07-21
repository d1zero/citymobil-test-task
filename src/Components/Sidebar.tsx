import styled from 'styled-components'

const Wrapper = styled.div`
    min-width: 224px;
    min-height: auto;
    background-color: #E41A50;
    color: white;
    display: flex;
    justify-content: center;
    min-height: 828px;
`;

export default function Sidebar() {
    return (
        <Wrapper><h2>Sidebar</h2></Wrapper>
    )
}
