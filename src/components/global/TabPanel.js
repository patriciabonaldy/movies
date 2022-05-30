import React, {useEffect}  from "react";
import { useSelector,useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Container from "@material-ui/core/Container";
import { Icon } from "semantic-ui-react";
import axios from '../../axios-catalogo';
import * as actions from '../../store/actions';

import Actor from "../actors/Actor";
import Movie from "../movies/Movie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Container
      fixed
      role="tabpanel"
      hidden={value !== index}
      className={classes["MuiBox-root-210"]}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {children}
    </Container>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  "MuiAppBar - root": {
    width: "90 %;",
    display: "flex;",
    height: "50px;"
  },
  appBar: {
    width: `90%`,
    marginLeft: 0,
    zIndex: theme.zIndex.drawer + 1,
    height: "60px;"
  },
  "MuiBox-root-210": {
    padding: `24px;`,
    paddingTop: `24px;`,
    paddingRight: `24px;`,
    paddingBottom: `24px;`,
    paddingLeft: `24px;`
  }
}));

const tabStyle = {
  minWidth: 160
};
tabStyle.minWidth = 130;
tabStyle.paddingLeft = 0;
tabStyle.paddingRight = 0;
tabStyle.letterSpacing = "-.04em";

const labelStyle = { fontSize: "12px" };

export default function Setting(props) {  
  const storeCatalogo = useSelector(store => store);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  /* eslint-enable no-alert */

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            icon={<Icon name="cube" />}
            label={<span style={labelStyle}>Cubo</span>}
            {...a11yProps(0)}
          />
          <Tab
            style={tabStyle}
            icon={<Icon name="th" />}
            label={<span style={labelStyle}>Columnas</span>}
            {...a11yProps(0)}
          />
          <Tab label="Roles" icon={<PersonPinIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Cubo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Atributo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        roles aqui
      </TabPanel>
    </div>
  );
}
