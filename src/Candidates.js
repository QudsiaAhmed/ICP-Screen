import React from "react";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import GroupImg from "./Images/Group.png";
const CandidateInfo = ({ candidateData, onDragStart, onDragEnd, onDrop }) => {
  return (
    <Box
      sx={{
        height: "92%",
        width: "50%",
        backgroundColor: "#ECF9FB",
        borderRadius: "3px",
        marginRight: "20%",
        mt: "3%",
        padding: "16px",
        border: "1px solid #F0F0F0",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, "candidate", candidateData.length)}
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
          backgroundColor: "#4BC7E1",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        Compulsory For Candidates
      </Typography>
      {candidateData.map((item, index) => (
        <Box
          key={item.id}
          draggable
          onDragStart={(e) => onDragStart(e, item, index)}
          onDragEnd={onDragEnd}
          onDrop={(e) => onDrop(e, "candidate", index)}
          sx={{
            mt: "3%",
            backgroundColor: "white",
            cursor: "move",
            padding: "8px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Pushes content to the far ends
              fontWeight: "bold",
              color: "#9AABBC",
            }}
          >
            {/* Left-side content */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {item.heading}
              <LockIcon
                sx={{
                  color: "#4BC7E1",
                  fontSize: "1.2rem",
                  ml: "8px", // Space between heading and LockIcon
                }}
              />
            </Box>

            {/* Right-side content */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={GroupImg}
                alt="Group"
                style={{
                  height: "20px", // Adjust size
                  marginRight: "5px",
                }}
              />
            </Box>
          </Typography>

          <Box sx={{ marginTop: "5px" }}>
            {Array.isArray(item.details) ? (
              item.details.map((detail, detailIndex) => (
                <Box
                  key={detailIndex}
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
                    {detail}
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
                {item.details}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CandidateInfo;
