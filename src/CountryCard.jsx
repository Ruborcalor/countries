import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const CountryCard = (props) => {
  const { countryObject } = props;

  return (
    <Card>
      <CardActionArea onClick={() => props.setSelectedCountry(countryObject)}>
        {/* display the country's flag */}
        <img
          alt="Flag"
          src={countryObject.flag}
          style={{ objectFit: "cover", height: 200, width: "100%" }}
        />
        <CardContent>
          {/* display the country's name */}
          <Typography
            variant="h6"
            component="h3"
            style={{ fontWeight: "bold", textAlign: "left" }}
          >
            {countryObject.name}
          </Typography>
          {/* display the country's population and region */}
          <Typography
            variant="body1"
            component="h4"
            style={{ textAlign: "left" }}
          >
            Population: {countryObject.population}
            <br />
            Region: {countryObject.region}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* show a learn more button for learning more about the country */}
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
