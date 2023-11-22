import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import CreateTopic from './Components/CreateTopic';
import MyTopics from './Components/MyTopics';
import MyProfile from './Components/MyProfile'
import TopicsView from './Components/TopicsView';
import ForumUserView from './Components/ForumUserView'
import EditProfileView from './Components/EditProfileView';
import EditTopicView from './Components/EditTopicView';
import TopicsByCategory from './Components/TopicsByCategory';

function App() {
  return (
    <Router>
    <Navbar/>
      <div className="content">
        <Routes>
          <Route path='/' element={
          <PrivateRoute>
            <HomePage/>
          </PrivateRoute>
          }></Route>
          <Route path='createTopic' element={
            <PrivateRoute>
              <CreateTopic/>
            </PrivateRoute>
          }/>
          <Route path='/my-topics' element={
            <PrivateRoute>
              <MyTopics/>
            </PrivateRoute>
          }/>
          <Route path='/my-profile' element={
            <PrivateRoute>
              <MyProfile/>
            </PrivateRoute>
          }/>
          <Route path='/topics/:topicId' element={
            <PrivateRoute>
              <TopicsView/>
            </PrivateRoute>
          }/>
          <Route path='/forum-user/:forumUserId' element={
            <PrivateRoute>
              <ForumUserView/>
            </PrivateRoute>
          }/>
          <Route path='/edit-myprofile' element={
            <PrivateRoute>
              <EditProfileView/>
            </PrivateRoute>
          }/>
          <Route path='/edit-topic/:topicId' element={
            <PrivateRoute>
              <EditTopicView/>
            </PrivateRoute>
          }/>
          <Route path='/category-topics/:category' element={
            <PrivateRoute>
              <TopicsByCategory/>
            </PrivateRoute>
          }/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
