import React, { useEffect } from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import CountryCardGrid from "./CountryCardGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

const allRegions = ["Asia", "Europe", "Africa", "Oceania", "Americas", "Polar"];
const lazyLoadSpeed = 3 * 3;

const CountryDashboard = (props) => {
  const [search, setSearch] = React.useState("");
  const [filteredCountries, setFilteredCountries] = React.useState(
    props.countryData
  );

  const [displayedCountries, setDisplayedCountries] = React.useState(
    props?.countryData?.slice(0, lazyLoadSpeed)
  );

  const [regions, setRegions] = React.useState(
    allRegions.reduce((obj, region) => {
      obj[region] = false;
      return obj;
    }, {})
  );

  const [noCountries, setNoCountries] = React.useState(false);

  useEffect(() => {
    setFilteredCountries(props.countryData);
  }, [props.countryData]);

  useEffect(() => {
    if (filteredCountries) {
      setDisplayedCountries(
        filteredCountries.slice(
          0,
          Math.min(lazyLoadSpeed, filteredCountries.length)
        )
      );
    }
  }, [filteredCountries]);

  const loadMoreCountries = () => {
    // add lazyLoadSpeed more displayed countries
    setDisplayedCountries([
      ...displayedCountries,
      ...filteredCountries.slice(
        displayedCountries.length,
        displayedCountries.length + lazyLoadSpeed
      ),
    ]);
  };

  const updateFilteredCountries = (searchQuery, regionsObject) => {
    searchQuery = searchQuery.toLowerCase();
    const validRegions = Object.keys(regionsObject).filter(
      (region) => regionsObject[region]
    );

    let newFilteredCountries = [];

    if (searchQuery !== "" && validRegions.length !== 0 && props.countryData) {
      newFilteredCountries = props.countryData.filter(
        (countryObject) =>
          countryObject.name.toLowerCase().includes(searchQuery) &&
          validRegions.includes(countryObject.region)
      );
    } else if (searchQuery !== "" && props.countryData) {
      newFilteredCountries = props.countryData.filter((countryObject) =>
        countryObject.name.toLowerCase().includes(searchQuery)
      );
    } else if (validRegions.length !== 0 && props.countryData) {
      newFilteredCountries = props.countryData.filter((countryObject) =>
        validRegions.includes(countryObject.region)
      );
    } else {
      newFilteredCountries = props.countryData;
    }
    setNoCountries(newFilteredCountries.length === 0);
    setFilteredCountries(newFilteredCountries);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    updateFilteredCountries(event.target.value, regions);
  };

  const handleRegionChange = (event) => {
    setRegions({ ...regions, [event.target.name]: event.target.checked });
    updateFilteredCountries(search, {
      ...regions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div style={{ width: "80%", margin: "80px auto 0 auto" }}>
      <div
        id="filterPanel"
        style={{
          marginBottom: 30,
        }}
      >
        <TextField
          label="Search for a country..."
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <SearchIcon />
                &nbsp;
              </InputAdornment>
            ),
          }}
          style={{
            width: "100%",
          }}
        />
        <FormGroup row>
          {allRegions.map((region, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={regions[region]}
                  onChange={handleRegionChange}
                  name={region}
                />
              }
              label={region}
            />
          ))}
        </FormGroup>
        <Typography variant="body1" style={{ textAlign: "left" }}>
          {filteredCountries ? filteredCountries.length : 0} Matches
        </Typography>
      </div>
      {noCountries ? (
        <p>No countries left</p>
      ) : displayedCountries ? (
        <div>
          <CountryCardGrid
            countryData={displayedCountries}
            setSelectedCountry={props.setSelectedCountry}
            loadMoreCountries={loadMoreCountries}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default CountryDashboard;
