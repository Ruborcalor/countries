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
  // stores the search query
  const [search, setSearch] = React.useState("");

  // stores the regions to filter by
  const [regions, setRegions] = React.useState(
    allRegions.reduce((obj, region) => {
      obj[region] = false;
      return obj;
    }, {})
  );

  // stores the list of countries after filtering
  const [filteredCountries, setFilteredCountries] = React.useState(
    props.countryData
  );

  // stores the list of countries to be displayed
  // they are pulled from the filteredCountries with lazy loading
  const [displayedCountries, setDisplayedCountries] = React.useState(
    props?.countryData?.slice(0, lazyLoadSpeed)
  );

  // indicates whether or not there are any countries
  // left to display after filtering
  const [noCountries, setNoCountries] = React.useState(false);

  // update filtered countries whenever country data changes
  useEffect(() => {
    setFilteredCountries(props.countryData);
  }, [props.countryData]);

  // update displayed countries whenver filteredCountries changes
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

  // function for loading more countries to display
  // from filteredCountries
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

  // function for updating the filteredCountries
  // based on the search query / region filter
  const updateFilteredCountries = (searchQuery, regionsObject) => {
    searchQuery = searchQuery.toLowerCase();
    const validRegions = Object.keys(regionsObject).filter(
      (region) => regionsObject[region]
    );

    let newFilteredCountries = [];

    if (searchQuery !== "" && validRegions.length !== 0 && props.countryData) {
      // if both search query and valid regions are non trivial,
      // filter by both of them
      newFilteredCountries = props.countryData.filter(
        (countryObject) =>
          countryObject.name.toLowerCase().includes(searchQuery) &&
          validRegions.includes(countryObject.region)
      );
    } else if (searchQuery !== "" && props.countryData) {
      // if only the search query is non trivial, only filter by search query
      newFilteredCountries = props.countryData.filter((countryObject) =>
        countryObject.name.toLowerCase().includes(searchQuery)
      );
    } else if (validRegions.length !== 0 && props.countryData) {
      // if only the region filter is non trivial, only filter by the region filter
      newFilteredCountries = props.countryData.filter((countryObject) =>
        validRegions.includes(countryObject.region)
      );
    } else {
      // if both the search query and region filter are trivial, don't filter
      newFilteredCountries = props.countryData;
    }
    // update whether or not there are any countries left after filtering
    setNoCountries(newFilteredCountries.length === 0);
    // update the filteredCountries
    setFilteredCountries(newFilteredCountries);
  };

  // handle a change of the search query text input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    updateFilteredCountries(event.target.value, regions);
  };

  // handle a change of the region filter checkboxes
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
        {/* display the text field for search queries */}
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
        {/* display the checkboxes for the region filter */}
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
        {/* display the number of matching countries indicator */}
        <Typography variant="body1" style={{ textAlign: "left" }}>
          {filteredCountries ? filteredCountries.length : 0} Matches
        </Typography>
      </div>
      {noCountries ? (
        /* if no countries are left after the filter, let the user know */
        <p>No countries left</p>
      ) : displayedCountries ? (
        /* if there are countries to display, display them in a card grid */
        <CountryCardGrid
          countryData={displayedCountries}
          setSelectedCountry={props.setSelectedCountry}
          loadMoreCountries={loadMoreCountries}
        />
      ) : (
        /* if there aren't any countries to display yet, show a circular loader */
        <CircularProgress />
      )}
    </div>
  );
};

export default CountryDashboard;
