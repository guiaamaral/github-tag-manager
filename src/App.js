import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddUser from "./pages/AddUser";
import AllUsers from "./pages/AllUsers";
import SingleUser from "./pages/SingleUser";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Mulish',
    h1: {
      fontSize: '36px'
    },
    h2: {
      fontSize: '28px'
    }
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/usuarios/:profile" component={SingleUser} />
          <Route exact path="/usuarios" component={AllUsers} />
          <Route path="/adicionar-usuario" component={AddUser} />
          <Route path="/" component={AddUser} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;