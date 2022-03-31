import './App.css';
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
import TermsConditions from './react-components/TermsConditions';
import ErrorPage from './react-components/ErrorPage';
import FAQpage from './react-components/FAQpage';
import SearchPage from './react-components/SearchPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';

class App extends React.Component {
  	render() {
   		return (
      		<BrowserRouter>
        		<Routes>
					<Route path='/' element={<Home/>} />
					<Route exact path='/userpage/:userId' element={<UserPage/>}/>
          			<Route exact path='/admin/userpage/:userId' element={<AdminUserPage/>} />
					<Route path='/login' element={<LoginPage/>} />
					<Route path='/createanaccount' element={<CreateAnAccountPage/>} />
					<Route path='/search' element={<SearchPage/>} />
					<Route path='/userpage' element={<UserPage/>} />
					<Route path='/createpost' element={<CreatePost/>} />
					<Route path='/postpage/:id' element={<PostPage/>} />
					<Route path='/wishlist' element={<WishList/>} />
					<Route path='/admin/blocklist' element={<AdminBlockList/>} />
					<Route path='/admin/userpage' element={<AdminUserPage/>} />
					<Route path='/admin/postpage' element={<AdminPostPage/>} />
					<Route path='/admin/feedback' element={<AdminFeedback/>} />
					<Route path='/termsconditions' element={<TermsConditions/>} />
					<Route path='/error' element={<ErrorPage/>} />
					<Route path='/faqpage' element={<FAQpage/>} />
        		</Routes>
      		</BrowserRouter>
    	);
  	}
}

export default App;
