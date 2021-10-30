import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import MovieList from './Components/MovieList';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
      <Route path='/' exact  render={(props)=>(
        <>
        <Banner {...props}/>
        <MovieList {...props}/>       
        </>
      )} />
      <Route path='/favourite' component={Favourite} />
      </Switch>
     </Router>
  );
}

export default App;
