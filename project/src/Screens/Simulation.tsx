import React, { useEffect, useRef } from 'react';
import { SimulacionCampoElectrico } from '../simulation/ElectricFieldSimulation';



export function Simulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<SimulacionCampoElectrico | null>(null);

  useEffect(() => {
    if (containerRef.current && !simulationRef.current) {
      // Inicializar la simulación solo cuando el componente se monte
      simulationRef.current = new SimulacionCampoElectrico();
    }

    // Cleanup cuando el componente se desmonte
    return () => {
      if (simulationRef.current) {
        // Limpiar recursos
        const container = containerRef.current;
        if (container && container.firstChild) {
          container.removeChild(container.firstChild);
        }
        simulationRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="simulation-container" 
      className="w-full h-screen bg-gradient-to-b from-gray-900 to-blue-900"
    />
  );
}