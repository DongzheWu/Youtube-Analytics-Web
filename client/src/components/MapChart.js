import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { getTop } from '../actions';
import { connect } from 'react-redux';
import '../assets/css/mapChart.css';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

/** MapChart is to display hot topics in countries. */
const MapChart = ({ setTooltipContent, getTop }) => {

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  const handleMoveEnd = (position) => {
    setPosition(position);
  }

  return (
    <>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      <div>
        <ComposableMap data-tip="" 
        projectionConfig={{ 
          rotate: [-10, 0, 0],
          scale: 155
        }}
        //Size of the map.
        width={800}
        height={400}
        style={{
          width: "100%",
          height: "auto",
        }}>
          <ZoomableGroup 
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            maxZoom = {3}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}

                    //Once the country is clicked, it will call API to get hot topics
                    onClick={() => {
                      const { NAME} = geo.properties;
                      setTooltipContent(`${NAME}`);
                      getTop(`${NAME}`);
                    }}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setTooltipContent(`${NAME}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#FFFFFF",
                        outline: "none"
                      },
                      hover: {
                        fill: "#6ddbf9",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "rgba(1, 23, 46, 0.996)",
                        outlineColor: "rgba(1, 23, 46, 0.996)"
                      }
                    }}
                  />
                ))}
            </Geographies>
          </ZoomableGroup>
       </ComposableMap>
      </div>
    </>
  );
};

const tmp = connect(null, {getTop: getTop})(MapChart);
export default memo(tmp);
