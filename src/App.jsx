import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ProductPortal from "./components/ProductPortal";

const theme = createTheme({
  palette: {
    mode: "light", // Change to "dark" if you want default dark mode
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductPortal />
    </ThemeProvider>
  );
}

export default App;