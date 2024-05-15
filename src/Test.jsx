import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// import image from './3d images .png';
// import image from './3d images .gif'
import image from './3d images .jpg'
// import image from './bugatti-1651718_1280.png'

const Test = () => {
  const canvasRef = useRef(null);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const currentMousePosition = useRef({ x: 0, y: 0 });
  const mouseDelta = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let isDragging = false;

    
    const scene = new THREE.Scene();          


    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(image);

    const geometry = new THREE.BoxGeometry();
    const materials = [
      new THREE.MeshBasicMaterial({ map: texture }), // Right side
      new THREE.MeshBasicMaterial({ map: texture }), // Left side
      new THREE.MeshBasicMaterial({ map: texture }), // Top side
      new THREE.MeshBasicMaterial({ map: texture }), // Bottom side
      new THREE.MeshBasicMaterial({ map: texture }), // Front side
      new THREE.MeshBasicMaterial({ map: texture }), // Back side
    ];

    const mesh = new THREE.Mesh(geometry, materials);

    scene.add(mesh);

    const handleMouseDown = (event) => {
      isDragging = true;
      previousMousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        currentMousePosition.current = {
          x: event.clientX,
          y: event.clientY,
        };
        mouseDelta.current = {
          x: currentMousePosition.current.x - previousMousePosition.current.x,
          y: currentMousePosition.current.y - previousMousePosition.current.y,
        };
        mesh.rotation.y += mouseDelta.current.x * 0.01;
        mesh.rotation.x += mouseDelta.current.y * 0.01;
        previousMousePosition.current = {
          x: currentMousePosition.current.x,
          y: currentMousePosition.current.y,
        };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
      texture.dispose();
    };
  }, []);

  return (<>
    <canvas ref={canvasRef} />
    </>
  )
  
};

export default Test;
