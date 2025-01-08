import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { gsap } from 'gsap';
import './style.css';

export class SimulacionCampoElectrico {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private charges: THREE.Mesh[] = [];
  private fieldLines: THREE.Line[] = [];
  private fieldArrows: THREE.ArrowHelper[] = [];
  private equipotentialSurfaces: THREE.Object3D[] = [];
  private measurementPoint: THREE.Mesh | null = null;
  private gui: dat.GUI;
  private k: number = 8.99e9;
  private settings = {
    mostrarLineasCampo: true,
    mostrarFlechasCampo: true,
    mostrarSuperficiesEquipotenciales: false,
    valorCarga1: "1",
    valorCarga2: "-1",
    distancia: "4",
    potencialElectrico: "0",
    medirX: "0",
    medirY: "0",
    medirZ: "0",
    magnitudCampo: "0",
    velocidadRotacion: 1,
    agregarPuntoMedicion: () => this.addMeasurementPoint()
  };

  private static instance: SimulacionCampoElectrico | null = null;

  constructor() {
    if (SimulacionCampoElectrico.instance) {
      return SimulacionCampoElectrico.instance;
    }
    SimulacionCampoElectrico.instance = this;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.init();
    
    const existingGui = document.querySelector('.dg.main');
    if (!existingGui) {
      this.gui = new dat.GUI({ autoPlace: false });
      const container = document.getElementById('gui-container') || this.createGuiContainer();
      container.appendChild(this.gui.domElement);
    } else {
      this.gui = (existingGui as any).__gui;
    }

    this.setupGUI();
    this.animate();
  }

  private createGuiContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'gui-container';
    
    // Crear el botón para mostrar/ocultar controles
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-gui';
    toggleButton.textContent = 'Ocultar Controles';
    
    // Función para alternar la visibilidad del GUI
    const toggleGui = () => {
        if (window.innerWidth <= 768) {
            // Lógica para móvil
            const isVisible = container.classList.contains('visible');
            container.classList.toggle('visible');
            toggleButton.textContent = isVisible ? 'Mostrar Controles' : 'Ocultar Controles';
        } else {
            // Lógica para desktop
            const isHidden = container.classList.contains('hidden');
            container.classList.toggle('hidden');
            toggleButton.textContent = isHidden ? 'Ocultar Controles' : 'Mostrar Controles';
        }
    };
    
    // Evento click para el botón
    toggleButton.addEventListener('click', toggleGui);
    
    // Estado inicial según el dispositivo
    if (window.innerWidth <= 768) {
        container.classList.remove('visible');
        toggleButton.textContent = 'Mostrar Controles';
    }
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            container.classList.remove('hidden');
            container.classList.remove('visible');
            toggleButton.textContent = 'Mostrar Controles';
        } else {
            container.classList.remove('visible');
            container.classList.remove('hidden');
            toggleButton.textContent = 'Ocultar Controles';
        }
    });
    
    document.body.appendChild(container);
    document.body.appendChild(toggleButton);
    return container;
}
  private init(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 2, 5);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    
    this.scene.add(ambientLight, directionalLight, hemisphereLight);

    const grid = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    this.scene.add(grid);

    const bgGeometry = new THREE.SphereGeometry(50, 32, 32);
    const bgMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0x1a1a1a) },
        color2: { value: new THREE.Color(0x000000) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
      side: THREE.BackSide
    });
    
    const background = new THREE.Mesh(bgGeometry, bgMaterial);
    this.scene.add(background);

    window.addEventListener('resize', () => this.onWindowResize());
    this.updateChargePositions();
  }

  private setupGUI(): void {
    // Personalizar el estilo del GUI
    const customCSS = `
        .dg.main {
            font-family: 'Roboto', sans-serif;
            text-shadow: none !important;
        }
        .dg.main .close-button {
            display: none;
        }
        .dg .cr.number input[type=text] {
            background: rgba(45, 45, 55, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            padding: 2px 5px;
            color: #ffffff;
        }
        .dg .c select {
            background: rgba(45, 45, 55, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            padding: 2px 5px;
            color: #ffffff;
        }
        .dg .c .slider {
            background: rgba(45, 45, 55, 0.9);
            border-radius: 4px;
        }
        .dg .cr.function:hover {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }
        .dg .folder {
            border-left: 3px solid rgba(255, 255, 255, 0.1);
            margin-left: 4px;
            padding-left: 6px;
        }
        .dg li:not(.folder) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 4px 0;
        }
        .dg .property-name {
            color: #88ccff;
            font-weight: 500;
        }
        .dg .c input[type=text] {
            margin-top: 2px;
            margin-bottom: 2px;
        }
        .dg .button {
            background: linear-gradient(45deg, #4a90e2, #357abd);
            border-radius: 4px;
            padding: 6px;
            text-align: center;
            transition: all 0.3s ease;
        }
        .dg .button:hover {
            background: linear-gradient(45deg, #357abd, #2868a0);
        }
    `;

    const style = document.createElement('style');
    style.textContent = customCSS;
    document.head.appendChild(style);

    const visualizacionFolder = this.gui.addFolder('🎨 Visualización');
    const cargasFolder = this.gui.addFolder('⚡ Configuración de Cargas');
    const medicionFolder = this.gui.addFolder('📍 Punto de Medición');
    const resultadosFolder = this.gui.addFolder('📊 Resultados');

    const folders = [visualizacionFolder, cargasFolder, medicionFolder, resultadosFolder];
    folders.forEach(folder => {
        const titleRow = folder.domElement.querySelector('.title') as HTMLElement;
        if (titleRow) {
            titleRow.style.cursor = 'pointer';
            titleRow.addEventListener('click', () => {
                folder.closed = !folder.closed;
            });
        }
    });


    // Agregar controles a visualizacionFolder
    visualizacionFolder.add(this.settings, 'mostrarLineasCampo')
        .name('Líneas de Campo')
        .onChange(() => this.updateVisualization());
    
    visualizacionFolder.add(this.settings, 'mostrarFlechasCampo')
        .name('Flechas de Campo')
        .onChange(() => this.updateVisualization());
    
    visualizacionFolder.add(this.settings, 'mostrarSuperficiesEquipotenciales')
        .name('Superficies Equipotenciales')
        .onChange(() => this.updateVisualization());

    visualizacionFolder.add(this.settings, 'velocidadRotacion', 0, 5)
        .name('Velocidad Rotación')
        .step(0.1);
    
    // Agregar controles a cargasFolder
    cargasFolder.add(this.settings, 'valorCarga1')
        .name('Carga 1 (C)')
        .onChange(() => {
            this.updateChargePositions();
            if (this.measurementPoint) this.addMeasurementPoint();
        });
    
    cargasFolder.add(this.settings, 'valorCarga2')
        .name('Carga 2 (C)')
        .onChange(() => {
            this.updateChargePositions();
            if (this.measurementPoint) this.addMeasurementPoint();
        });

        cargasFolder.add(this.settings, 'distancia')
        .name('Distancia (m)')
        .onChange((value: string) => {
            const numValue = parseFloat(value);
            if (numValue < 0) {
                alert('No puedes ingresar distancias negativas');
                this.settings.distancia = "1";
            } else {
                this.settings.distancia = value;
            }
            this.updateChargePositions();
            if (this.measurementPoint) this.addMeasurementPoint();
        });

    // Agregar controles a medicionFolder
    medicionFolder.add(this.settings, 'medirX').name('Posición X');
    medicionFolder.add(this.settings, 'medirY').name('Posición Y');
    medicionFolder.add(this.settings, 'medirZ').name('Posición Z');
    medicionFolder.add(this.settings, 'agregarPuntoMedicion').name('Medir en Punto');
    
    // Agregar controles a resultadosFolder - Solo mostrar campo eléctrico
    const magnitudCampoController = resultadosFolder.add(this.settings, 'magnitudCampo')
        .name('Campo Eléctrico')
        .listen();
    
    // Hacer el campo eléctrico de solo lectura
    const magnitudInput = magnitudCampoController.domElement.querySelector('input');
    if (magnitudInput) {
        magnitudInput.readOnly = true;
        magnitudInput.style.opacity = '0.7';
        magnitudInput.style.cursor = 'default';
    }

    // Abrir todos los folders
    [visualizacionFolder, cargasFolder, medicionFolder, resultadosFolder].forEach(folder => folder.open());
}

  private updateChargePositions(): void {
    this.charges.forEach(charge => this.scene.remove(charge));
    this.charges = [];

    const distance = parseFloat(this.settings.distancia) / 2;
    this.createCharge(parseFloat(this.settings.valorCarga1), new THREE.Vector3(-distance, 0, 0));
    this.createCharge(parseFloat(this.settings.valorCarga2), new THREE.Vector3(distance, 0, 0));

    this.updateVisualization();
  }

  private createCharge(value: number, position: THREE.Vector3): void {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: value > 0 ? 0xff4444 : 0x4444ff,
      emissive: value > 0 ? 0xff0000 : 0x0000ff,
      emissiveIntensity: 0.5,
      shininess: 100
    });

    const charge = new THREE.Mesh(geometry, material);
    charge.position.copy(position);
    charge.userData.value = value;
    charge.castShadow = true;
    charge.receiveShadow = true;

    const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: value > 0 ? 0xff0000 : 0x0000ff,
      transparent: true,
      opacity: 0.15
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    charge.add(glow);

    charge.scale.set(0, 0, 0);
    gsap.to(charge.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.5,
      ease: "back.out"
    });

    this.charges.push(charge);
    this.scene.add(charge);
  }

  private calculateField(point: THREE.Vector3): THREE.Vector3 {
    const field = new THREE.Vector3(0, 0, 0);
    this.charges.forEach(charge => {
      const r = new THREE.Vector3().subVectors(point, charge.position);
      const rSquared = r.lengthSq();
      if (rSquared > 0.01) {
        const magnitude = this.k * Math.abs(charge.userData.value) / rSquared;
        const direction = r.normalize();
        if (charge.userData.value < 0) direction.negate();
        field.add(direction.multiplyScalar(magnitude));
      }
    });
    return field;
  }

  private updateVisualization(): void {
    this.clearFieldVisualizations();
    if (this.settings.mostrarLineasCampo) this.createFieldLines();
    if (this.settings.mostrarFlechasCampo) this.createFieldArrows();
    if (this.settings.mostrarSuperficiesEquipotenciales) this.createEquipotentialSurfaces();
  }

  private clearFieldVisualizations(): void {
    [...this.fieldLines, ...this.fieldArrows, ...this.equipotentialSurfaces].forEach(obj => {
      this.scene.remove(obj);
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(mat => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
    this.fieldLines = [];
    this.fieldArrows = [];
    this.equipotentialSurfaces = [];
  }

  private createEquipotentialSurfaces(): void {
    // Calculamos la distancia entre las cargas
    const distance = parseFloat(this.settings.distancia);
    // El tamaño máximo de las elipses será proporcional a la distancia entre cargas
    const maxSize = distance * 0.3; // 30% de la distancia entre cargas
  
    this.charges.forEach(charge => {
      // Crear tres elipses para cada carga
      for (let i = 0; i < 3; i++) {
        const ellipseGroup = new THREE.Group();
        ellipseGroup.position.copy(charge.position);
        
        // Calculamos el tamaño de la elipse basado en el índice
        // Las elipses más externas serán más grandes
        const scale = (i + 1) / 3; // Esto da valores de 1/3, 2/3 y 1
        const majorAxis = maxSize * scale;
        const minorAxis = maxSize * scale;
        
        const ellipseCurve = new THREE.EllipseCurve(
          0, 0,
          majorAxis, minorAxis,
          0, 2 * Math.PI,
          false,
          0
        );
  
        const points = ellipseCurve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({
          color: charge.userData.value > 0 ? 0xff4444 : 0x4444ff,
          transparent: true,
          opacity: 0.8 - (scale * 0.2), // Las elipses más grandes son más transparentes
          linewidth: 2
        });
  
        const ellipse = new THREE.Line(geometry, material);
        
        // Rotación inicial diferente para cada elipse
        ellipseGroup.rotation.x = (2 * Math.PI * i) / 3;
        ellipseGroup.rotation.y = (2 * Math.PI * i) / 3;
        
        ellipseGroup.add(ellipse);
        
        // Almacenar la carga asociada y la rotación inicial para la animación
        ellipseGroup.userData.charge = charge;
        ellipseGroup.userData.initialRotation = {
          x: ellipseGroup.rotation.x,
          y: ellipseGroup.rotation.y,
          z: ellipseGroup.rotation.z
        };
        
        this.scene.add(ellipseGroup);
        this.equipotentialSurfaces.push(ellipseGroup);
      }
    });
  }
  private createTextSprite(text: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 128;

    context.fillStyle = '#ffffff';
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.fillText(text, canvas.width/2, canvas.height/2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.25, 1);
    return sprite;
  }

  private createFieldLines(): void {
    this.charges.forEach(charge => {
      const numLines = 5;
      const radius = 0.1;
      for (let i = 0; i < numLines; i++) {
        for (let j = 0; j < numLines; j++) {
          const phi = (2 * Math.PI * i) / numLines;
          const theta = (Math.PI * j) / numLines;
          const startPoint = new THREE.Vector3(
            charge.position.x + radius * Math.sin(theta) * Math.cos(phi),
            charge.position.y + radius * Math.sin(theta) * Math.sin(phi),
            charge.position.z + radius * Math.cos(theta)
          );
          this.traceFieldLine(startPoint, charge.userData.value > 0);
        }
      }
    });
  }

  private traceFieldLine(startPoint: THREE.Vector3, isPositive: boolean): void {
    const points = [startPoint.clone()];
    let currentPoint = startPoint.clone();
    
    for (let i = 0; i < 100; i++) {
      const field = this.calculateField(currentPoint);
      if (field.length() < 0.01) break;

      field.normalize();
      if (!isPositive) field.negate();
      currentPoint.add(field.multiplyScalar(0.1));
      points.push(currentPoint.clone());

      if (currentPoint.length() > 10) break;
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: isPositive ? 0xff4444 : 0x4444ff,
      transparent: true,
      opacity: 0.6
    });
    const line = new THREE.Line(geometry, material);
    this.fieldLines.push(line);
    this.scene.add(line);
  }

  private createFieldArrows(): void {
    const spacing = 1;
    const range = 3;
    for (let x = -range; x <= range; x += spacing) {
      for (let y = -range; y <= range; y += spacing) {
        for (let z = -range; z <= range; z += spacing) {
          const point = new THREE.Vector3(x, y, z);
          const field = this.calculateField(point);
          if (field.length() > 0.01) {
            const arrow = new THREE.ArrowHelper(
              field.normalize(),
              point,
              0.5,
              0x00ff00,
              0.2,
              0.1
            );
            this.fieldArrows.push(arrow);
            this.scene.add(arrow);
          }
        }
      }
    }
  }

  private addMeasurementPoint(): void {
    if (this.measurementPoint) {
        this.scene.remove(this.measurementPoint);
    }

    const position = new THREE.Vector3(
        parseFloat(this.settings.medirX),
        parseFloat(this.settings.medirY),
        parseFloat(this.settings.medirZ)
    );

    const geometry = new THREE.SphereGeometry(0.1, 16, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.5
    });
    this.measurementPoint = new THREE.Mesh(geometry, material);
    this.measurementPoint.position.copy(position);

    const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.measurementPoint.add(glow);

    this.measurementPoint.scale.set(0, 0, 0);
    gsap.to(this.measurementPoint.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
    });

    this.scene.add(this.measurementPoint);

    const field = this.calculateField(position);
    // Formato científico para el campo eléctrico
    const fieldMagnitude = field.length();
    const fieldExponent = Math.floor(Math.log10(Math.abs(fieldMagnitude)));
    const fieldMantissa = fieldMagnitude / Math.pow(10, fieldExponent);
    this.settings.magnitudCampo = `${fieldMantissa.toFixed(2)}×10^${fieldExponent} N/C`;
}

  private calculatePotential(): number {
    if (!this.measurementPoint) return 0;
    
    let potential = 0;
    for (const charge of this.charges) {
      const r = this.measurementPoint.position.distanceTo(charge.position);
      // Evitar división por cero y asegurar que los valores son números
      if (r > 0.001) {
        const chargeValue = Number(charge.userData.value);
        if (!isNaN(chargeValue)) {
          potential += (this.k * chargeValue) / r;
        }
      }
    }
    
    return potential;
  }
  

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    
    // Rotar las elipses alrededor de sus cargas
    this.equipotentialSurfaces.forEach(surface => {
      const charge = surface.userData.charge;
      const initialRotation = surface.userData.initialRotation;
      const time = Date.now() * 0.001;
      const rotationSpeed = 0.5 * this.settings.velocidadRotacion;
      
      // Mantener la posición en la carga
      surface.position.copy(charge.position);
      
      // Rotar alrededor de los ejes manteniendo la orientación inicial
      surface.rotation.x = initialRotation.x + Math.sin(time) * rotationSpeed;
      surface.rotation.y = initialRotation.y + time * rotationSpeed;
      surface.rotation.z = initialRotation.z + Math.cos(time) * rotationSpeed;
    });

    this.charges.forEach(charge => charge.rotation.y += 0.01);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}