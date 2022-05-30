import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AppMenuItem from "./AppMenuItem";

const appMenuItems = [
    {
        name: "Actors",
        Icono: "cube",
        link:"/actor"
    },
    {
        name: "Movies",
        Icono: "cube",
        isRoot: true,
        items: [
            {
                name: "Add Movie",
                Icono: "th",
                link:"/movie"
            },
            {
                name: "Show Movies",
                Icono: "th",
                link:"/movies"
            }
        ]
    },

];

const AppMenu: React.FC = () => {
    const classes = useStyles();
    const [state] = React.useState({
        menu : appMenuItems});

    return (
        <List component="nav" className={classes.appMenu}>
            {state.menu.map((item, index) => (
                <AppMenuItem {...item} key={index} />
            ))}
        </List>
    );
};

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
    createStyles({
        appMenu: {
            width: "90%"
        },
        menuItem: {
            width: drawerWidth
        }
    })
);

export default AppMenu;