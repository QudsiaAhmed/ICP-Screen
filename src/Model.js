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
      <div
        style={{
          width: "25vw",
          height: "100vh",
          position: "relative",
        }}
      >
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
          <Box sx={{ height: "100vh", width: "100%" }}>
            <Canvas camera={{ fov: 100, position: [0, 0, 280] }}>
              <hemisphereLight intensity={0.2} />
              <directionalLight position={[2, 2, 2]} intensity={1} />{" "}
              <Model rotation={rotation} />
              <OrbitControls enableRotate={true} enableZoom={false} />
            </Canvas>
          </Box>

          {/* Podium Image */}
          <Box
            sx={{
              mt: "-138%", // Adjust spacing between Canvas and Image
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
