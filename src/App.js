import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import PrivateHome from './components/PrivateHome/PrivateHome';

class App extends Component {

  render() {

    const HomeView = () => (
      <React.Fragment>
        {localStorage.getItem('isLoggedIn') ? <PrivateHome/>: <SignIn />}
      </React.Fragment>
    );

    const SignInView = () => (
      <React.Fragment>
        {localStorage.getItem('isLoggedIn') ?<HomeView /> : <SignIn />}
      </React.Fragment>
    );

    const SignUpView = () => (
      <React.Fragment>
        {localStorage.getItem('isLoggedIn') ? <HomeView /> : <SignUp />}
      </React.Fragment>
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/signin" component={SignInView} />
          <Route exact path="/signup" component={SignUpView} />
          <Route exact path="/home" component={HomeView} />
        </Switch>
      </Router>
    );
  }
}

export default App;