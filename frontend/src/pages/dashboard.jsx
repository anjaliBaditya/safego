import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import apiPost, { apiCheckLogin } from "../utilities/apiCall";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Stat from "./Stat";
import StatDone from "./StatDone";

function getRandomCoordinates(currentLocation, radius) {
  const x0 = currentLocation[0];
  const y0 = currentLocation[1];
  const rd = radius / 111300; // about 111300 meters in one degree

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newX = x / Math.cos(y0);

  return [x0 + newX, y0 + y];
}

mapboxgl.accessToken =
  "";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");
  return (
    <Box
      sx={{ width: "100%", typography: "body1", height: "100vh" }}
      className="!bg-[#fff]"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", zIndex: 15 }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
            indicatorColor="white"
            sx={{
              backgroundColor: "#13724A",
              "& .MuiTab-root": {
                color: "#fff !important",
              },
              "& .Mui-selected": {
                borderBottom: "3px solid #fff",
              },
            }}
          >
            <Tab
              label="BMC ADMIN PORTAL"
              value="0"
              sx={{
                width: "400px",
                marginLeft: "-150px",
                fontSize: "20px",
              }}
            />
            <Tab
              label="Map Data"
              value="1"
              sx={{
                width: "150px",
                margin: "0px 50px",
              }}
            />
            <Tab
              label="Incoming Reports"
              value="2"
              sx={{
                width: "200px",
                margin: "0px 50px",
              }}
            />
            <Tab
              label="Resolved Reports"
              value="3"
              sx={{
                width: "200px",
                margin: "0px 50px",
              }}
            />
          </TabList>
        </Box> 
    </Box>
  );
}
