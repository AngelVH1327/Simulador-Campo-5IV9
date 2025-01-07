import { useState } from 'react';
import { Simulation } from '../Screens/Simulation';
import '../styles/nav.css'

const Navbar = () => {
  const [showSimulation, setShowSimulation] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const startSimulation = () => {
    setShowSimulation(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (showSimulation) {
    return <Simulation/>;
  }

  return (
    <nav className="navbar">
      <div className="mobile-menu">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <div className={`menu-content ${isMenuOpen ? 'show' : ''}`}>
        <a href="/Introducion" className="menu-item">Inicio</a>
        <a href="/Instrucciones" className="menu-item">Instrucciones</a>
        <a href="/Teoria" className="menu-item">Teoría</a>
        <a href="/Simulador" className="menu-item">Simulador</a>
        <a href="/SobreElProyecto" className="menu-item">Sobre el proyecto</a>
      </div>

      <div className="desktop-logo">
        <img src="logotipo_ipn.png" className="logo" alt="Logo IPN"/>
      </div>
    </nav>
  );
}

export default Navbar;
