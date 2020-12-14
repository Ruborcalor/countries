import "./App.css";
import axios from "axios";
import React, { useEffect } from "react";
import SimpleAppBar from "./SimpleAppBar";
import CountryDashboard from "./CountryDashboard";
import CountryView from "./CountryView";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  // stores data on all the countries pulled from rest api
  const [countryData, setCountryData] = React.useState();
  // stores data on the country that the user is learning more about
  const [selectedCountry, setSelectedCountry] = React.useState();
  // boolean representing whether or not the site is in dark mode
  const [darkMode, setDarkMode] = React.useState(false);

  // create theme to be dark or light based on darkmode
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  // toggles the theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // on first load, pull data from the restcountries api
  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((res) => {
      setCountryData(res.data);
    });
  }, []);

  return (
    // wrap the app with ThemeProvider
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/* display the simple app bar at the top of the page */}
        <SimpleAppBar darkMode={darkMode} toggleTheme={toggleTheme} />
        {selectedCountry ? (
          /* if a country is selected, display the country view for that country */
          <CountryView
            selectedCountry={selectedCountry}
            backToDash={() => setSelectedCountry()}
          />
        ) : (
          /* if no country is selected, show the country dashboard */
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
