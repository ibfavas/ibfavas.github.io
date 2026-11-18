import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL support check
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return; // WebGL not supported, graceful fallback
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 28;

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle nodes configuration
    const particleCount = window.innerWidth < 768 ? 40 : 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 36;
      positions[i + 1] = (Math.random() - 0.5) * 24;
      positions[i + 2] = (Math.random() - 0.5) * 16;

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Points material with Honey acid-lime accent
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xD4FF00,
      size: 2.8,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // Dynamic connecting lines
    const maxDistance = 8.5;
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x556622,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Mouse interaction tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 4;
      targetY = y * 4;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    let animationFrameId: number;

    const animate = () => {
      if (!prefersReducedMotion) {
        // Smooth camera drift toward mouse target
        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;
        camera.position.x = mouseX;
        camera.position.y = mouseY;
        camera.lookAt(0, 0, 0);

        // Update particle positions
        const pos = geometry.attributes.position.array as Float32Array;
        const linePositions: number[] = [];

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          pos[idx] += velocities[idx];
          pos[idx + 1] += velocities[idx + 1];
          pos[idx + 2] += velocities[idx + 2];

          // Bounce boundaries
          if (pos[idx] < -18 || pos[idx] > 18) velocities[idx] *= -1;
          if (pos[idx + 1] < -12 || pos[idx + 1] > 12) velocities[idx + 1] *= -1;
          if (pos[idx + 2] < -8 || pos[idx + 2] > 8) velocities[idx + 2] *= -1;

          // Connect adjacent nodes
          for (let j = i + 1; j < particleCount; j++) {
            const jdx = j * 3;
            const dx = pos[idx] - pos[jdx];
            const dy = pos[idx + 1] - pos[jdx + 1];
            const dz = pos[idx + 2] - pos[jdx + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDistance) {
              linePositions.push(pos[idx], pos[idx + 1], pos[idx + 2]);
              linePositions.push(pos[jdx], pos[jdx + 1], pos[jdx + 2]);
            }
          }
        }

        geometry.attributes.position.needsUpdate = true;
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      }

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // Resize handling
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Disposal
      geometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden opacity-90" 
      aria-hidden="true" 
    />
  );
};
