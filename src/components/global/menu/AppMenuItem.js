import React from "react";
import { FC } from "react";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";

import AppMenuItemComponent from "./AppMenuItemComponent";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

import { Icon } from "semantic-ui-react";


export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
  isRoot: PropTypes.bool,
  link: PropTypes.string
};

const AppMenuItem: FC<AppMenuItemPropTypes> = props => {
  const { name, Icono, items, link, isRoot = []} = props;
  const classes = useStyles();
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }


  const MenuItemRoot = (

      <AppMenuItemComponent className={classes.menuItem} link={link?link:null} onClick={handleClick}>
        {!!Icon && (
            <ListItemIcon>
              <Icon name={Icono} />
            </ListItemIcon>
        )}
        <ListItemText primary={name} inset={!Icon} />
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </AppMenuItemComponent>
  )

  const MenuItemChildren = isExpandable ? (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding >
          {items.map((item, index) => (

              <AppMenuItem {...item} key={index} />

          ))}
        </List>
      </Collapse>
  ) : null;

  return (
      <>
        {MenuItemRoot}
        {!!isRoot && isRoot === true && <Divider />}
        {MenuItemChildren}
      </>
  );
};

AppMenuItem.propTypes = AppMenuItemPropTypes;

const useStyles = makeStyles(theme =>
    createStyles({
      menuItem: {}
    })
);

export default AppMenuItem;