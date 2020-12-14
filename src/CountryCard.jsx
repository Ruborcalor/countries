import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Divider from "@material-ui/core/Divider";

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

const CountryCard = (props) => {
  const { classes, countryObject } = props;

  const { nodes, processors, jobs } = countryObject;

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.setSelectedCountry(countryObject)}>
        <img
          alt="Flag Image"
          src={countryObject.flag}
          style={{ objectFit: "cover", height: 200, width: "100%" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="h3"
            className={classes.body}
            style={{ fontWeight: "bold" }}
          >
            {countryObject.name}
          </Typography>

          <Typography variant="body1" component="h4" className={classes.body}>
            Population: {countryObject.population}
            <br />
            Region: {countryObject.region}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => props.setSelectedCountry(countryObject)}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default CountryCard;
