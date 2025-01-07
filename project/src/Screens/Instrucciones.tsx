import '../styles/Instrucciones.css';

export const Instrucciones = () => {
  return (
    <div>
      <div className="contenedor">

      
        <img src="logotipo_ipn.png" className="logo" alt='' />
        <a href="/Introducion"><div className="menu" style={{ color: 'black' }}>Inicio</div></a>
        <a href="/Instrucciones"><div className="menu" style={{ color: 'black' }}>Instrucciones</div></a>
        <a href="/Teoria"><div className="menu" style={{ color: 'black' }}>Teoría</div></a>
        <a href='/Simulador'><div className='menu' style={{ color: 'black' }}>Simulador</div></a>
        <a href="/SobreElProyecto"><div className="menu" style={{ color: 'black' }}>Sobre el proyecto</div></a>
      </div>

      <div className="box"></div>

      <main className="instr-main">
        <div className="instr-content">
          <h1 className="instr-title">Instrucciones</h1>
          <p className="instr-intro">Sigue estos sencillos pasos para utilizar el simulador y observar los campos eléctricos generados por las cargas:</p>

          <div className="instr-grid">
            <div className="instr-card">
              <h3>Configuración de Cargas</h3>
              <h3>En el panel derecho, busca la sección "Configuración de Cargas"</h3>
              <h3>Ajusta los valores de "Carga 1" y "Carga 2" (valores positivos o negativos)</h3>
              <h3>La carga positiva es la roja, mientras que la negativa es la azul</h3>
              <h3>Modifica la "Distancia" para separar las cargas</h3>
            </div>

            <div className="instr-card">
              <h3>Visualización del Campo</h3>
              <h3>En la sección "Visualización", puedes activar/desactivar:</h3>
              <ul className="instr-list">
                <li>Líneas de Campo</li>
                <li>Flechas de Campo</li>
                <li>Superficies Equipotenciales</li>
              </ul>
              <h3>Ajusta la "Velocidad Rotación" para controlar la animación</h3>
            </div>

            <div className="instr-card">
              <h3>Medición de Puntos</h3>
              <h3>En "Punto de Medición", ingresa las coordenadas X, Y, Z</h3>
              <h3>Presiona "Medir en Punto" para crear un punto de medición</h3>
              <h3>Los resultados aparecerán en la sección "Resultados"</h3>
            </div>

            <div className="instr-card">
              <h3>Control de la Vista</h3>
              <h3>Usa el mouse para rotar la vista (clic izquierdo)</h3>
              <h3>Zoom con la rueda del mouse</h3>
              <h3>Pan/desplazamiento con clic derecho</h3>
              <h3>La cuadrícula del suelo te ayuda a orientarte en el espacio</h3>
            </div>
          </div>

          <div className='instr-tips'>
            <p>Consejos:</p>
            <p>La carga positiva es la roja, mientras que la negativa es la azul</p>
            <p>Usa diferentes combinaciones de cargas positivas y negativas para observar cómo afectan la forma del campo eléctrico.</p>
            <p>Experimenta con la distancia entre las cargas para ver cómo la proximidad influye en la intensidad del campo.</p>
          </div>
        </div>
      </main>
    </div>
  );
}