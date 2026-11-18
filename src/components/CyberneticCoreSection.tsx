import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RefreshCw, Zap, Activity, ShieldAlert, ShieldCheck, Database } from 'lucide-react';
import { DecryptText } from './DecryptText';

type ThreatMode = 'nltk' | 'cis' | 'wazuh';

export const CyberneticCoreSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<ThreatMode>('nltk');
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [nodePingCount, setNodePingCount] = useState<number>(44);

  const activeModeRef = useRef<ThreatMode>(activeMode);
  activeModeRef.current = activeMode;

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
    camera.position.set(0, 0, 38);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

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

    // 5. Dynamic Exploit Laser Beams (for NLTK RCE mode)
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

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      // Trigger visual shockwave ring
      shockwaveProgress = 0;
      shockwaveMesh.scale.set(1, 1, 1);
      shockwaveMat.opacity = 0.9;
      setNodePingCount(n => n + 1);
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
    let clock = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      if (!prefersReducedMotion) {
        clock += 0.02;
        const mode = activeModeRef.current;
        const baseSpeed = speedRef.current;

        // Dynamic Mode Configuration
        if (mode === 'nltk') {
          // Crimson Exploit mode: aggressive pulse & laser beams
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

          rootGroup.rotation.y += 0.007 * baseSpeed;
          rootGroup.rotation.x += 0.003 * baseSpeed;
        } else if (mode === 'cis') {
          // Lime Hardened mode: protective dodecahedron cage active
          icosaMaterial.color.setHex(0xD4FF00);
          innerMaterial.color.setHex(0xD4FF00);
          ring2Mat.color.setHex(0xD4FF00);
          shieldMaterial.color.setHex(0xD4FF00);
          shieldMaterial.opacity = 0.45;
          shieldMesh.rotation.y -= 0.008;
          shieldMesh.rotation.z += 0.004;
          innerMesh.scale.set(1.0, 1.0, 1.0);
          laserLines.visible = false;

          rootGroup.rotation.y += 0.003 * baseSpeed;
          rootGroup.rotation.x += 0.001 * baseSpeed;
        } else {
          // Cyan SIEM mode: high velocity vortex
          icosaMaterial.color.setHex(0x38BDF8);
          innerMaterial.color.setHex(0x38BDF8);
          ring2Mat.color.setHex(0x38BDF8);
          shieldMaterial.opacity = 0.0;
          laserLines.visible = false;

          rootGroup.rotation.y += 0.015 * baseSpeed;
          rootGroup.rotation.z += 0.006 * baseSpeed;
        }

        // Apply smooth user drag rotation
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;

        // Smooth camera drift based on mouse
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
        camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        // Update shockwave animation on click
        if (shockwaveProgress < 1) {
          shockwaveProgress += 0.035;
          const s = 1 + shockwaveProgress * 22;
          shockwaveMesh.scale.set(s, s, s);
          shockwaveMat.opacity = (1 - shockwaveProgress) * 0.8;
        }

        // Update particle positions
        const pos = particleGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          pos[idx] += particleVelocities[idx] * (mode === 'wazuh' ? 2.5 : 1.0);
          pos[idx + 1] += particleVelocities[idx + 1] * (mode === 'wazuh' ? 2.5 : 1.0);
          pos[idx + 2] += particleVelocities[idx + 2] * (mode === 'wazuh' ? 2.5 : 1.0);

          if (pos[idx] < -27 || pos[idx] > 27) particleVelocities[idx] *= -1;
          if (pos[idx + 1] < -16 || pos[idx + 1] > 16) particleVelocities[idx + 1] *= -1;
          if (pos[idx + 2] < -13 || pos[idx + 2] > 13) particleVelocities[idx + 2] *= -1;
        }
        particleGeometry.attributes.position.needsUpdate = true;

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
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="interactive-core" className="relative w-full border-b border-white/10 bg-[#020202] overflow-hidden select-none">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-4 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider bg-black/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="text-white font-semibold">[ 02 / 09 ]</span>
          <span className="text-lime font-medium">// INTERACTIVE THREAT CORE</span>
          <span className="hidden sm:inline text-[#555]">&bull; FULL-WIDTH 3D HUD</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#888] text-[10px] hidden md:inline">CLICK CANVAS FOR SHOCKWAVE</span>
          <span className="px-2 py-0.5 border border-lime/40 text-lime text-[10px] bg-lime/5 font-semibold">
            60 FPS LIVE
          </span>
        </div>
      </div>

      {/* Main Full-Width Canvas Container */}
      <div className="relative w-full h-[580px] md:h-[680px] cursor-grab active:cursor-grabbing">
        {/* Three.js DOM Injection Node */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full" />

        {/* Top Controls on Small Screens / Split on Desktop */}
        <div className="absolute top-4 left-4 right-4 md:left-12 md:right-12 z-20 flex flex-col md:flex-row justify-between items-start md:items-start gap-3 pointer-events-none">
          {/* Top-Left Telemetry Overlay Box */}
          <div className="p-4 bg-black/80 border border-white/15 backdrop-blur-xl font-mono max-w-sm w-full md:w-auto pointer-events-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full animate-ping ${
                  activeMode === 'nltk' ? 'bg-red' : activeMode === 'cis' ? 'bg-lime' : 'bg-sky-400'
                }`}
              />
              <span className="text-xs text-white font-semibold uppercase tracking-wider">
                <DecryptText text={activeMode === 'nltk' ? 'EXPLOIT SIMULATION' : activeMode === 'cis' ? 'HARDENED SHIELD' : 'SIEM IOC VORTEX'} />
              </span>
            </div>
            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-3">
              {activeMode === 'nltk' && 'Active payload targeting NLTK downloader namespace overwrite (CVE-2026-12261).'}
              {activeMode === 'cis' && 'Host lockdown status: 83% CIS benchmark baseline with strict auditd syscall enforcement.'}
              {activeMode === 'wazuh' && 'Threat pipeline ingesting 55,000+ indicators per run with automated CDB scoring.'}
            </p>
            <div className="space-y-1.5 text-[10px] border-t border-white/10 pt-2 text-[#757575]">
              <div className="flex justify-between">
                <span>SIMULATION TARGET</span>
                <span className="text-white font-medium uppercase">
                  {activeMode === 'nltk' ? 'NLTK Core [CVE-2026-12261]' : activeMode === 'cis' ? 'Linux Kernel [Locked]' : 'Wazuh Cluster [Streaming]'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SIGNAL PINGS</span>
                <span className="text-lime">{nodePingCount} CAPTURED</span>
              </div>
            </div>
          </div>

          {/* Top-Right Attack Simulation Mode Selector */}
          <div className="p-3 bg-black/85 border border-white/15 backdrop-blur-xl font-mono space-y-1.5 text-[11px] pointer-events-auto shadow-2xl w-full md:w-auto">
            <span className="text-[9px] uppercase tracking-wider text-[#757575] block px-1">
              CHOOSE ACTIVE THREAT SCENARIO
            </span>
            <button
              onClick={() => setActiveMode('nltk')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 transition-all ${
                activeMode === 'nltk'
                  ? 'bg-red text-white font-bold shadow-lg shadow-red/20'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldAlert size={14} />
              <span>01 &bull; NLTK POISONING (CVE-2026-12261)</span>
            </button>
            <button
              onClick={() => setActiveMode('cis')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 transition-all ${
                activeMode === 'cis'
                  ? 'bg-lime text-black font-bold shadow-lg shadow-lime/20'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck size={14} />
              <span>02 &bull; CIS KERNEL AUDIT (83% HARDENED)</span>
            </button>
            <button
              onClick={() => setActiveMode('wazuh')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 transition-all ${
                activeMode === 'wazuh'
                  ? 'bg-sky-400 text-black font-bold shadow-lg shadow-sky-400/20'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
            >
              <Database size={14} />
              <span>03 &bull; WAZUH SIEM IOC STREAM (55K/RUN)</span>
            </button>
          </div>
        </div>

        {/* Bottom-Left Real-time HUD Controls */}
        <div className="absolute bottom-4 left-4 md:left-12 z-20 flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className="flex items-center gap-2 px-3 py-2 bg-black/85 hover:bg-white hover:text-black border border-white/20 text-white backdrop-blur-md transition-colors"
          >
            <Zap size={13} className={wireframeMode ? 'text-lime' : 'text-[#888]'} />
            <span>MODE: {wireframeMode ? 'WIREFRAME' : 'SOLID'}</span>
          </button>
          <button
            onClick={() => setRotationSpeed(s => (s === 1 ? 2.5 : s === 2.5 ? 0.2 : 1))}
            className="flex items-center gap-2 px-3 py-2 bg-black/85 hover:bg-white hover:text-black border border-white/20 text-white backdrop-blur-md transition-colors"
          >
            <RefreshCw size={13} />
            <span>VELOCITY: {rotationSpeed}X</span>
          </button>
        </div>

        {/* Bottom-Right Stream Diagnostic Log */}
        <div className="absolute bottom-4 right-4 md:right-12 z-20 pointer-events-none hidden sm:block">
          <div className="px-4 py-2 bg-black/85 border border-white/15 backdrop-blur-md font-mono text-[10px] text-[#808080] flex items-center gap-4 shadow-xl">
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