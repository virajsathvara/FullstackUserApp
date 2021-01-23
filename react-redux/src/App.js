import './App.css';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/login';
import SignUp from "./components/signup";
import Dashboard from './components/dashboard';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={LogIn} exact />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </main>
  );
}

export default App;
