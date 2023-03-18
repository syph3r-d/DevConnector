import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import Privateroute from "./components/routing/Privateroute";
import EditProfile from "./components/profileForms/EditProfile";
import Posts from "./components/post/Posts";
import Post from "./components/post/Post";
import "./App.css";

//Redux
import { Provider } from "react-redux"; //combine redux and react
import store from "./store";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import CreateProfile from "./components/profileForms/CreateProfile";
import AddExperience from "./components/profileForms/AddExperience";
import AddEducation from "./components/profileForms/AddEducation";
import Profiles from "./components/profile/Profiles";
import Profile from "./components/profile/Profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {


  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route
              exact
              path="/login"
              element={
                <section className="container">
                  <Alert />
                  <Login />
                </section>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <section className="container">
                  <Alert />
                  <Register />
                </section>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <Dashboard />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/create-profile"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <CreateProfile />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/edit-profile"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <EditProfile />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/add-experience"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <AddExperience />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/add-education"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <AddEducation />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/profiles"
              element={
                <Privateroute>
                  <section className="container">
                    <Profiles />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/profile/:id"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <Profile />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/posts"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <Posts />
                  </section>
                </Privateroute>
              }
            />
            <Route
              exact
              path="/post/:id"
              element={
                <Privateroute>
                  <section className="container">
                    <Alert/>
                    <Post />
                  </section>
                </Privateroute>
              }
            />
            
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
