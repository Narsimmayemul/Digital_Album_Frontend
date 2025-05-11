import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Select, MenuItem, Button } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";

const Navbar = ({
  setITEMS_PER_PAGE,
  ITEMS_PER_PAGE,
  setDesignNo,
  designNo,
  setIsSlideshowActive,
  isSlideshowActive,
}) => {
  return (
    <Box sx={{ flexGrow: 1,zIndex:99 }}>
      <AppBar position="static" sx={{ backgroundColor: "teal",zIndex:99 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Digital Album
          </Typography>

          {/* <Button
                variant="outlined"
                onClick={() => setIsSlideshowActive(!isSlideshowActive)}
                sx={{backgroundColor: 'black' , mr:1, height:'40px' , width:'5%'}}
                color={isSlideshowActive ? "Black" : "Black"}
              >
                
                {isSlideshowActive ? <FaRegPauseCircle /> : <FaPlay />}
              </Button> */}
          <Box sx={{ display: "flex" , justifyContent:'space-around' }}>
            <Box sx={{ display: "flex" }}>
              <Typography fontSize={18}>Background -</Typography>

              <Select
                value={designNo}
                onChange={(e) => setDesignNo(Number(e.target.value))}
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 1, width: "15%" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                {/* <MenuItem value={4}>4</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem> */}
              </Select>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography fontSize={18}>Photo per page -</Typography>

              <Select
                value={ITEMS_PER_PAGE}
                onChange={(e) => setITEMS_PER_PAGE(Number(e.target.value))}
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
