import React, { useState } from 'react';
import '../styles/Teoria.css';

export const Teoria = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div className="contenedor">
        <img src="logotipo_ipn.png" className="logo" alt='' />
        <a href="/Introducion"><div className="menu">Inicio</div></a>
        <a href="/Instrucciones"><div className="menu">Instrucciones</div></a>
        <a href="/Teoria"><div className="menu">Teoría</div></a>
        <a href='/Simulador'><div className='menu'>Simulador</div></a>
        <a href="/SobreElProyecto"><div className="menu">Sobre el proyecto</div></a>
      </div>

      <div className="box"></div>
      <div className="Teoria" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#fff'
      }}>
        {/* Teoría */}
        <div className="teoriaContenido" style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: '#333'
          }}>Concepto del Campo Eléctrico</h2>

          {/* Texto adicional con color negro */}
          <p style={{ color: '#000' }}>
            El concepto del vector del campo eléctrico no lo utilizó Michael Faraday, quien siempre pensó en términos de Líneas de fuerza. Si bien a estas líneas ya no asociamos la misma clase de realidad que Faraday, continúan proporcionándonos un modo conveniente e instructivo de representar el campo eléctrico, por lo que las usaremos con este propósito.
          </p>
          <p style={{ color: '#000' }}>
            La figura S muestra las líneas de fuerza que rodean a una carga puntual positiva. Esta figura puede concebirse como una extensión de la figura 2, obtenida al situar la carga de prueba en muchos puntos alrededor de la carga central. Para el objeto de las ilustraciones en esta sección, vemos a una "carga puntual" como una pequeña esfera uniforme de carga más bien que a un punto matemático real. Además, conviene tener presente, al observar tales dibujos, que muestran sólo un plano bidimensional de un modelo tridimensional.
          </p>
          <p style={{ color: '#000' }}>
            Nótense varias cualidades de la figura 5. (1) Las líneas de fuerza dan la dirección del campo eléctrico en cualquier punto. (En modelos más complejos, en los que las líneas de fuerza pueden tener una curvatura, es la dirección de la tangente a la línea de fuerza la que da la dirección de E.) Una carga de prueba positiva liberada en cualquier punto en la vecindad de la carga en la figura 5 experimentaría una fuerza de repulsión que actúa radialmente hacia afuera, y la carga de prueba se movería en esa dirección. De aquí que las líneas de fuerza de una carga puntual positiva estén dirigidas radialmente hacia afuera.
          </p>
          <p style={{ color: '#000' }}>
            (2) Las líneas de fuerza se originan en cargas positivas y terminan en cargas negativas. En la figura 5 no se muestran las cargas negativas, pero debemos imaginar que la carga positiva está rodeada por paredes de carga negativa, en las cuales terminan las líneas de fuerza. (3) Las líneas de fuerza se trazan de tal modo que el número de líneas por unidad de área de sección transversal (perpendicular a las líneas) sea proporcional a la magnitud del campo eléctrico. Imaginemos un elemento de superficie esférica de un área determinada cerca de la carga puntual, en donde penetrarían muchas líneas de fuerza.
          </p>
          <p style={{ color: '#000' }}>
            Conforme desplacemos dicha área radialmente hacia afuera, el número de líneas de fuerza que penetrarán el área será menor, porque las líneas de fuerza están más separadas a grandes distancias de la carga. Esto corresponde a la disminución del campo eléctrico y a un aumento de la distancia de la carga.
          </p>
          <p style={{ color: '#000' }}>
            Si la carga puntual de la figura 5 fuera negativa, el patrón de líneas de fuerza sería el mismo, excepto que todas las flechas apuntarían ahora hacia adentro. En este caso, la fuerza sobre una carga de prueba positiva estaría radialmente hacia adentro.
          </p>
          <p style={{ color: '#000' }}>
            La figura 6 muestra las líneas de fuerza de dos cargas positivas iguales: Imaginemos que las cargas comienzan muy lejos, en donde la influencia que ejercen entre sí es despreciable, y que cada una tiene líneas de fuerza como las mostradas en la figura 5 y luego se aproximan para formar el modelo de la figura 6. En el proceso, las líneas de fuerza que originalmente estaban entre las dos cargas han sido "empujadas" hacia los lados. Nótese que la concentración de líneas es menor en la región directamente entre las dos cargas. ¿Qué nos dice esto acerca de las fuerzas sobre una carga de prueba situada allí? Conforme nos alejamos de las cargas, las líneas de fuerza se vuelven casi radiales, característica de una sola carga de magnitud igual al total de las dos cargas.
          </p>
          <p style={{ color: '#000' }}>
            La figura 6 muestra que, en las regiones a izquierda y derecha del centro de las cargas, las líneas de fuerza son casi paralelas en el plano de la figura. Imaginemos ahora que el conjunto de dos cargas se extiende a una línea larga de cargas positivas apenas separadas, y consideremos únicamente la región cercana al centro de la línea y lejos de cualquier extremo. La figura 7 muestra las líneas de fuerza resultantes. Nótese que son realmente paralelas.
          </p>
          <p style={{ color: '#000' }}>
            La figura 8 muestra las líneas de fuerza en el caso de un dipolo eléctrico, dos cargas iguales de signos opuestos. Aquí puede verse cómo terminan las líneas de fuerza en la carga negativa. En este caso, la concentración de líneas de campo es más grande en la región entre las cargas. ¿Qué nos dice esto acerca del campo eléctrico allí? Imaginemos, como lo hicimos en el caso de la figura 6, que estas dos cargas están originalmente muy separadas y que se juntan. En lugar de que las líneas de fuerza sean repelidas de la región central, como en la figura 6, se llevan hacia la región central. Nótese la dirección del campo eléctrico a lo largo de la bisectriz del eje dipolar, lo cual calculamos en la sección anterior.
          </p>
        </div>

        {/* Imágenes Centradas */}
        <div className="imagenesCentradas" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          margin: '2rem 0'
        }}>
          <img src="img5.jpeg" alt="Imagen1" style={{
            maxWidth: '300px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }} onClick={() => openModal("img5.jpeg")} />
          <img src="img6.jpeg" alt="Imagen2" style={{
            maxWidth: '300px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }} onClick={() => openModal("img6.jpeg")} />
          <img src="img8.jpeg" alt="Imagen3" style={{
            maxWidth: '300px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }} onClick={() => openModal("img8.jpeg")} />
        </div>

        {/* Título de Problemas */}
        <h3 style={{
          textAlign: 'center',
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
          color: '#333'
        }}>Problemas</h3>

        {/* Otras Imágenes (problemas) */}
        <div className="divLibros" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div className="divResnick">
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: '#333'
            }}>Resnick Capitulo 28</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <img src="Problema18.png" alt="" style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }} onClick={() => openModal("Problema18.png")} />
              <img src="Problema20.png" alt="" style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }} onClick={() => openModal("Problema20.png")} />
              <img src="Problema22.png" alt="" style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }} onClick={() => openModal("Problema22.png")} />
            </div>
          </div>

          <div className="divSerway">
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: '#333'
            }}>Serway Capitulo 23</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <img src="Problema12Serway.png" alt="" style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }} onClick={() => openModal("Problema12Serway.png")} />
              <img src="Problema16Serway.png" alt="" style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }} onClick={() => openModal("Problema16Serway.png")} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal para imagen grande */}
      {modalImage && (
        <div className="modal" style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000'
        }} onClick={closeModal}>
          <div style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '80%',
          }} onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Imagen grande" style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px'
            }} />
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              borderRadius: '50%'
            }}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};
