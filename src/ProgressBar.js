import React, { useState } from "react";

const Progressbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBoxClick = (index) => {
    setActiveIndex(index);
  };

  const calculateWidth = () => {
    return "20%"; // Adjust width dynamically if needed
  };

  const calculateProgress = () => {
    return `${(activeIndex + 1) * 20}%`;
  };

  return (
    <div
      className="progress-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "20px",
          width: "100%",
          borderRadius: "50px",
          overflow: "hidden",
        }}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="progress-box"
            style={{
              flex: "1",
              backgroundColor: index <= activeIndex ? "#85E4A5" : "#F1F1F1",
              color: index <= activeIndex ? "white" : "#858F94",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease, color 0.3s ease",
              marginRight: index < 4 ? "2px" : "0", // Margin for spacing
              width: calculateWidth(),
            }}
            onClick={() => handleBoxClick(index)}
          ></div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: "-50px", // Adjust the offset as needed
          fontSize: "16px",
          fontWeight: "bold",
          color: "#C3A5FB",
        }}
      >
        {calculateProgress()}
      </div>
    </div>
  );
};

export default Progressbar;
