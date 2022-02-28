import logo from './logo.png';
import './App.css';
import SearchBox from './react-components/SearchBox';
import NavigationMenu from './react-components/NavigationMenu';
import LoginPage from './react-components/LoginPage';
import CreateAnAccountPage from './react-components/CreateAnAccountPage';
import UserPage from './react-components/UserPage';
import Home from './react-components/Home';
import CreatePost from './react-components/CreatePost';
import PostPage from './react-components/PostPage';
import WishList from './react-components/WishList';
import AdminBlockList from './react-components/AdminBlockList';
import AdminFeedback from './react-components/AdminFeedback';
import AdminPostPage from './react-components/AdminPostPage';
import AdminUserPage from './react-components/AdminUserPage';
import ChooseDonee from './react-components/ChooseDonee';
import TermsConditons from './react-components/TermsConditons';
import ErrorPage from './react-components/ErrorPage';
import FAQpage from './react-components/FAQpage';
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
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/createanaccount' element={<CreateAnAccountPage/>} />
          <Route path='/navigationmenu' element={<NavigationMenu/>} />
          <Route path='/userpage' element={<UserPage/>} />
          <Route path='/createpost' element={<CreatePost/>} />
          <Route path='/postpage' element={<PostPage/>} />
          <Route path='/wishlist' element={<WishList/>} />
          <Route path='/choosedonee' element={<ChooseDonee/>} />
          <Route path='/admin/blocklist' element={<AdminBlockList/>} />
          <Route path='/admin/userpage' element={<AdminUserPage/>} />
          <Route path='/admin/postpage' element={<AdminPostPage/>} /> 
          <Route path='/admin/feedback' element={<AdminFeedback/>} /> 
          <Route path='/termsconditions' element={<TermsConditons/>} /> 
          <Route path='/error' element={<ErrorPage/>} /> 
          <Route path='/faq' element={<FAQpage/>} /> 
        </Routes>
      </BrowserRouter>
    );
  }
}


export default App;
