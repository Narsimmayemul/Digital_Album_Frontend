import { Box, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";


const DesignOne = ({ paginatedImages, currentPage, handleDownload, handlePrevivew }) => {
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            justifyContent: "center",
          }}
        >
          {paginatedImages.map((item, index) => {
            const fileId = item.url.match(/\/d\/(.*?)\//)?.[1];
            if (!fileId) return null;

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: 2,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <iframe
                  src={`https://drive.google.com/file/d/${fileId}/preview`}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    // height: "auto",
                    aspectRatio: "4 / 3",
                    borderRadius: "8px",
                    border: "none",
                    marginBottom: "1rem",
                  }}
                  title="Google Drive Preview"
                  allow="autoplay"
                />

                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Button
                    onClick={() => handleDownload(fileId)}
                    style={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#1565c0")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#1976d2")
                    }
                  >
                    Download
                  </Button>

                  <Button
                    onClick={() => handlePrevivew(fileId)}
                    style={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#1565c0")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#1976d2")
                    }
                  >
                    Open
                  </Button>
                </Box>
              </Box>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DesignOne;
