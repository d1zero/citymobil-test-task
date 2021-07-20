import './App.css';
import Header from './Components/Header'
import Footer from './Components/Footer'
import Sidebar from './Components/Sidebar'
import Table from './Components/Table'
import styled from 'styled-components'

const Content = styled.div`
    width: 100%;
    height: 828px;
    background-color: #E41A50;
    color:white;
    display: flex;
    flex-direction: row;
`;

function App() {
    return (
        <div className="App">
            <Header />
            <Content>
                <Sidebar />
                <Table/>
            </Content>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
