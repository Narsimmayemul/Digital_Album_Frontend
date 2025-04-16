import { useEffect, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";

// import { Avatar, CardMedia, ImageList, ImageListItem } from "@mui/material";

function App() {
  const folderUrl =
    "https://drive.google.com/drive/folders/1zxAfXJRdMTODwOlMaXAq3QRvJTaqyruq?usp=sharing";

  const [images, setImages] = useState([]);

  // Fetch images from the backend API
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
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getDriveImages();
  }, []);

  // https://drive.google.com/file/d/1Rsxpqx-9fnl0x0Z0VrXNoETc9cyudiUB/view?usp=sharing
  return (
    <div>
      <h2>Google Drive Image Gallery</h2>
      {images.map((item, ind) => {
        const fileId = item.url.match(/\/d\/(.*?)\//)?.[1];
        if (!fileId) return null;
        console.log(fileId);
        // const imageUrl = `https://drive.google.com/thumbnail?id=15QHRLSbY3O81yRPxFmXdLeTYlvjobpkB`;

        return (
          <Box
            key={ind}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: 2,
              margin: 2,
              width: "100%",
              maxWidth: 600,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <iframe
              src={`https://drive.google.com/file/d/${fileId}/preview`}
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "8px",
                border: "none",
                marginBottom: "1rem",
              }}
              title="Google Drive Preview"
              allow="autoplay"
            />

            <Link
              href={`https://drive.google.com/file/d/${fileId}/view?usp=drivesdk`}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Download
            </Link>
          </Box>
        );
      })}
    </div>
  );
}

export default App;
