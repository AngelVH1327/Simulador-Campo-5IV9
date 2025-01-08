import '../styles/Introduccion.css'
import imagen from '../../public/Campo_electrico.png'

export const Introduccion = () => {
  return (
    <div className='xd'>
         <div className="contenedor">
           <img src="logotipo_ipn.png" className="logo" alt=''/>
           <a href="/Introducion"><div className="menu">Inicio</div></a>
           <a href="/Instrucciones"><div className="menu">Instrucciones</div></a>
           <a href="/Teoria"><div className="menu">Teoría</div></a>
           <a href='/Simulador'><div className='menu'>Simulador</div></a>
           <a href="/SobreElProyecto"><div className="menu">Sobre el proyecto</div></a>
         </div>
    <div className="box"></div>
    <div className="principal">
    <div className="texto1">
        <h1>Simuladoor de Campo Eléctrico</h1>
        <h2>Visualiza y comprende el comportamiento de los campos eléctricos generados por múltiples cargas puntuales. 
            Ingresa hasta dos cargas de diferentes magnitudes y signos, para observar cómo se distribuyen las líneas de campo en el espacio, 
            y cómo interactúan entre sí.</h2>
        <div className="Botones">
            <div> <a href="/Simulador"><button className="boton1">Iniciar simulación</button></a></div>
            <div> <a href="/Instrucciones"><button className="boton2">Instrucciones</button></a></div>
            
        </div>
    </div>
    <div className="imagen">
        <br/><br/><br/>
        <img src="campo.png"/>
    </div>
</div>
</div>
  )
}
