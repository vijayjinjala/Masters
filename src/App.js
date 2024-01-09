import './App.css';
import Header from './componanats/Header'
// import Sidebar from './componanats/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Country from './componanats/Country'
import State from './componanats/State'
import City from './componanats/City'
import Modal from './componanats/Modal';
import Registration from './componanats/Registration';
import Login from './componanats/Login';
import Error from './componanats/Error';


function App() {
  return (
    <>
     <BrowserRouter>
    {/* <Header/> */}
    {/* <Sidebar/> */}
    <Routes>
    <Route path="/" element={<Login />}/>
    <Route path='header' element={<Header />}/>
      <Route path='country' element={<Country/>}/>
      <Route path='state' element={<State/>}/>
      <Route path='city' element={<City/>}/>
      <Route path='modal' element={<Modal/>}/>
      <Route path='registration' element={<Registration/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
