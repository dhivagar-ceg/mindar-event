import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

const start = async () => {
  // Initialize MindAR
  const mindarThree = new MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "/Newtargets.mind"
  });

  const { renderer, scene, camera } = mindarThree;
  const anchor = mindarThree.addAnchor(0);

  // Add lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(0, 2, 2);
  scene.add(dir);

  // Renderer settings
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  // Load 3D model
  const gltf = await new GLTFLoader().loadAsync("/2.glb");
  const avatar = gltf.scene;
  avatar.scale.set(1.0, 1.0, 1.0);
  avatar.rotation.x = Math.PI / 2;
  avatar.visible = false; // Initially hidden
  anchor.group.add(avatar);

  // Animation mixer - Play ALL animations
  const mixer = new THREE.AnimationMixer(avatar);
  
  // Check if model has animations
  if (gltf.animations && gltf.animations.length > 0) {
    console.log(`Found ${gltf.animations.length} animations in the model`);
    
    // Play all animations
    gltf.animations.forEach((clip, index) => {
      console.log(`Playing animation ${index}: ${clip.name || 'Unnamed'}`);
      const action = mixer.clipAction(clip);
      action.play();
    });
  } else {
    console.log("No animations found in the model");
  }

  let redirectTimer = null;

  // Step 2: Place the model when target is found
  anchor.onTargetFound = () => {
    console.log("Step 1: Target tracked successfully!");
    console.log("Step 2: Placing 3D model...");
    
    avatar.visible = true;
    avatar.position.set(0, 0, 0);
    
    console.log("Step 3: Starting 15-second countdown...");
    
    // Step 3: Start 15-second timer
    redirectTimer = setTimeout(() => {
      console.log("Step 4: Redirecting to Google...");
      window.location.href = "https://dhivagar-ceg.github.io/national-education-summit-2025/";
    }, 11000);
  };

  // Hide model and clear timer when target is lost
  anchor.onTargetLost = () => {
    console.log("Target lost - hiding model and clearing timer");
    avatar.visible = false;
    
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      redirectTimer = null;
    }
  };

  // Start MindAR
  await mindarThree.start();
  
  // Animation loop
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    mixer.update(clock.getDelta());
    renderer.render(scene, camera);
  });
};

start();




























// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

// const start = async () => {
//   // Initialize MindAR
//   const mindarThree = new MindARThree({
//     container: document.querySelector("#ar-container"),
//     imageTargetSrc: "/Newtargets.mind"
//   });

//   const { renderer, scene, camera } = mindarThree;
//   const anchor = mindarThree.addAnchor(0);

//   // Add lighting
//   scene.add(new THREE.AmbientLight(0xffffff, 0.8));
//   const dir = new THREE.DirectionalLight(0xffffff, 1);
//   dir.position.set(0, 2, 2);
//   scene.add(dir);

//   // Renderer settings
//   renderer.outputColorSpace = THREE.SRGBColorSpace;
//   renderer.toneMapping = THREE.ACESFilmicToneMapping;
//   renderer.toneMappingExposure = 1;

//   // Load 3D model
//   const gltf = await new GLTFLoader().loadAsync("/2.glb");
//   const avatar = gltf.scene;
//   avatar.scale.set(0.35, 0.35, 0.35);
//   avatar.rotation.x = Math.PI / 2;
//   avatar.visible = false; // Initially hidden
//   anchor.group.add(avatar);

//   // Animation mixer - Play ALL animations
//   const mixer = new THREE.AnimationMixer(avatar);
  
//   // Check if model has animations
//   if (gltf.animations && gltf.animations.length > 0) {
//     console.log(`Found ${gltf.animations.length} animations in the model`);
    
//     // Play all animations
//     gltf.animations.forEach((clip, index) => {
//       console.log(`Playing animation ${index}: ${clip.name || 'Unnamed'}`);
//       const action = mixer.clipAction(clip);
//       action.play();
//     });
//   } else {
//     console.log("No animations found in the model");
//   }

//   let redirectTimer = null;

//   // Step 2: Place the model when target is found
//   anchor.onTargetFound = () => {
//     console.log("Step 1: Target tracked successfully!");
//     console.log("Step 2: Placing 3D model...");
    
//     avatar.visible = true;
//     avatar.position.set(0, 0, 0);
    
//     console.log("Step 3: Starting 15-second countdown...");
    
//     // Step 3: Start 15-second timer
//     redirectTimer = setTimeout(() => {
//       console.log("Step 4: Redirecting to Google...");
//       window.location.href = "https://www.google.com";
//     }, 15000);
//   };

//   // Hide model and clear timer when target is lost
//   anchor.onTargetLost = () => {
//     console.log("Target lost - hiding model and clearing timer");
//     avatar.visible = false;
    
//     if (redirectTimer) {
//       clearTimeout(redirectTimer);
//       redirectTimer = null;
//     }
//   };

//   // Start MindAR
//   await mindarThree.start();
  
//   // Animation loop
//   const clock = new THREE.Clock();
//   renderer.setAnimationLoop(() => {
//     mixer.update(clock.getDelta());
//     renderer.render(scene, camera);
//   });
// };

// start();



















// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

// const start = async () => {
//   // Initialize MindAR
//   const mindarThree = new MindARThree({
//     container: document.querySelector("#ar-container"),
//     imageTargetSrc: "/Newtargets.mind"
//   });

//   const { renderer, scene, camera } = mindarThree;
//   const anchor = mindarThree.addAnchor(0);

//   // Add lighting
//   scene.add(new THREE.AmbientLight(0xffffff, 0.8));
//   const dir = new THREE.DirectionalLight(0xffffff, 1);
//   dir.position.set(0, 2, 2);
//   scene.add(dir);

//   // Renderer settings
//   renderer.outputColorSpace = THREE.SRGBColorSpace;
//   renderer.toneMapping = THREE.ACESFilmicToneMapping;
//   renderer.toneMappingExposure = 1;

//   // Load 3D model
//   const gltf = await new GLTFLoader().loadAsync("/2.glb");
//   const avatar = gltf.scene;
//   avatar.scale.set(0.35, 0.35, 0.35);
//   avatar.rotation.x = Math.PI / 2;
//   avatar.visible = false; // Initially hidden
//   anchor.group.add(avatar);

//   // Animation mixer
//   const mixer = new THREE.AnimationMixer(avatar);
//   mixer.clipAction(gltf.animations[0]).play();

//   let redirectTimer = null;

//   // Step 2: Place the model when target is found
//   anchor.onTargetFound = () => {
//     console.log("Step 1: Target tracked successfully!");
//     console.log("Step 2: Placing 3D model...");
    
//     avatar.visible = true;
//     avatar.position.set(0, 0, 0);
    
//     console.log("Step 3: Starting 15-second countdown...");
    
//     // Step 3: Start 15-second timer
//     redirectTimer = setTimeout(() => {
//       console.log("Step 4: Redirecting to Google...");
//       window.location.href = "https://www.google.com";
//     }, 15000);
//   };

//   // Hide model and clear timer when target is lost
//   anchor.onTargetLost = () => {
//     console.log("Target lost - hiding model and clearing timer");
//     avatar.visible = false;
    
//     if (redirectTimer) {
//       clearTimeout(redirectTimer);
//       redirectTimer = null;
//     }
//   };

//   // Start MindAR
//   await mindarThree.start();
  
//   // Animation loop
//   const clock = new THREE.Clock();
//   renderer.setAnimationLoop(() => {
//     mixer.update(clock.getDelta());
//     renderer.render(scene, camera);
//   });
// };

// start();