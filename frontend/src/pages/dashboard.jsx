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
    <TabPanel
    value="1"
    sx={{
      "&.MuiTabPanel-root": {
        padding: 0,
      },
    }}
  >
    <div
      ref={mapContainer}
      className="map-container w-[100vw] h-[94vh] inset-0 -z-5"
    />
    <StyledPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontSize: "1.1rem",
        }}
      >
        Highway, Vile Parle (E)
      </h1>
      <h3
        style={{
          color: "#fff",
          fontSize: "0.8rem",
        }}
      >
        by Eshan Trivedi
      </h3>
    </StyledPopover>
  </TabPanel>
  <TabPanel value="2">
  <Stack spacing={2}>
    {locationUn ? (
      locationUn.map((item) => (
        <Item className="!bg-[#165C3F] !drop-shadow-xl !border" key={item._id}>
          <Stat
            image={item.Image}
            username={item.by.Username}
            key={item._id}
            id={item._id}
            setRefresh={setRefresh}
            location={`${item.lng}, ${item.lat}`}
          />
        </Item>
      ))
    ) : (
      <h1>Loading...</h1>
    )}
  </Stack>
</TabPanel>
    </Box>
  );
}
