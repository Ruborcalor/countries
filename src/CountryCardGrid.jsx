import React from "react";
import Grid from "@material-ui/core/Grid";
import { Waypoint } from "react-waypoint";

import CountryCard from "./CountryCard";

const CountryCardGrid = (props) => {
  const { countryData } = props;

  return (
    <div>
      <Grid container spacing={5}>
        {countryData.map((countryObject, index) => (
          <Grid key={countryObject.name} item sm={4} xs={12}>
            <CountryCard
              countryObject={countryObject}
              setSelectedCountry={props.setSelectedCountry}
            />
            {/* insert a waypoint two rows from the bottom of the page that triggers more countries to load */}
            {index === countryData.length - 3 * 2 && (
              <Waypoint onEnter={() => props.loadMoreCountries()} />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CountryCardGrid;
