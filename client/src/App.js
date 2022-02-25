import logo from './logo.png';
import './App.css';
import SearchBox from './react-components/SearchBox';
import NavigationMenu from './react-components/NavigationMenu';
// Importing react-router-dom to use the React Router
import React from 'react';


class App extends React.Component {
  render() {
    return (
      <header className="Header">
        <img src={logo} className="logo" alt="logo" />
        <SearchBox/>
        <NavigationMenu/>
      </header>
    );
  }
}


export default App;
