import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from './scenes/homePage/HomePage';
import LoginPage from './scenes/loginPage/LoginPage';
import './index.css';

function App() {
  return <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} errorElement={<h1>Error</h1>}/>
        <Route path='login' element={<LoginPage />} errorElement={<h1>Error</h1>}/>
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
