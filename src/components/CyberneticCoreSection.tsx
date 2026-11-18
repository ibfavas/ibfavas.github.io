import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RefreshCw, Zap, Activity } from 'lucide-react';

export const CyberneticCoreSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [activeVector, setActiveVector] = useState<string>('CVE-2024-39705 [NLTK]');

  const speedRef = useRef(rotationSpeed);
  speedRef.current = rotationSpeed;

  const wireframeRef = useRef(wireframeMode);
  wireframeRef.current = wireframeMode;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 36);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire rotating core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Icosahedron / Geodesic Cage
    const icosaGeometry = new THREE.IcosahedronGeometry(9, 2);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4FF00,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
    coreGroup.add(icosaMesh);

    // 2. Inner Core Sphere
    const innerGeometry = new THREE.OctahedronGeometry(4.5, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF4C24,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    coreGroup.add(innerMesh);

    // 3. Orbiting Gimbal Rings
    const ring1Geom = new THREE.TorusGeometry(12, 0.05, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(13.5, 0.05, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xD4FF00, transparent: true, opacity: 0.2 });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(15, 0.05, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xFF4C24, transparent: true, opacity: 0.2 });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    coreGroup.add(ring3);

    // 4. Surrounding Constellation Particle Cloud
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 25;

      particleVelocities[i] = (Math.random() - 0.5) * 0.015;
      particleVelocities[i + 1] = (Math.random() - 0.5) * 0.015;
      particleVelocities[i + 2] = (Math.random() - 0.5) * 0.015;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Create smooth circular glow texture for particles
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(212, 255, 0, 0.7)');
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

    // Dynamic Connection Lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x445522,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Mouse and Drag Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
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

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationId: number;

    const animate = () => {
      if (!prefersReducedMotion) {
        const speed = speedRef.current;

        // Auto rotation + user drag
        coreGroup.rotation.y += 0.004 * speed;
        coreGroup.rotation.x += 0.002 * speed;
        coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;
        coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

        // Counter-rotate inner core
        innerMesh.rotation.y -= 0.008 * speed;
        innerMesh.rotation.z += 0.006 * speed;

        // Subtle camera drift based on mouse
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 3 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        // Update constellation particles
        const pos = particleGeometry.attributes.position.array as Float32Array;
        const linePositions: number[] = [];
        const maxDist = 9.0;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          pos[idx] += particleVelocities[idx];
          pos[idx + 1] += particleVelocities[idx + 1];
          pos[idx + 2] += particleVelocities[idx + 2];

          if (pos[idx] < -25 || pos[idx] > 25) particleVelocities[idx] *= -1;
          if (pos[idx + 1] < -15 || pos[idx + 1] > 15) particleVelocities[idx + 1] *= -1;
          if (pos[idx + 2] < -12 || pos[idx + 2] > 12) particleVelocities[idx + 2] *= -1;

          for (let j = i + 1; j < Math.min(i + 15, particleCount); j++) {
            const jdx = j * 3;
            const dx = pos[idx] - pos[jdx];
            const dy = pos[idx + 1] - pos[jdx + 1];
            const dz = pos[idx + 2] - pos[jdx + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              linePositions.push(pos[idx], pos[idx + 1], pos[idx + 2]);
              linePositions.push(pos[jdx], pos[jdx + 1], pos[jdx + 2]);
            }
          }
        }

        particleGeometry.attributes.position.needsUpdate = true;
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        // Toggle wireframe dynamically
        icosaMaterial.wireframe = wireframeRef.current;
        innerMaterial.wireframe = wireframeRef.current;
      }

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(animate);
      }
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (animationId) cancelAnimationFrame(animationId);

      icosaGeometry.dispose();
      icosaMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      ring3Geom.dispose();
      ring3Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="interactive-core" className="relative w-full border-b border-white/10 bg-[#020202] overflow-hidden">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider bg-black/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 02 / 09 ]</span>
          <span className="text-lime font-medium">// INTERACTIVE THREAT CORE</span>
          <span className="hidden sm:inline text-[#555]">&bull; FULL-WIDTH 3D HUD</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#A0A0A0] text-[10px] hidden md:inline">CLICK + DRAG TO REVOLVE</span>
          <span className="px-2 py-0.5 border border-lime/40 text-lime text-[10px] bg-lime/5 rounded-none font-semibold">
            60 FPS LIVE
          </span>
        </div>
      </div>

      {/* Main Full-Width Canvas Container */}
      <div className="relative w-full h-[620px] md:h-[720px] cursor-grab active:cursor-grabbing select-none">
        {/* Three.js DOM Injection Node */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />

        {/* Top-Left Telemetry Overlay Box */}
        <div className="absolute top-6 left-6 md:left-12 z-10 pointer-events-none max-w-xs">
          <div className="p-4 bg-black/75 border border-white/10 backdrop-blur-md font-mono">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red animate-ping" />
              <span className="text-xs text-white font-semibold uppercase tracking-wider">
                THREAT CORE TELEMETRY
              </span>
            </div>
            <p className="text-[11px] text-[#909090] leading-relaxed mb-3">
              Full-spectrum geometric representation of defensive state machine and active CVE vector nodes.
            </p>
            <div className="space-y-1.5 text-[10px] border-t border-white/10 pt-2 text-[#757575]">
              <div className="flex justify-between">
                <span>ACTIVE VECTOR</span>
                <span className="text-white font-medium">{activeVector}</span>
              </div>
              <div className="flex justify-between">
                <span>CORE RESILIENCE</span>
                <span className="text-lime">100% NOMINAL</span>
              </div>
              <div className="flex justify-between">
                <span>BUFFER STATUS</span>
                <span className="text-white">CANARY INTACT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top-Right Attack Simulation Selector Overlay */}
        <div className="absolute top-6 right-6 md:right-12 z-10 font-mono">
          <div className="p-3 bg-black/75 border border-white/10 backdrop-blur-md space-y-1 text-[11px]">
            <span className="text-[9px] uppercase tracking-wider text-[#757575] block px-1">
              INSPECT THREAT NODE
            </span>
            <button
              onClick={() => setActiveVector('CVE-2024-39705 [NLTK RCE]')}
              className={`block w-full text-left px-3 py-1.5 transition-colors ${
                activeVector.includes('NLTK') ? 'bg-red text-white font-semibold' : 'text-[#888] hover:text-white'
              }`}
            >
              01 &bull; NLTK RCE (CVE-2024-39705)
            </button>
            <button
              onClick={() => setActiveVector('CIS BENCHMARK [83% HARDENED]')}
              className={`block w-full text-left px-3 py-1.5 transition-colors ${
                activeVector.includes('CIS') ? 'bg-lime text-black font-semibold' : 'text-[#888] hover:text-white'
              }`}
            >
              02 &bull; CIS KERNEL AUDIT
            </button>
            <button
              onClick={() => setActiveVector('WAZUH IOC STREAM [55K/RUN]')}
              className={`block w-full text-left px-3 py-1.5 transition-colors ${
                activeVector.includes('WAZUH') ? 'bg-white text-black font-semibold' : 'text-[#888] hover:text-white'
              }`}
            >
              03 &bull; WAZUH SIEM CDB RULES
            </button>
          </div>
        </div>

        {/* Bottom-Left Real-time HUD Controls */}
        <div className="absolute bottom-6 left-6 md:left-12 z-10 flex flex-wrap items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className="flex items-center gap-2 px-3 py-2 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white backdrop-blur-md transition-colors"
          >
            <Zap size={14} className={wireframeMode ? 'text-lime' : 'text-[#888]'} />
            <span>MODE: {wireframeMode ? 'WIREFRAME' : 'SOLID'}</span>
          </button>
          <button
            onClick={() => setRotationSpeed(s => (s === 1 ? 2.5 : s === 2.5 ? 0.2 : 1))}
            className="flex items-center gap-2 px-3 py-2 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white backdrop-blur-md transition-colors"
          >
            <RefreshCw size={14} />
            <span>VELOCITY: {rotationSpeed}X</span>
          </button>
        </div>

        {/* Bottom-Right Stream Diagnostic Log */}
        <div className="absolute bottom-6 right-6 md:right-12 z-10 pointer-events-none hidden sm:block">
          <div className="px-4 py-2.5 bg-black/80 border border-white/10 backdrop-blur-md font-mono text-[10px] text-[#808080] flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-lime" />
              <span>KERNEL AUDIT: REALTIME</span>
            </div>
            <span>PORT: 4444 [MONITORED]</span>
            <span className="text-white font-semibold">CIPHER: AES-GCM-256</span>
          </div>
        </div>
      </div>
    </section>
  );
};