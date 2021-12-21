import React, { memo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { debounce } from "lodash";
import { Select, Spin } from "antd";

import Input from "../../../../components/input";
import Class from "../../../../apis/class";
import User from "../../../../apis/auth";
import { useStore, actionsAlert } from "../../../../context";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                const customOptions =
                    newOptions.user.length > 0
                        ? newOptions.user.filter((option) => {
                              return option.userCode.split("-")[0] === "FSTC";
                          })
                        : [
                              {
                                  _id: "1",
                                  fullName: "Không tìm thấy",
                                  userCode: "Not found",
                              },
                          ];
                setOptions(customOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            showSearch
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt._id} value={opt._id}>
                    {` ${opt.fullName} -`}{" "}
                    <span className="text-xs text-gray-400">
                        {opt.userCode}
                    </span>
                </Select.Option>
            ))}
        </Select>
    );
}

function fetchUserList(search) {
    return User.user_search(search);
}

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

function UpdateClass({ isOpen, selectClass, onClose, onRefesh }) {
    const classes = useStyles();
    const [value, setValue] = useState();
    const { dispatchAlert } = useStore();
    const [classData, setClassData] = useState(selectClass);
    useEffect(() => setClassData(selectClass), [selectClass]);
    const handleChangeInput = (e) => {
        setClassData({ ...classData, [e.target.name]: e.target.value });
    };
    console.log(classData);
    const handleUpdateClass = async () => {
        try {
            const response = await Class.updateClass(classData._id, classData);
            if (response) {
                onClose();
                onRefesh();
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

                            <div className="mt-4">
                                <DebounceSelect
                                    name="search-user"
                                    label="Chọn giáo viên"
                                    value={value}
                                    placeholder="Nhập tên giáo viên"
                                    fetchOptions={fetchUserList}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                        setClassData((pre) => ({
                                            ...pre,
                                            teacherId: newValue.value,
                                        }));
                                    }}
                                    style={{ width: "100%" }}
                                />
                            </div>

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
