import { Box, Button, Input } from "@mui/material";
import React, { useState } from "react";
import QRCode from "react-qr-code";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [correct, setCorrect] = useState(false);
  const [click, setClick] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    URL: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "Narsimma" && password === "NS143") {
      setCorrect(true);
    } else {
      alert("Wrong credentials");
    }
  };

  const extractDriveId = (url) => {
    const match =
      url.match(/\/d\/(.+?)\//) || url.match(/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const handleDetails = (e) => {
    e.preventDefault();
    setClick(true);
    console.log("Submitted details:", details);
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h1>Login</h1> */}
      {!correct ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: "center",
            height: "30vh",
            gap: "1rem",
            width: "40%",
            border: "1px solid black",
            padding: "1rem",
          }}
          onSubmit={handleSubmit}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            // type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button
            sx={{
              width: "50%",
              backgroundColor: "grey",
              color: "white",
              alignSelf: "center",
            }}
            type="submit"
          >
            Login
          </Button>
        </form>
      ) : (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: "center",
            height: "auto",
            gap: "1rem",
            width: "40%",
            border: "1px solid black",
            padding: "1rem",
          }}
          onSubmit={handleDetails}
        >
          <Input
            name="name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Enter your name"
          />
          <Input
            name="URL"
            value={details.URL}
            onChange={(e) => setDetails({ ...details, URL: e.target.value })}
            placeholder="Enter your Google Drive URL"
          />
          <Button
            sx={{
              width: "50%",
              backgroundColor: "grey",
              color: "white",
              alignSelf: "center",
            }}
            type="submit"
          >
            Get QR Link
          </Button>

          {click && details.URL && extractDriveId(details.URL) && (
            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ color: "green" }}>Scan to get Link:</h4>
              <QRCode
                value={`https://digital-album-frontend.vercel.app/${extractDriveId(
                  details.URL
                )}`}
              />
              <p>
                <strong>ID:</strong> {extractDriveId(details.URL)}
              </p>
            </div>
          )}
        </form>
      )}
    </Box>
  );
};

export default Login;
