import React, { useState } from 'react';
import './App.css';
import { Simulation } from './Screens/Simulation';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import { Introduccion } from './Screens/Introduccion';
import { Instrucciones } from './Screens/Instrucciones';
import { Teoria } from './Screens/Teoria';
import { SobreElProyecto } from './Screens/SobreElProyecto';


function App() {
  const [showSimulation, setShowSimulation] = useState(false);

  const startSimulation = () => {
    setShowSimulation(true);
  };

  if (showSimulation) {
    return <Simulation />;
  }

  return (
    <BrowserRouter>
      <div className=''>
        <Routes>
        <Route index path='/' element={<Introduccion/>}></Route>
        <Route path='/Introducion' element={<Introduccion/>}></Route>
        <Route path='/Instrucciones' element={<Instrucciones/>}></Route>
        <Route path='/Teoria' element={<Teoria/>}>
        </Route>
        <Route path='/Simulador' element={<Simulation/>}>
        </Route>
        <Route path='/SobreElProyecto' element={<SobreElProyecto/>}>
        </Route>
        </Routes>
      </div>
      </BrowserRouter>
    
  );
}

export default App;