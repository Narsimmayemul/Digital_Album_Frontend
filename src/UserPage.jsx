import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import {
  Link,
  CircularProgress,
  Pagination,
  Button,
  Input,
  TextField,
} from "@mui/material";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import DesignOne from "./Album_Design/DesignOne";

const UserPage = () => {

    //Demon Slayer ===  https://drive.google.com/drive/folders/1zxAfXJRdMTODwOlMaXAq3QRvJTaqyruq?usp=sharing
  let { id } = useParams();
  if (!id) {
    // window.location.href = "/admin";
    id = "1zxAfXJRdMTODwOlMaXAq3QRvJTaqyruq"
  }
  console.log(id);
  const ITEMS_PER_PAGE = 4;
  const folderUrl =
    `https://drive.google.com/drive/folders/${id}?usp=sharing`;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPage, setNewPage] = useState(currentPage);

  const handleDownload = (fileId) => {
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrevivew = (fileId) => {
    const previewUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    window.open(previewUrl, "_blank");
  };
  const getDriveImages = async () => {
    try {
      const response = await fetch(
        `https://digital-album-backend.onrender.com/proxy?folderUrl=${folderUrl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDriveImages();
  }, []);

  const handlePageUpdate = (e) => {
    setNewPage(e.target.value);
    const newPage = parseInt(e.target.value, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = images.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const [direction, setDirection] = useState("next");

  return (
    <Box sx={{ padding: 1, backgroundColor: "#f5f5f5", w: "100%" }}>
      <>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>📸</h2>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <DesignOne
              paginatedImages={paginatedImages}
              currentPage={currentPage}
              handleDownload={handleDownload}
              handlePrevivew={handlePrevivew}
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <TextField
                type="number"
                value={newPage}
                onChange={handlePageUpdate}
                inputProps={{ min: 1, max: totalPages }}
                style={{ width: "60px", marginRight: "1rem" }}
                size="small"
              />

              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => {
                  setCurrentPage(page);
                  setNewPage(page);
                }}
                color="primary"
              />
            </Box>
          </>
        )}
      </>
    </Box>
  );
};

export default UserPage;
