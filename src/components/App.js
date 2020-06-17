import React, {useState} from 'react';
import Header from '../components/ui/Header';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../components/ui/footer';
import LandingPage from '../components/ui/landingpage';
import Services from '../components/ui/services';
import CustomSoftware from './ui/CustomSoftware';
import MobileApps from './ui/MobileApps';
import Websites from './ui/Websites';
import Revolution from './ui/Revolution';

function App() {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
        <Switch>
          <Route exact path="/" render={ (props) =>  <LandingPage setValue={setValue} setSelectedIndex={setSelectedIndex}/> }/>
          <Route exact path="/services" render={(props) => <Services setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
          <Route exact path="/customsoftware" render={(props) => <CustomSoftware setSelectedIndex={setSelectedIndex}/>}/>
          <Route exact path="/mobileapps" render={(props) => <MobileApps setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
          <Route exact path="/websites" render={(props) => <Websites setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
          <Route exact path="/revolution" render={(props) => <Revolution setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
          <Route exact path="/aboutus" component={() => <div>About us</div>}/>
          <Route exact path="/contact" component={() => <div>Contact us</div>}/>
          <Route exact path="/estimate" component={() => <div>estimate</div>}/>
        </Switch>
        <Footer value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
