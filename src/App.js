import "./App.css";
import axios from "axios";
import React, { useEffect } from "react";
import SimpleAppBar from "./SimpleAppBar";
import CountryDashboard from "./CountryDashboard";
import CountryView from "./CountryView";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  const [countryData, setCountryData] = React.useState();
  const [selectedCountry, setSelectedCountry] = React.useState();
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      // type: "dark",
    },
    // typography: {
    //   fontFamily: ["Raleway", "sans-serif"].join(","),
    // },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((res) => {
      setCountryData(res.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SimpleAppBar darkMode={darkMode} toggleTheme={toggleTheme} />
        {selectedCountry ? (
          <CountryView
            selectedCountry={selectedCountry}
            backToDash={() => setSelectedCountry()}
          />
        ) : (
          <CountryDashboard
            countryData={countryData}
            setSelectedCountry={setSelectedCountry}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
