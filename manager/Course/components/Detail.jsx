import React from "react";
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

export default function DetailCourse({ isOpen, onClose }) {
    const classes = useStyles();
    const {
        courseState: { courseFind },
    } = useStore();
    console.log(courseFind);
    return (
        <div>
            <Dialog fullScreen open={isOpen} onClose={onClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Thông tin môn học
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
                            <p className="font-bold text-2xl pt-2 pl-14 pr-10 text-white">
                                Thông tin môn {courseFind?.name?.toLowerCase()}
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-20 mt-14">
                            <List className="col-span-2">
                                <ListItem button>
                                    Tên môn học: {courseFind?.name}
                                </ListItem>
                                <ListItem button>
                                    Thuộc chuyên nghành:{" "}
                                    {courseFind?.majorsId?.name}
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    Miêu tả: {courseFind?.description}
                                </ListItem>
                                <Divider />
                            </List>

                            <div className="h-62">
                                <img
                                    src={`https://ap-sever.herokuapp.com/images/${courseFind?.image}`}
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
