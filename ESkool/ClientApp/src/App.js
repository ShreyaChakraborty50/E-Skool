import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import Home from './routes/home/Home';
import Overview from "./routes/overview/Overview";
import Classes from './routes/classes/Classes';
import SessionStoreContext from "./store/SessionStoreContext";
import PostsStoreContext from "./store/PostsStoreContext";
import {useMemo, useState} from "react";
import ClassHome from "./routes/classhome/ClassHome";
function App() {
  const [userSession, setUserSession] = useState('');
  const [posts, setPosts] = useState(['Some of the students still did not join the google class room with @aust.edu email. Please join immediately otherwise you will not attend your final exam. Classroom invite link: https://classroom.google.com/c/MTcxMDU0MzE0ODUx?cjc=phgj3zy ‌ Class code: phgj3zy']);
  const providerValue = useMemo(() => ({userSession, setUserSession}), [userSession, setUserSession]);
  const postProviderValue = useMemo(() => ({posts, setPosts}), [posts, setPosts]);
  return (
    <div className='App'>
      <Router>
        <Switch>
          <SessionStoreContext.Provider value={providerValue}>
            <PostsStoreContext.Provider value={postProviderValue}>
              <Route  exact path ='/login'>
                <Login />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route exact path='/'>
                <Overview />
              </Route>
              <Route exact path="/classes">
                <Classes />
              </Route>
              <Route exact path="/classes/:id">
                <ClassHome />
              </Route>
            </PostsStoreContext.Provider>
          </SessionStoreContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
