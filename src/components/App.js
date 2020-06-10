import React from 'react';
import Header from '../components/ui/Header';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>}/>
          <Route exact path="/services" component={() => <div>Services</div>}/>
          <Route exact path="/customsoftware" component={() => <div>Custom software</div>}/>
          <Route exact path="/mobileapps" component={() => <div>Mobile apps</div>}/>
          <Route exact path="/websites" component={() => <div>Websites</div>}/>
          <Route exact path="/revolution" component={() => <div>Revolution</div>}/>
          <Route exact path="/aboutus" component={() => <div>About us</div>}/>
          <Route exact path="/contact" component={() => <div>Contact us</div>}/>
          <Route exact path="/estimate" component={() => <div>estimate</div>}/>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
