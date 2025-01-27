import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
