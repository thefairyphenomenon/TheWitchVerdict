import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Globe from 'three-globe';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("globe-container");

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true});

renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Create the globe
const globe = new ThreeGlobe()
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg') // Earth texture
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
  .labelsData([
    { lat: 28.6139, lng: 77.209, label: 'नमस्ते' },  // Hindi - India
    { lat: 51.1657, lng: 10.4515, label: 'Guten Tag' },  // German - Germany
    { lat: 30.7333, lng: 76.7794, label: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' }, // Punjabi - Chandigarh
    { lat: 51.5072, lng: 0.1276, label: 'Hello' }  // English - UK
  ])
  .labelAltitude(0.01)
  .labelText('label')
  .labelSize(1)
  .labelColor(() => 'pink');

scene.add(globe);

// Add lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Position the camera and add controls
camera.position.set(0, 0, 350);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.001; // Rotate the globe
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle resizing
window.addEventListener("resize", () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });
});