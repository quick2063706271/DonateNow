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
import ChooseDonee from './react-components/ChooseDonee';
import TermsConditions from './react-components/TermsConditions';
import ErrorPage from './react-components/ErrorPage';
import FAQpage from './react-components/FAQpage';
import SearchPage from './react-components/SearchPage';
import DefaultSearchPage from './react-components/DefaultSearchPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';

class App extends React.Component {

	// User Id in top level will be deleted once the front end is served with server
	// This mimics using session in server.
	state = {
		userId: -1,
	};

	setUserId = (id) => {
		this.setState({
			userId: id
		})
	} 
  
  	render() {
   		return (
      		<BrowserRouter>
        		<Routes>
					<Route path='/' element={<Home/>} />
					<Route exact path='/userpage/:userId' element={<UserPage/>}/>
					<Route path='/login' element={<LoginPage setUserId={this.setUserId}/>} />
					<Route path='/createanaccount' element={<CreateAnAccountPage/>} />
					<Route path='/search' element={<SearchPage/>} />
					<Route path='/defaultsearch' element={<DefaultSearchPage/>} />
					
					<Route path='/userpage' element={<UserPage userId={this.state.userId}/>} />
					<Route path='/createpost' element={<CreatePost/>} />
					<Route path='/postpage/:id' element={<PostPage  userId={this.state.userId}/>} />
					<Route path='/wishlist' element={<WishList/>} />
					<Route path='/choosedonee' element={<ChooseDonee/>} />
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
