import React, { Suspense } from "react";
import Header from "./Header";
import WeightageValues from "./WeightageValues";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Footer from "./Footer";

// Model Component (Updated for Centering)
const Model = () => {
  const obj = useLoader(OBJLoader, "/model/material.obj"); // Path assumes a public directory
  return (
    <primitive object={obj} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />
  );
};

const ICPScreen = () => {
  return (
    <>
      <Header />
      <WeightageValues />
      <Footer />
    </>
  );
};

export default ICPScreen;
