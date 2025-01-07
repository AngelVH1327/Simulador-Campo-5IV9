import '../styles/SobreP.css'

export const SobreElProyecto = () => {
  return (
    <div className='page-container'>
      <div className="contenedor">
        <img src="logotipo_ipn.png" className="logo" alt=''/>
        <a href="/Introducion"><div className="menu">Inicio</div></a>
        <a href="/Instrucciones"><div className="menu">Instrucciones</div></a>
        <a href="/Teoria"><div className="menu">Teoría</div></a>
        <a href='/Simulador'><div className='menu'>Simulador</div></a>
        <a href="/SobreElProyecto"><div className="menu">Sobre el proyecto</div></a>
      </div>
      <div className="box"></div>
      <div className="divSobre">
        <div className="divTextoSobre">
          <div className="divProyecto">
            <h1>Sobre el proyecto</h1>
            <p>Este proyecto tiene como objetivo crear una herramienta interactiva que permita a estudiantes, 
            profesores y entusiastas de la física explorar el comportamiento de los campos eléctricos generados 
            por múltiples cargas puntuales. Al ingresar diferentes configuraciones de cargas, los usuarios pueden 
            observar visualmente cómo las fuerzas y los campos eléctricos interactúan en un entorno controlado.
            </p>
          </div>

          <div className="divObj">
            <h2>Objetivo</h2>
            <p>Facilitar la comprensión de uno de los conceptos fundamentales de la física: el campo eléctrico. 
            A menudo, los estudiantes encuentran difícil visualizar la relación entre las cargas y los campos que generan, 
            y este software busca hacer más accesible y didáctica esa comprensión a través de simulaciones visuales.</p>
          </div>

          <div className="divProblematica">
            <h2>Problematica</h2>
            <p>El proyecto nació de la necesidad de crear herramientas educativas más interactivas y atractivas para el estudio 
            de conceptos complejos. Sabemos que el aprendizaje visual y práctico ayuda a consolidar conocimientos, por lo 
            que esta simulación busca ofrecer una experiencia de aprendizaje inmersiva y divertida, donde los usuarios puedan 
            experimentar libremente y descubrir por sí mismos las leyes que rigen los fenómenos eléctricos.</p>
          </div>

          <div className="divFuncion">
            <h2>Funcionalidades</h2>
            <ul>
              <li>Permite ingresar hasta dos cargas puntuales con diferentes magnitudes y posiciones en el plano.</li>
              <li>Genera una visualización del campo eléctrico, mostrando líneas de fuerza y vectores que representan la dirección e intensidad del campo.</li>
              <li>Ofrece opciones para ajustar la escala del campo y personalizar la visualización.</li>
              <li>Simula cómo diferentes configuraciones de cargas, tanto positivas como negativas, interactúan y modifican el campo eléctrico resultante.</li>
            </ul>
          </div>

          <div className="divDesarrolladores">
            <h2>Desarrolladores</h2>
            <p>Este proyecto fue diseñado y desarrollado por un equipo apasionado por la ciencia y la tecnología, con el deseo de 
            mejorar la educación y hacer que conceptos abstractos sean accesibles para todos.</p>
            <ul>
              <li>Hernández Barrios Samuel Rodrigo</li>
              <li>Madrazo Rivera Jonathan</li>
              <li>Marmolejo Barjas Arturo</li>
              <li>Valadez Hernández Angel Benjamín</li>
            </ul>
          </div>

          <div className="divAgradecimientos">
            <h2>Agradecimientos</h2>
            <p>Queremos expresar nuestro más sincero agradecimiento a el profesor José Trujillo Torres, por su constante apoyo, 
            guía y motivación durante el desarrollo de este proyecto, su dedicación no solo ha enriquecido nuestro conocimiento, 
            sino que también nos ha inspirado a buscar formas creativas de aplicar esos conceptos en herramientas útiles para la 
            enseñanza y el aprendizaje. Este proyecto es en gran parte, el resultado de sus enseñanzas, gracias por fomentar nuestra 
            curiosidad científica y por mostrarnos que la física no solo se estudia, sino que también se vive y se disfruta.</p>
          </div>
        </div>
      </div>
    </div>
  )
}