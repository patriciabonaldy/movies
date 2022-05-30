import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ToolBarApp from "./components/global/ToolBarApp";
import Drawer from "@material-ui/core/Drawer";
import Container from '@material-ui/core/Container'
import AppMenu from "./components/global/menu/AppMenu";
import AppRoutes from "./components/global/routes";

import {
  BrowserRouter as Router
} from "react-router-dom";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink); 

  const styleLink2 = document.createElement("link");
  styleLink2.rel = "stylesheet";
  styleLink2.href =
    "https://fonts.googleapis.com/icon?family=Material+Icons";  
document.head.appendChild(styleLink2);

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      width: drawerWidth,
      top: `65px`,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 20,
      backgroundColor: theme.palette.background.default,
      paddingTop: "100px"
    },
    toolbar: theme.mixins.toolbar
  })
);

const App = () => {
  const classes = useStyles();
  return (
    <Router>   
    <div className={classes.root}>
      <CssBaseline />
      <ToolBarApp />   
      <Drawer className={classes.drawer} variant="permanent" anchor="left">
        <div className={classes.toolbar} />
        <AppMenu />
      </Drawer>
      <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <AppRoutes/>
          </Container>
        </main>
     
    </div>
    </Router>
   
  );
};

export default App;