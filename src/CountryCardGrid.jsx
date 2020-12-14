import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Waypoint } from 'react-waypoint';

import CountryCard from "./CountryCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  body: {
    textAlign: "left",
  },
}));

const CountryCardGrid = (props) => {
  const { countryData } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {countryData.map((countryObject, index) => (
          <Grid key={countryObject.name} item sm={4} xs={12}>
            <CountryCard
              classes={classes}
              countryObject={countryObject}
              setSelectedCountry={props.setSelectedCountry}
            />
            {(index === countryData.length - 3 * 2 &&
              <Waypoint onEnter={() => props.loadMoreCountries()} />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CountryCardGrid;
