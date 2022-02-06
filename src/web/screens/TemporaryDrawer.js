import React from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  list: {
    width: "20rem",
    color: "white",
    background: "#5DAAE0",
    height: "100vh",
    "& .MuiList-padding": {
      padding: 0,
    },
    "& .MuiListItem-gutters": {
      padding: "0.5rem",
      marginTop: "0.5rem",
      height: "3rem",
    },
  },
  fullList: {
    // width: "auto",
  },
  small: {
    width: "2rem",
    height: "2rem",
    background: "white",
    color: "#2D4250",
    marginBottom: "1rem",
  },
  fab: {
    background: "red",
    maxWidth: "5rem",
    maxHeight: "2.2rem",
    minWidth: "5rem",
    minHeight: "2.2rem",
    padding: "1rem 0.5rem",
    margin: "0 0.5rem",
    fontSize: "0.6rem",
    borderRadius: "2rem",
  },
  divide: {
    color: "white",
    background: "white",
    height: "0.01rem",
  },
  back: {
    "& .MuiBackdrop-root": {
      background: "rgba(0, 0, 0, 0.9)",
    },
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ height: "10rem" }}>
        <ListItem>
          <MenuIcon />
          <Typography variant="h6" style={{ marginLeft: "1rem" }}>
            MENU
          </Typography>
        </ListItem>
        <Divider className={classes.divide} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
            padding: "0.8rem 0.2rem 0rem 0.7rem",
          }}
        >
          <ArrowBackIcon />
          <Typography style={{ margin: "0rem 0.5rem" }}>
            Switch Back to Enterprise UI
          </Typography>
        </div>
      </List>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "0.2rem",
            padding: "0rem 0.2rem 0rem 0.7rem",
          }}
        >
          <Avatar className={classes.small}>AI</Avatar>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography style={{ paddingTop: "0.3rem" }}>
                JohnSmith
              </Typography>
              <Fab
                className={classes.fab}
                style={{
                  background: "#2D4250",
                  color: "#FFFFFF",
                  height: "1rem",
                }}
              >
                LOGOUT
              </Fab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#5DAAE0",
        width: "3rem",
        height: "100vh",
      }}
    >
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                paddingLeft: "0.6rem",
                justifyContent: "space-between",
              }}
            >
              <MenuIcon
                style={{ color: "white", marginTop: "0.9rem" }}
                onClick={toggleDrawer(anchor, true)}
              />
              <Avatar className={classes.small}>AI</Avatar>
            </div>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className={classes.back}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
