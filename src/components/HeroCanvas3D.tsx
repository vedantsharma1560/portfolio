import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvas3DProps {
  isDarkMode?: boolean;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({ isDarkMode = true }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    currentMount.appendChild(renderer.domElement);

    // Geometry & Materials
    // Central torus knot
    const torusGeometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
    
    // Wireframe outer mesh
    const wireframeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x20938a,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x0d4844,
      emissiveIntensity: 0.3,
    });

    const torusMesh = new THREE.Mesh(torusGeometry, wireframeMaterial);
    scene.add(torusMesh);

    // Inner glowing core
    const coreGeometry = new THREE.IcosahedronGeometry(0.8, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2cc1b5,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      thickness: 0.5,
      ior: 1.5,
      emissive: 0x14645e,
      emissiveIntensity: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Floating Particles
    const particlesCount = 120;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const tealPrimary = new THREE.Color(0x20938a);
    const tealBright = new THREE.Color(0x4fe3d7);

    for (let i = 0; i < particlesCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const mixedColor = tealPrimary.clone().lerp(tealBright, Math.random());
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x20938a, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2cc1b5, 3, 20);
    pointLight2.position.set(-4, -4, -2);
    scene.add(pointLight2);

    // Mouse Interaction Parallax
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 1.5;
      targetY = -(y / rect.height) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Torus Knot rotation & floating motion
      torusMesh.rotation.x = elapsedTime * 0.2 + mouseY;
      torusMesh.rotation.y = elapsedTime * 0.3 + mouseX;
      torusMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Inner Core counter-rotation
      coreMesh.rotation.x = -elapsedTime * 0.4;
      coreMesh.rotation.y = -elapsedTime * 0.5;
      coreMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Particles gentle rotation
      particlesMesh.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      torusGeometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px] flex items-center justify-center">
      {/* Background Soft Glow Radial Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#20938a]/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#14645e]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Canvas Mounting Node */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />

      {/* Floating HUD Badges surrounding the 3D canvas */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 glass-panel px-3 py-1.5 rounded-full text-xs font-mono text-[#2cc1b5] flex items-center gap-2 shadow-lg animate-float border border-[#20938a]/30">
        <span className="w-2 h-2 rounded-full bg-[#20938a] animate-ping" />
        WebGL 2.0 • 60 FPS
      </div>

      <div className="absolute bottom-6 left-4 sm:left-8 glass-panel px-3 py-2 rounded-xl text-xs font-mono text-gray-300 flex items-center gap-2.5 border border-[#20938a]/30 shadow-xl backdrop-blur-md">
        <div className="w-8 h-8 rounded-lg bg-[#20938a]/20 border border-[#20938a]/40 flex items-center justify-center text-[#2cc1b5] font-bold">
          3D
        </div>
        <div>
          <p className="text-white font-medium text-xs">Interactive Mesh</p>
          <p className="text-[10px] text-gray-400">Drag mouse to orbit</p>
        </div>
      </div>
    </div>
  );
};
