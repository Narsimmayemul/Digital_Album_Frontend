import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { FaRegPauseCircle, FaPlay, FaPause } from "react-icons/fa";
import Box from "@mui/material/Box";
import {
  Link,
  CircularProgress,
  Pagination,
  Button,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation, useParams } from "react-router-dom";
import DesignOne from "./Album_Design/DesignOne";
import DesignTwo from "./Album_Design/DesignTwo";

const UserPage = () => {
  // const navigation = useNavigation();

  //Demon Slayer ===  https://drive.google.com/drive/folders/1zxAfXJRdMTODwOlMaXAq3QRvJTaqyruq?usp=sharing
  let { id } = useParams();

  if (!id) {
    window.location.href = "/admin";
    // navigation("/admin");
  } else if (id == "narsimma") {
    id = "1zxAfXJRdMTODwOlMaXAq3QRvJTaqyruq";
  }
  // console.log(id);
  //   const ITEMS_PER_PAGE = 4;
  const folderUrl = `https://drive.google.com/drive/folders/${id}?usp=sharing`;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPage, setNewPage] = useState(currentPage);
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(2);
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = images.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const [direction, setDirection] = useState("next");
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const slideshowInterval = 4000;
  const backgroundImageRef = useRef(null);
  const [designNo, setDesignNo] = useState(1);

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

  const getRandomColorGenerator = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (!isSlideshowActive) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        const next = prev + 1;
        if (next > totalPages) return 1;
        setNewPage(next);
        return next;
      });
    }, slideshowInterval);

    return () => clearInterval(interval);
  }, [isSlideshowActive, totalPages]);

  return (
    <Box
      ref={backgroundImageRef}
      className="body-container"
      sx={{
        padding: 1,
        position: "relative",
        height: "100dvh",
      }}
    >
      <Box
        sx={{
          filter: "blur(5px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
        }}
        position={"absolute"}
        width={"100%"}
        height={"100%"}
        top={0}
        left={0}
      >
        {paginatedImages.map((item, index) => {
          const fileId = item.url.match(/\/d\/(.*?)\//)?.[1];
          if (!fileId) return null;

          return (
            <iframe
              key={index}
              src={`https://drive.google.com/file/d/${fileId}/preview`}
              style={{
                width: "50%",
                height: "100%",
                flexGrow: 1,
                aspectRatio: "5 / 3",
                frameBorder: "0",
                border: "none",
                transform: "scale(1.07)",
                backgroundSize: "cover",
              }}
              title="Google Drive Preview"
            />
          );
        })}
      </Box>
      <Navbar
        setITEMS_PER_PAGE={setITEMS_PER_PAGE}
        setIsSlideshowActive={setIsSlideshowActive}
        setDesignNo={setDesignNo}
        designNo={designNo}
        isSlideshowActive={isSlideshowActive}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      />
      <>
        <Button
          variant="outlined"
          onClick={() => setIsSlideshowActive(!isSlideshowActive)}
          sx={{
            backgroundColor: "black",
            mr: 1,
            height: "40px",
            width: "5%",
            mt: "1rem",
            mb: "1rem",
          }}
          color={isSlideshowActive ? "Black" : "Black"}
        >
          {isSlideshowActive ? <FaPause /> : <FaPlay />}
        </Button>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {designNo == 1 ? (
              <DesignOne
                paginatedImages={paginatedImages}
                currentPage={currentPage}
                handleDownload={handleDownload}
                handlePrevivew={handlePrevivew}
              />
            ) : (
              <DesignTwo
                paginatedImages={paginatedImages}
                currentPage={currentPage}
                handleDownload={handleDownload}
                handlePrevivew={handlePrevivew}
              />
            )}

            {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
            </Box> */}
            {!isSlideshowActive && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  backgroundColor: "#f2f4f4",
                  justifyContent: "center",
                  zIndex: 99,
                }}
              >
                <TextField
                  type="number"
                  value={newPage}
                  onChange={handlePageUpdate}
                  inputProps={{ min: 1, max: totalPages }}
                  style={{ width: "60px", marginRight: "1rem" }}
                  size="small"
                />
                <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                  Page {currentPage} of {totalPages}
                </Typography>
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
            )}
          </>
        )}
      </>
    </Box>
  );
};

export default UserPage;
