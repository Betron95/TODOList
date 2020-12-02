import { ThemeProvider } from "styled-components";
import { mainTheme } from "../../styles/main-theme";
import Header from "../Header/Header";
import ToDoLists from "../ToDoLists/ToDoLists";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Header />
      <ToDoLists />
    </ThemeProvider>
  );
}

export default App;
