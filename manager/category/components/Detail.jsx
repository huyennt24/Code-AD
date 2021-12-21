import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { useStore } from "../../../../context";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "white",
    color: "black",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DetailCategory({ isOpen, onClose }) {
  const {
    majorState: { majorFind },
  } = useStore();
  const classes = useStyles();
  console.log(majorFind);
  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Thông tin khoá học
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="bg-gray-100 h-full">
          <div className="m-10 bg-white h-4/5 p-10 rounded-2xl">
            <div className="text-gradient w-max">
              <p className="font-bold text-2xl text-white pt-2 pl-14 pr-10">
                Nghành {majorFind?.name?.toLowerCase()}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-20 mt-14">
              <List className="col-span-2">
                <ListItem button>Tên chuyên nghành: {majorFind?.name}</ListItem>
                <Divider />
                <ListItem button>Miêu tả: {majorFind?.description}</ListItem>
                <Divider />
              </List>

              <div className="h-62">
                <img
                  src={`https://ap-sever.herokuapp.com/images/${majorFind?.image}`}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default memo(DetailCategory);
