import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {},
}));

const CountryView = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const countryObject = props.selectedCountry;
  console.log(countryObject);

  return (
    <div style={{ width: "80%", margin: "40px auto 0 auto" }}>
      <div style={{ textAlign: "left", marginBottom: 40 }}>
        <IconButton onClick={props.backToDash}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <Grid container spacing={5}>
        <Grid item sm={6} xs={12}>
          <Typography component="h4" variant="h4" style={{ textAlign: "left", fontWeight: "bold" }}>
            {countryObject.name}
          </Typography>
          <Typography
            component="h5"
            variant="body1"
            style={{ textAlign: "left" }}
          >
            <ul>
              <li>Alpha 2 Code: {countryObject.alpha2Code}</li>
              <li>Alpha 3 Code: {countryObject.alpha3Code}</li>
              <li>Area: {countryObject.area}</li>
              <li>Borders: {countryObject.borders.join(", ")}</li>
              <li>Capital: {countryObject.capital}</li>
              <li>
                Currencies:{" "}
                {countryObject.currencies
                  .map((currencyObject, index) => currencyObject.name)
                  .join(", ")}
              </li>
              <li>
                Languages:{" "}
                {countryObject.languages
                  .map((languageObject, index) => languageObject.name)
                  .join(", ")}
              </li>
              <li>Population: {countryObject.population}</li>
              <li>Region: {countryObject.region}</li>
              <li>Subregion: {countryObject.subregion}</li>
              <li>Timezone: {countryObject.timezones}</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <img
            className={classes.cover}
            src={countryObject.flag}
            alt="Country Flag Image"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CountryView;
