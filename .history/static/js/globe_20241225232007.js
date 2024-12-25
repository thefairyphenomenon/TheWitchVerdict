import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeGlobe from 'three-globe';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("globe-container");

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Globe setup
  const globe = new ThreeGlobe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
    labelsData([
     { lat: 28.6139, lng: 77.209, label: 'नमस्ते' },  // Hindi - India
     { lat: 51.1657, lng: 10.4515, label: 'Guten Tag' },  // German - Germany
     { lat: 30.7333, lng: 76.7794, label: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' }, // Punjabi - Chandigarh
     { lat: 51.5072, lng: 0.1276, label: 'Hello' }  // English - UK
    ])
    .labelAltitude(0.01)
    .labelText('label')
    .labelSize(1);
  scene.add(globe);
  // Lighting
  const light = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(light);

  // Camera positioning
  camera.position.set(0, 0, 350);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;

  // Animate
  const animate = () => {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001; // Rotation speed
    renderer.render(scene, camera);
  };
  animate();

  // Handle resizing
  window.addEventListener("resize", () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });

  new Three.Globe(container).appendChild(globe);
});
