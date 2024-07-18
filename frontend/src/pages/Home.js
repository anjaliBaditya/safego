import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Theme } from "../assets/theme.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { apiCheckLogin } from "../utilities/apiCall";
import axios from "axios";

const CssTextField = styled(TextField)({
  label: {
    color: "#fff",
  },
  "&.MuiTextField-root": {
    backgroundColor: "#165C3F",
  },
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& label.Mui-disabled": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

mapboxgl.accessToken =
  "TOKEN";

export default function Home() {
  const [progress, setProgress] = React.useState(0);
  const [color, setColor] = React.useState("");
  const [text, setText] = useState("");

  const [routeData, setRouteData] = useState(null);

  function search() {
    fetch(
      "https://api.unl.global/v2/geocode/forward?" +
        new URLSearchParams({
          query: text,
          country: "IN",
          limit: 10,
        }),
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-unl-api-key": "Ddm47D4q7Iq7ci026pTvaMsIDpinlJNl",
          "x-unl-vpm-id": "2d2639a7-b6d6-403a-b84c-95b63af2cae8",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        navigator.geolocation.getCurrentPosition((position) => {
          // let my = Geohash.encode(
          //   position.coords.latitude,
          //   position.coords.longitude,
          //   9
          // );
          // let way = Geohash.encode(
          //   response.features[0].geometry.coordinates[1],
          //   response.features[0].geometry.coordinates[0],
          //   9
          // );
          // console.log(my, way);
          let a = `${position.coords.longitude},${position.coords.latitude};${response.features[0].geometry.coordinates[0]},${response.features[0].geometry.coordinates[1]}`;
          axios
            .get(`https://api.mapbox.com/directions/v5/mapbox/driving/${a}`, {
              params: {
                access_token: mapboxgl.accessToken,
                geometries: "geojson",
                steps: true,
                overview: "full",
                alternatives: true,
                exclude: "unpaved",
              },
              withCredentials: false,
            })
            .then((res) => {
              setRouteData(res);
              const geojson = res.data.routes[0].geometry;
              addRoute(geojson);
              addTrafficRoute(geojson);
            })
            .catch((err) => {});
        });
      });
  }
  function addRoute(coords) {
    if (map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    } else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: coords,
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#03AA46",
          "line-width": 8,
          "line-opacity": 0.8,
        },
      });
    }
  }
  return (
  );
}
