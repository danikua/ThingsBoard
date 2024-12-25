import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import BasicTable from './components/CharactersTable';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BasicTable />
    </ThemeProvider>
  );
}

export default App
