import * as THREE from 'three';

export type ThreatMode = 'nltk' | 'cis' | 'wazuh';
interface SceneSettings {
  mode: ThreatMode;
  speed: number;
  wireframe: boolean;
}

export function mountThreatCore(
  container: HTMLElement,
  settings: () => SceneSettings,
  onPulse: () => void,
  onUnavailable: () => void
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'default',
    failIfMajorPerformanceCaveat: true
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 38);

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, container.clientWidth < 768 ? 1.25 : 1.75));
  container.appendChild(renderer.domElement);

  // Root Group
  const rootGroup = new THREE.Group();
  const dragGroup = new THREE.Group();
  dragGroup.add(rootGroup);
  scene.add(dragGroup);

  // 1. Outer Icosahedron Wireframe
  const icosaGeometry = new THREE.IcosahedronGeometry(9.5, 2);
  const icosaMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF4C24,
    wireframe: true,
    transparent: true,
    opacity: 0.55
  });
  const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
  rootGroup.add(icosaMesh);

  // 2. Inner Octahedron Core
  const innerGeometry = new THREE.OctahedronGeometry(4.8, 2);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF4C24,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
  rootGroup.add(innerMesh);

  // 3. Secondary Protective Shield (for CIS Mode)
  const shieldGeometry = new THREE.DodecahedronGeometry(11.5, 1);
  const shieldMaterial = new THREE.MeshBasicMaterial({
    color: 0xD4FF00,
    wireframe: true,
    transparent: true,
    opacity: 0.0
  });
  const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
  rootGroup.add(shieldMesh);

  // 4. Gimbal Rings
  const ring1Geom = new THREE.TorusGeometry(13, 0.06, 16, 100);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
  const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
  rootGroup.add(ring1);

  const ring2Geom = new THREE.TorusGeometry(15, 0.06, 16, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xFF4C24, transparent: true, opacity: 0.25 });
  const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
  ring2.rotation.x = Math.PI / 3;
  rootGroup.add(ring2);

  // 5. Radial beams for the NLTK scenario
  const laserCount = 6;
  const laserPositions = new Float32Array(laserCount * 2 * 3);
  const laserGeometry = new THREE.BufferGeometry();
  laserGeometry.setAttribute('position', new THREE.BufferAttribute(laserPositions, 3));
  const laserMaterial = new THREE.LineBasicMaterial({
    color: 0xFF4C24,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const laserLines = new THREE.LineSegments(laserGeometry, laserMaterial);
  rootGroup.add(laserLines);

  // 6. Particle Constellation
  const particleCount = 140;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 55;
    particlePositions[i + 1] = (Math.random() - 0.5) * 32;
    particlePositions[i + 2] = (Math.random() - 0.5) * 26;

    particleVelocities[i] = (Math.random() - 0.5) * 0.02;
    particleVelocities[i + 1] = (Math.random() - 0.5) * 0.02;
    particleVelocities[i + 2] = (Math.random() - 0.5) * 0.02;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const createCircleTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 76, 36, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  };

  const particleTexture = createCircleTexture();
  const particleMaterial = new THREE.PointsMaterial({
    map: particleTexture,
    size: 1.6,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // 7. Dynamic Shockwave Ring on Click
  const shockwaveGeom = new THREE.RingGeometry(1, 1.2, 64);
  const shockwaveMat = new THREE.MeshBasicMaterial({
    color: 0xD4FF00,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide
  });
  const shockwaveMesh = new THREE.Mesh(shockwaveGeom, shockwaveMat);
  scene.add(shockwaveMesh);
  let shockwaveProgress = 1;

  // Mouse and Drag Interaction
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;

  const onMouseDown = (e: PointerEvent) => {
    container.setPointerCapture(e.pointerId);
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    // Trigger visual shockwave ring
    shockwaveProgress = 0;
    shockwaveMesh.scale.set(1, 1, 1);
    shockwaveMat.opacity = 0.9;
    onPulse();
  };

  const onMouseMove = (e: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  container.addEventListener('pointerdown', onMouseDown);
  container.addEventListener('pointermove', onMouseMove);
  window.addEventListener('pointerup', onMouseUp);

  const onKey = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft': targetRotationY -= 0.3; break;
      case 'ArrowRight': targetRotationY += 0.3; break;
      case 'ArrowUp': targetRotationX -= 0.3; break;
      case 'ArrowDown': targetRotationX += 0.3; break;
      case 'Enter':
      case ' ':
        shockwaveProgress = 0;
        onPulse();
        break;
      default: return;
    }
    event.preventDefault();
  };
  const onLost = (event: Event) => {
    event.preventDefault();
    onUnavailable();
  };
  renderer.domElement.addEventListener('webglcontextlost', onLost);
  container.addEventListener('keydown', onKey);
  container.addEventListener('pointercancel', onMouseUp);

  let animationId = 0;
  let clock = 0;
  let isVisible = false;
  let previousTime = 0;
  const animate = (time: number) => {
    const step = previousTime ? Math.min((time - previousTime) / (1000 / 60), 3) : 1;
    previousTime = time;
    clock += 0.02 * step;
    const { mode, speed: baseSpeed, wireframe } = settings();

    // Dynamic Mode Configuration
    if (mode === 'nltk') {
      // Crimson package integrity view
      icosaMaterial.color.setHex(0xFF4C24);
      innerMaterial.color.setHex(0xFF4C24);
      ring2Mat.color.setHex(0xFF4C24);
      shieldMaterial.opacity = 0.0;
      laserMaterial.opacity = 0.75 + Math.sin(clock * 8) * 0.25;

      const pulseScale = 1.0 + Math.sin(clock * 6) * 0.08;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Update laser lines from core center to outer positions
      const lPos = laserGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < laserCount; i++) {
        const idx = i * 6;
        lPos[idx] = 0;
        lPos[idx + 1] = 0;
        lPos[idx + 2] = 0;
        const angle = clock * 1.5 + (i * Math.PI * 2) / laserCount;
        const dist = 14 + Math.sin(clock * 4 + i) * 3;
        lPos[idx + 3] = Math.cos(angle) * dist;
        lPos[idx + 4] = Math.sin(angle) * dist * 0.6;
        lPos[idx + 5] = Math.sin(angle * 1.5) * 6;
      }
      laserGeometry.attributes.position.needsUpdate = true;
      laserLines.visible = true;

      rootGroup.rotation.y += 0.007 * baseSpeed * step;
      rootGroup.rotation.x += 0.003 * baseSpeed * step;
    } else if (mode === 'cis') {
      // Lime Hardened mode: protective dodecahedron cage active
      icosaMaterial.color.setHex(0xD4FF00);
      innerMaterial.color.setHex(0xD4FF00);
      ring2Mat.color.setHex(0xD4FF00);
      shieldMaterial.color.setHex(0xD4FF00);
      shieldMaterial.opacity = 0.45;
      shieldMesh.rotation.y -= 0.008 * step;
      shieldMesh.rotation.z += 0.004 * step;
      innerMesh.scale.set(1.0, 1.0, 1.0);
      laserLines.visible = false;

      rootGroup.rotation.y += 0.003 * baseSpeed * step;
      rootGroup.rotation.x += 0.001 * baseSpeed * step;
    } else {
      // Cyan SIEM mode: high velocity vortex
      icosaMaterial.color.setHex(0x38BDF8);
      innerMaterial.color.setHex(0x38BDF8);
      ring2Mat.color.setHex(0x38BDF8);
      shieldMaterial.opacity = 0.0;
      laserLines.visible = false;

      rootGroup.rotation.y += 0.015 * baseSpeed * step;
      rootGroup.rotation.z += 0.006 * baseSpeed * step;
    }

    // Apply smooth user drag rotation
    dragGroup.rotation.y += (targetRotationY - dragGroup.rotation.y) * 0.05;
    dragGroup.rotation.x += (targetRotationX - dragGroup.rotation.x) * 0.05;

    // Smooth camera drift based on mouse
    camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    // Update shockwave animation on click
    if (shockwaveProgress < 1) {
      shockwaveProgress = Math.min(1, shockwaveProgress + 0.035 * step);
      const s = 1 + shockwaveProgress * 22;
      shockwaveMesh.scale.set(s, s, s);
      shockwaveMat.opacity = (1 - shockwaveProgress) * 0.8;
    }

    // Update particle positions
    const particleStep = step * (mode === 'wazuh' ? 2.5 : 1);
    const pos = particleGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      pos[idx] += particleVelocities[idx] * particleStep;
      pos[idx + 1] += particleVelocities[idx + 1] * particleStep;
      pos[idx + 2] += particleVelocities[idx + 2] * particleStep;

      if (pos[idx] < -27 || pos[idx] > 27) particleVelocities[idx] *= -1;
      if (pos[idx + 1] < -16 || pos[idx + 1] > 16) particleVelocities[idx + 1] *= -1;
      if (pos[idx + 2] < -13 || pos[idx + 2] > 13) particleVelocities[idx + 2] *= -1;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    icosaMaterial.wireframe = wireframe;
    innerMaterial.wireframe = wireframe;

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  };

  const updateLoop = () => {
    previousTime = 0;
    cancelAnimationFrame(animationId);
    if (isVisible && !document.hidden) animationId = requestAnimationFrame(animate);
  };
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    updateLoop();
  });
  observer.observe(container);
  document.addEventListener('visibilitychange', updateLoop);

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  const resize = new ResizeObserver(onResize);
  resize.observe(container);

  return () => {
    container.removeEventListener('pointerdown', onMouseDown);
    container.removeEventListener('pointermove', onMouseMove);
    window.removeEventListener('pointerup', onMouseUp);
    resize.disconnect();
    document.removeEventListener('visibilitychange', updateLoop);
    container.removeEventListener('keydown', onKey);
    container.removeEventListener('pointercancel', onMouseUp);
    renderer.domElement.removeEventListener('webglcontextlost', onLost);
    observer.disconnect();
    if (animationId) cancelAnimationFrame(animationId);

    icosaGeometry.dispose();
    icosaMaterial.dispose();
    innerGeometry.dispose();
    innerMaterial.dispose();
    shieldGeometry.dispose();
    shieldMaterial.dispose();
    ring1Geom.dispose();
    ring1Mat.dispose();
    ring2Geom.dispose();
    ring2Mat.dispose();
    laserGeometry.dispose();
    laserMaterial.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    particleTexture.dispose();
    shockwaveGeom.dispose();
    shockwaveMat.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
