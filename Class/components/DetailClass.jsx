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

function DetailCourse({ isOpen, classData, onClose }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Logo
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
        <div className="bg-gray-100 h-full w-full mx-auto">
          <div className="bg-white h-4/5 w-1/2 p-10 my-10 mx-auto rounded-2xl">
            <div className="text-gradient w-max">
              <p className="font-bold text-2xl pt-2 pl-14 pr-10 text-white">
                Thông tin lớp học
              </p>
            </div>

            <div className="mt-14">
              <List>
                <ListItem button>Tên Lớp học: {classData?.classCode}</ListItem>
                <Divider />
                <ListItem button>
                  Giáo viên: {classData?.teacherId?.fullName}
                </ListItem>
                <Divider />
                <ListItem button>
                  Số học sinh trong lớp: {classData?.studentId?.length}
                </ListItem>
                <Divider />
              </List>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default memo(DetailCourse);
