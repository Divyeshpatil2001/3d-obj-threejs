// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import model_img from './Mercedes-Benz 190.glb';

// const Models_re = () => {
//   const containerRef = useRef(null);
//   const scene = useRef(new THREE.Scene()).current;
//   const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)).current;
//   const renderer = useRef(new THREE.WebGLRenderer({ antialias: true })).current;
//   let cube;

//   useEffect(() => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0xffffff); // Set background color to white
//     containerRef.current.appendChild(renderer.domElement);

//     camera.position.z = 5;

//     // Create a cube geometry
//     const geometry = new THREE.BoxGeometry();

//     // Create a material
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color for the cube

//     // Create a mesh
//     cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     const loader = new GLTFLoader();

//     loader.load(model_img, function (gltf) {
//       // Set material for the loaded model
//       const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for the model
//       gltf.scene.traverse((child) => {
//         if (child.isMesh) {
//           child.material = material;
//           console.log("bdh")
//         }
//       });

//       scene.add(gltf.scene);
//       console.log(gltf.scene)

//       // Adjust the position, rotation, and scale of the loaded model if needed
//       gltf.scene.position.set(0, 0, 0);
//       gltf.scene.rotation.set(0, Math.PI, 0);
//       gltf.scene.scale.set(0.01, 0.01, 0.01);
//     }, undefined, function (error) {
//       console.error(error);
//     });

//     const animate = function () {
//       requestAnimationFrame(animate);
//       cube.rotation.x += 0.01; // Rotate the cube
//       cube.rotation.y += 0.01;
//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       // Cleanup code
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={containerRef} />;
// }

// export default Models_re;





import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import model_img from './Mercedes-Benz 190.glb';

const Models_re = () => {
  const containerRef = useRef(null);
  const scene = useRef(new THREE.Scene()).current;
  const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)).current;
  const renderer = useRef(new THREE.WebGLRenderer({ antialias: true })).current;
  const loader = useRef(new GLTFLoader()).current;
  const controls = useRef(null);

  useEffect(() => {
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    renderer.setClearColor(0xffffff); // Set background color to white
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    loader.load(model_img, function (gltf) {
      const model = gltf.scene;

      // Traverse through the model to change material color
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(0xff0000); // Set color to red
        }
      });

      scene.add(model);
    }, undefined, function (error) {
      console.error(error);
    });

    controls.current = new OrbitControls(camera, renderer.domElement);
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.25;
    controls.current.enableZoom = true;

    const animate = function () {
      requestAnimationFrame(animate);
      controls.current.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup code
      renderer.dispose();
      controls.current.dispose();
    };
  }, [loader]);

  return <div ref={containerRef} />;
}

export default Models_re;


