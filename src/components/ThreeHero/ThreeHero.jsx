import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeHero.scss';

export default function ThreeHero({ accent = '#e2572c' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.3 : 1.8));
    mount.appendChild(renderer.domElement);

    // ---- Particle field ------------------------------------------------
    const particleCount = isMobile ? 260 : 900;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i] = 0.02 + Math.random() * 0.05;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const accentColor = new THREE.Color(accent);
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.045,
      color: accentColor,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Secondary dim layer for depth
    const dimMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const dimPositions = new Float32Array(particleCount);
    const dimGeo = new THREE.BufferGeometry();
    const dimArr = new Float32Array((isMobile ? 150 : 500) * 3);
    for (let i = 0; i < dimArr.length; i += 1) {
      dimArr[i] = (Math.random() - 0.5) * 30;
    }
    dimGeo.setAttribute('position', new THREE.BufferAttribute(dimArr, 3));
    const dimPoints = new THREE.Points(dimGeo, dimMaterial);
    scene.add(dimPoints);

    // ---- Abstract glowing wireframe object ------------------------------
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(isMobile ? 0 : 3.5, -0.5, -4);
    scene.add(ico);

    // ---- Mouse parallax --------------------------------------------------
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!isMobile) window.addEventListener('pointermove', handlePointerMove);

    let frameId;
    let elapsed = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }
      elapsed += 0.0035;

      points.rotation.y = elapsed * 0.15;
      dimPoints.rotation.y = -elapsed * 0.08;
      ico.rotation.y = elapsed * 0.3;
      ico.rotation.x = elapsed * 0.15;

      targetRotation.x += (mouse.y * 0.15 - targetRotation.x) * 0.03;
      targetRotation.y += (mouse.x * 0.2 - targetRotation.y) * 0.03;
      scene.rotation.x = targetRotation.x;
      scene.rotation.y = targetRotation.y;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (!isMobile) window.removeEventListener('pointermove', handlePointerMove);
      geometry.dispose();
      material.dispose();
      dimGeo.dispose();
      dimMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [accent]);

  return <div className="three-hero" ref={mountRef} aria-hidden="true" />;
}
