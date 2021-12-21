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
import User from "../../../../apis/auth";
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

function CreateClass({ isOpen, onClose, onRefesh }) {
    const { dispatchAlert } = useStore();
    const classes = useStyles();
    const [teachers, setTeachers] = useState({
        isLoading: true,
        teacherData: [],
    });
    const [classData, setClassData] = useState({
        name: "",
        classCode: "",
        courseId: "",
        teacherId: "",
    });
    console.log(teachers);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setTeachers((pre) => {
                    return {
                        ...pre,
                        isLoading: true,
                    };
                });
                const response = await User.findUser(
                    "617d04d70682a0a38c0421c6"
                );

                if (response) {
                    setTeachers({
                        isLoading: false,
                        teacherData: response,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleChangeInput = (e) => {
        setClassData({ ...classData, [e.target.name]: e.target.value });
    };

    const handleCreateClass = async () => {
        try {
            const response = await Class.postClass(classData);
            // if (response) {
            // onClose();
            // onRefesh();
            console.log(response);
            dispatchAlert(
                actionsAlert.alertActions.display({
                    variant: "success",
                    text: "Tạo lớp học thành công",
                })
            );
            // }
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
                                Tạo mới lớp học
                            </p>
                        </div>

                        <div className="mt-14">
                            {teachers.isLoading ? (
                                <div className="loader">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <div className="">
                                    <p className="text-xl font-bold text-center">
                                        Thông tin lớp
                                    </p>
                                    <Input
                                        placeholder="Tên lớp học"
                                        name="name"
                                        value={classData?.name}
                                        isIcon="bookIcon"
                                        handleChange={handleChangeInput}
                                    />
                                    <Input
                                        placeholder="Mã lớp hoc"
                                        name="classCode"
                                        value={classData?.classCode}
                                        isIcon="bookIcon"
                                        handleChange={handleChangeInput}
                                    />
                                    <select
                                        className="w-1/2 py-2 px-5 border border-gray-400 flex mx-auto rounded-xl text-gray-500 focus:outline-none"
                                        name="teacherId"
                                        onChange={handleChangeInput}
                                    >
                                        <option
                                            defaultValue={""}
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Giáo viên
                                        </option>
                                        {teachers?.teacherData.length > 0
                                            ? teachers.teacherData.map(
                                                  (teacher) => (
                                                      <option
                                                          value={teacher._id}
                                                          key={teacher._id}
                                                      >
                                                          {teacher.fullName}
                                                      </option>
                                                  )
                                              )
                                            : ""}
                                    </select>

                                    <div className="mx-auto w-72 mt-6">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleCreateClass}
                                        >
                                            Tạo mới
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default memo(CreateClass);
