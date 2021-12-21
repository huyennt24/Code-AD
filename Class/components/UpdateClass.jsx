import React, { memo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

import Input from "../../../../components/input";
import Class from "../../../../apis/class";
import { useStore, actionsAlert } from "../../../../context";

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

function UpdateClass({ isOpen, selectClass, onClose }) {
    const classes = useStyles();
    const { dispatchAlert } = useStore();
    const [classData, setClassData] = useState(selectClass);
    useEffect(() => setClassData(selectClass), [selectClass]);
    const handleChangeInput = (e) => {
        setClassData({ ...classData, [e.target.name]: e.target.value });
    };

    const handleUpdateClass = async () => {
        try {
            const response = await Class.updateClass(classData._id, classData);
            if (response) {
                onClose();
                dispatchAlert(
                    actionsAlert.alertActions.display({
                        variant: "success",
                        text: "Cập nhật lớp học thành công",
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                <div className="bg-gray-100 h-full">
                    <div className="m-10 bg-white h-4/5 p-10 rounded-2xl">
                        <div className="text-gradient w-max">
                            <p className="font-bold text-2xl text-white pt-2 pl-14">
                                Tạo mới môn học
                            </p>
                        </div>

                        <div className="mt-14">
                            <p className="text-xl font-bold text-center">
                                Thông tin lớp học
                            </p>
                            <Input
                                css="w-2/3"
                                placeholder="Tên lớp học"
                                name="name"
                                value={classData?.name}
                                isIcon="bookIcon"
                                handleChange={handleChangeInput}
                            />
                            <Input
                                css="w-2/3"
                                placeholder="Mã lớp học"
                                name="classCode"
                                value={classData?.classCode}
                                isIcon="bookIcon"
                                handleChange={handleChangeInput}
                            />
                            <select
                                className="w-2/3 py-2 px-5 border border-gray-400 flex mx-auto rounded-xl text-gray-500 focus:outline-none"
                                name="majorsId"
                                onChange={handleChangeInput}
                            >
                                <option
                                    // defaultValue={classData?.majorsId?._id}
                                    hidden="hidden"
                                >
                                    {/* {classData?.majorsId?.name} */}
                                    'loo'
                                </option>
                                {/* {majors.map((major) => (
                                        <option
                                            value={major._id}
                                            key={major._id}
                                        >
                                            {major.name}
                                        </option>
                                    ))} */}
                            </select>

                            <div className="mx-auto w-72 mt-6">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdateClass}
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default memo(UpdateClass);
