import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import logo from "./img/dive_logo.svg";

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: -5,
    height: "45px",
    width: "100"
  },
  appBar: {
    width: `100%`,
    marginLeft: 0,
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "primary"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function ToolBarApp() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        style={{ background: "#232f3e" }}
        className={classes.appBar}
      >
        <Toolbar>
          <img src={logo} className={classes.bigAvatar} alt="" />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="open drawer"
          ></IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Dive Tech
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="primary">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <span> v 0.0.1</span>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
