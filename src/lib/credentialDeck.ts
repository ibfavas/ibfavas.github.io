import { PerspectiveCamera, Scene } from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function mountCredentialDeck(host: HTMLElement, images: string[], initial: number) {
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 1, 4000);
  const renderer = new CSS3DRenderer();
  host.appendChild(renderer.domElement);
  const documents = images.map(src => {
    const image = document.createElement('img');
    image.src = src;
    image.alt = '';
    image.className = 'credential-sheet';
    const sheet = new CSS3DObject(image);
    scene.add(sheet);
    return sheet;
  });

  function select(active: number) {
    documents.forEach((sheet, i) => {
      const depth = (i - active + documents.length) % documents.length;
      sheet.position.set(-34 + depth * 55, 4 + depth * 9, -depth * 57);
      sheet.rotation.set(-0.05, -0.16 - depth * 0.12, 0.025 - depth * 0.035);
      sheet.element.style.filter = `brightness(${1 - depth * 0.17})`;
    });
    renderer.render(scene, camera);
  }
  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = Math.max(370, 625 / camera.aspect) / (2 * Math.tan(camera.fov * Math.PI / 360));
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }
  resize();
  select(initial);
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  return {
    select,
    dispose() {
      observer.disconnect();
      renderer.domElement.remove();
    }
  };
}
