import logo from './logo.png';
import './App.css';
import SearchBox from './react-components/SearchBox';
import NavigationMenu from './react-components/NavigationMenu';
import LoginPage from './react-components/LoginPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';


class App extends React.Component {
  render() {
    return (
      /*<header className="Header">
        <img src={logo} className="logo" alt="logo" />
        <SearchBox/>
        <NavigationMenu/>
        <LoginPage />
      </header>*/
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/navigationmenu' element={<NavigationMenu/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}


export default App;
