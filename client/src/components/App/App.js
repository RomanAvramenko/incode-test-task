import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import { WEBSOCKET_SEND } from "../../store/actionTypes";
import { Ticker } from "../Ticker/Ticker";
import "./App.scss";

function App() {
  const { prevTicker, ticker } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WEBSOCKET_SEND });
  }, []);

  const renderTickers = ticker.map((i, index) => {
    let comparison;
    if (prevTicker.length > 0) {
      comparison = prevTicker[index].price > i.price;
    }
    return (
      <Paper
        key={index}
        elevation={3}
        children={<Ticker data={i} comparison={comparison} />}
      />
    );
  });

  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "1em",
          "& > :not(style)": {
            m: 1,
            width: 167,
            height: 70,
          },
        }}
      >
        {renderTickers}
      </Box>
    </div>
  );
}

export default App;
