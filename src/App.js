import styled from "styled-components";
import bg from "./img/bg.jpg";
import { MainLayout } from "./styles/Layouts";

function App() {
    return (
        <AppStyled bg={bg} className="App">
            <MainLayout>

              <h1>Hello Mundo!</h1>

            </MainLayout>
        </AppStyled>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${(props) => props.bg});
    position: relative;
`;

export default App;
