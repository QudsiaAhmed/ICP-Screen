import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import CandidateInfo from "./Candidates";
import Model from "./Model";
import GroupImg from "./Images/Group.png";
import ProgressBar from "./ProgressBar";

const WeightageValues = () => {
  const [experienceData, setExperienceData] = useState([
    { id: "item-1", heading: "Experience", years: "4 years", progress: 33.41 },
    {
      id: "item-2",
      heading: "Soft Skills",
      years: ["Work Ethics", "Creativity"],
      progress: 50.12,
    },
    {
      id: "item-3",
      heading: "Skills",
      years: ["React", "Java", "Python"],
      progress: 60.85,
    },
    { id: "item-4", heading: "Certificates", years: "React", progress: 25.34 },
    { id: "item-5", heading: "Achievements", years: "React", progress: 45.78 },
  ]);

  const [candidateData, setCandidateData] = useState([
    { id: "item-6", heading: "Location", details: "Karachi", progress: 33.41 },
    {
      id: "item-7",
      heading: "Projects",
      details: "Work Ethics",
      progress: 50.12,
    },
  ]);

  const draggedItem = useRef(null);
  const draggedIndex = useRef(null);

  const handleDragStart = (e, item, index, source) => {
    draggedItem.current = { ...item, source }; // Include source information
    draggedIndex.current = index;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    draggedItem.current = null;
    draggedIndex.current = null;
  };

  const handleDrop = (e, target, index) => {
    e.preventDefault();

    if (!draggedItem.current) return;

    // Determine the source and target data
    const sourceData =
      draggedItem.current.source === "experience"
        ? experienceData
        : candidateData;
    const setSourceData =
      draggedItem.current.source === "experience"
        ? setExperienceData
        : setCandidateData;

    const targetData = target === "experience" ? experienceData : candidateData;
    const setTargetData =
      target === "experience" ? setExperienceData : setCandidateData;

    // Create a new item with correct properties based on source and target
    const newItem = { ...draggedItem.current };

    // Adjust properties based on source and target
    if (draggedItem.current.source === "experience" && target === "candidate") {
      // Moving from experience to candidate
      newItem.details = newItem.years; // Convert years to details
      delete newItem.years;
    } else if (
      draggedItem.current.source === "candidate" &&
      target === "experience"
    ) {
      // Moving from candidate to experience
      newItem.years = newItem.details; // Convert details to years
      delete newItem.details;
    }

    if (sourceData === targetData) {
      // Reordering within the same box
      const updatedData = [...sourceData];
      updatedData.splice(draggedIndex.current, 1); // Remove dragged item from old position
      updatedData.splice(index, 0, newItem); // Insert dragged item at new position

      setSourceData(updatedData);
    } else {
      // Moving between boxes
      // Prevent duplication in target box
      const isDuplicate = targetData.some((data) => data.id === newItem.id);
      if (isDuplicate) {
        draggedItem.current = null;
        draggedIndex.current = null;
        return;
      }

      // Remove item from source
      const updatedSourceData = sourceData.filter(
        (data) => data.id !== newItem.id
      );

      // Add item to target
      const updatedTargetData = [...targetData];
      updatedTargetData.splice(index, 0, newItem);

      setSourceData(updatedSourceData);
      setTargetData(updatedTargetData);
    }

    // Clear references
    draggedItem.current = null;
    draggedIndex.current = null;
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      {/* Weightage Values Box */}
      <Box
        sx={{
          // height: "auto",
          width: "20%",
          backgroundColor: "#F6F3FE",
          borderRadius: "3px",
          mt: "1%",
          padding: "16px",
          ml: "20%",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "experience", experienceData.length)} // Drop zone for experience
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.3rem",
            mb: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            backgroundColor: "#BA8FFA",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          WeightageValues
        </Typography>
        {experienceData.map((item, index) => (
          <Box
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item, index, "experience")}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, "experience", index)}
            sx={{
              mt: "3%",
              backgroundColor: "white",
              cursor: "move",
              padding: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "#9AABBC" }}>
                {item.heading}
              </Typography>
              <img
                src={GroupImg}
                alt="Group"
                style={{
                  height: "20px",
                  marginLeft: "8px",
                  marginRight: "5px",
                }}
              />
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              {Array.isArray(item.years) ? (
                item.years.map((year, yearIndex) => (
                  <Box
                    key={yearIndex}
                    sx={{
                      backgroundColor: "#F1F1F1",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      width: "auto",
                      display: "inline-block",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#858F94",
                        fontWeight: "bold",
                      }}
                    >
                      {year}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{
                    backgroundColor: "#F1F1F1",
                    padding: "3px 8px",
                    borderRadius: "3px",
                    width: "auto",
                    display: "inline-block",
                    color: "#858F94",
                    fontWeight: "bold",
                  }}
                >
                  {item.years}
                </Typography>
              )}
              <Box
                sx={{ display: "flex", alignItems: "center", marginTop: "6%" }}
              >
                <ProgressBar progress={item.progress} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Model Component */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1.2%",
        }}
      >
        <Model />
      </Box>

      {/* Candidate Info Box */}
      <Box sx={{ width: "40%" }} onDragOver={(e) => e.preventDefault()}>
        <CandidateInfo
          candidateData={candidateData}
          onDragStart={(e, item, index) =>
            handleDragStart(e, item, index, "candidate")
          }
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
      </Box>
    </Box>
  );
};

export default WeightageValues;
