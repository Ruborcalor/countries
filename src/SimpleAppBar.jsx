import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
}));

const SimpleAppBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Cole Killian Countries
          </Typography>
          <FormGroup>
          <FormControlLabel
            control={<Switch checked={props.darkMode} onChange={props.toggleTheme} />}
            label="Dark Mode"
          />
          </FormGroup>
          {/* <Typography variant="h6"> */}
          {/*   Cole Killian */}
          {/* </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SimpleAppBar;
