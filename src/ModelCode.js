// import React, { useState } from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// import { IconButton } from "@mui/material";
// import RotateIcon from "../src/Images/RotateIcon.png";
// // import { OBJModel } from "react-3d-viewer";
// import Podium from "../src/Images/Podium-removebg-preview.png";
// const Model = ({ rotation }) => {
//   const materials = useLoader(
//     MTLLoader,
//     "./model/Humano_01Business_01_30K.mtl"
//   );
//   const obj = useLoader(
//     OBJLoader,
//     "./model/Humano_01Business_01_30K.obj",
//     (loader) => {
//       materials.preload();
//       loader.setMaterials(materials);
//     }
//   );

//   return (
//     <mesh rotation={[rotation.x, rotation.y, rotation.z]}>
//       <primitive object={obj} />
//     </mesh>
//   );
// };

// export default function App() {
//   const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
//   const [intervalId, setIntervalId] = useState(null);

//   const handleRotateStart = () => {
//     // Start rotating with faster speed
//     const id = setInterval(() => {
//       setRotation((prev) => ({
//         ...prev,
//         y: prev.y + Math.PI / 10, // Rotate 9 degrees per interval
//       }));
//     }, 100); // Update rotation every 100ms
//     setIntervalId(id);
//   };

//   const handleRotateStop = () => {
//     // Stop rotating
//     if (intervalId) {
//       clearInterval(intervalId);
//       setIntervalId(null);
//     }
//   };

//   return (
//     <div style={{ width: "25vw", height: "100vh", position: "relative" }}>
//       {/* Rotate Button */}
//       <IconButton
//         onMouseDown={handleRotateStart} // Start rotation on mouse down
//         onMouseUp={handleRotateStop} // Stop rotation on mouse up
//         onMouseLeave={handleRotateStop} // Stop rotation if mouse leaves button
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "30px",
//           zIndex: 10,
//         }}
//       >
//         <img
//           src={RotateIcon}
//           alt="Rotate Icon"
//           style={{ width: 40, height: 40 }}
//         />
//       </IconButton>

//       {/* 3D Viewer */}
//       <Canvas camera={{ fov: 100, position: [0, 0, 200] }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[2, 2, 2]} />
//         <Model rotation={rotation} />
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";
import { Box, IconButton } from "@mui/material";
import RotateIcon from "../src/Images/RotateIcon.png";
import PodiumTexture from "../src/Images/Podium-removebg-preview.png";

const Model = ({ rotation }) => {
  const materials = useLoader(
    MTLLoader,
    "./model/Humano_01Business_01_30K.mtl"
  );
  const obj = useLoader(
    OBJLoader,
    "./model/Humano_01Business_01_30K.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );

  return (
    <mesh
      rotation={[rotation.x, rotation.y, rotation.z]}
      position={[0, 0.5, 0]}
      // scale={[1, 1, 1]} // Adjust scale for height
    >
      <primitive object={obj} />
    </mesh>
  );
};

const Podium = () => {
  const podiumTexture = useLoader(THREE.TextureLoader, PodiumTexture);

  return (
    <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
      {/* Create a vertical plane for the podium */}
      <planeGeometry args={[200, 100]} />
      <meshStandardMaterial
        map={podiumTexture}
        transparent={true}
        alphaTest={0.5} // Ensure transparency is applied correctly
        emissive={0x000000} // Ensure no unwanted emissive light
        reflectivity={0} // No reflective properties
        metalness={0} // Non-metallic, matte finish
        roughness={1} // Make it completely matte
        color={0xffffff} // Force white color for material to avoid unexpected colors
      />
    </mesh>
  );
};

export default function App() {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [intervalId, setIntervalId] = useState(null);

  const handleRotateStart = () => {
    const id = setInterval(() => {
      setRotation((prev) => ({
        ...prev,
        y: prev.y + Math.PI / 10, // Rotate 9 degrees per interval
      }));
    }, 100);
    setIntervalId(id);
  };

  const handleRotateStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <>
      <div style={{ width: "25vw", height: "100vh", position: "relative" }}>
        {/* Rotate Button */}
        <IconButton
          onMouseDown={handleRotateStart}
          onMouseUp={handleRotateStop}
          onMouseLeave={handleRotateStop}
          style={{
            position: "absolute",
            top: "10px",
            right: "30px",
            zIndex: 10,
          }}
        >
          <img
            src={RotateIcon}
            alt="Rotate Icon"
            style={{ width: 40, height: 40 }}
          />
        </IconButton>

        {/* 3D Viewer */}
        {/* <Canvas camera={{ fov: 100, position: [0, 0, 200] }}>
          <hemisphereLight intensity={0.2} />
          <directionalLight position={[2, 2, 2]} intensity={1} />{" "}
          
          <Model rotation={rotation} />
          <OrbitControls enableRotate={true} />
        </Canvas>
        <Podium />
        <Box
          sx={{
            mt: "-140%", 
          }}
        >
          <img
            src={PodiumTexture}
            style={{ width: "460px", height: "200px" }}
          />
        </Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            // backgroundColor: "red",
            // height: "180vh",
          }}
        >
          {/* Canvas Section */}
          <Box sx={{ height: "150vh", width: "100%" }}>
            <Canvas camera={{ fov: 100, position: [0, 0, 200] }}>
              <hemisphereLight intensity={0.2} /> {/* Gentle ambient light */}
              <directionalLight position={[2, 2, 2]} intensity={1} />{" "}
              {/* Bright directional light */}
              <Model rotation={rotation} /> {/* Add the Model */}
              <OrbitControls enableRotate={true} />
            </Canvas>
          </Box>

          {/* Podium Image */}
          <Box
            sx={{
              mt: "-185%", // Adjust spacing between Canvas and Image
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={PodiumTexture}
              alt="Podium Texture"
              style={{
                width: "460px",
                height: "200px",
              }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}

// import React from "react";
// import { OBJModel } from "react-3d-viewer";
// import axios from "axios";
// import material from "./model/material.obj";
// import materialMtl from "./model/material.mtl";

// export default class extends React.Component {
//   render() {
//     const height = window.innerHeight;
//     const width = window.innerWidth;

//     return (
//       <OBJModel
//         height={height}
//         position={{ x: 0, y: -2.5, z: 0 }}
//         scale={{ x: 0.25, y: 0.25, z: 0.25 }}
//         src={material}
//         mtl={materialMtl}
//         width={width}
//       />
//     );
//   }
// }
