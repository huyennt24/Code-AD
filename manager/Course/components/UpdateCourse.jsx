import React, { memo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";

import Input from "../../../../components/input";
import Course from "../../../../apis/course";
import { useStore, actionsCourse, actionsAlert } from "../../../../context";

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

function DetailCategory({ isOpen, onClose }) {
  const classes = useStyles();
  const {
    majorState: { majors },
    courseState: { courseFind },
    dispatchCourse,
    dispatchAlert,
  } = useStore();
  const [preview, setPreview] = useState(null);
  const [courseData, setCourseData] = useState(courseFind);

  useEffect(() => {
    return () => {
      console.log("remove memory");
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview, isOpen]);
  useEffect(() => setCourseData(courseFind), [courseFind]);
  console.log(courseData);
  const handleChangeInput = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await Course.updateCourse(courseFind?._id, courseData);
      if (response) {
        onClose();
        dispatchCourse(
          actionsCourse.courseActions.update_course(response.course)
        );
        dispatchAlert(
          actionsAlert.alertActions.display({
            variant: "success",
            text: "Cập nhật môn học thành công",
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

            <div className="grid grid-cols-2 mt-14">
              <div className="">
                <p className="text-xl font-bold text-center">
                  Thông tin khoá học
                </p>
                <Input
                  css="w-2/3"
                  placeholder="Tên khoá học"
                  name="name"
                  value={courseData?.name}
                  isIcon="bookIcon"
                  handleChange={handleChangeInput}
                />
                <Input
                  css="w-2/3"
                  placeholder="Miêu tả"
                  name="description"
                  value={courseData?.description}
                  isIcon="bookIcon"
                  handleChange={handleChangeInput}
                />
                <Input
                  css="w-2/3"
                  placeholder="Trình độ"
                  name="level"
                  value={courseData?.level}
                  isIcon="bookIcon"
                  handleChange={handleChangeInput}
                />
                <select
                  className="w-2/3 py-2 px-5 border border-gray-400 flex mx-auto rounded-xl text-gray-500 focus:outline-none"
                  name="majorsId"
                  onChange={handleChangeInput}
                >
                  <option
                    defaultValue={courseData?.majorsId?._id}
                    selected="selected"
                    hidden="hidden"
                  >
                    {courseData?.majorsId?.name}
                  </option>
                  {majors.map((major) => (
                    <option value={major._id} key={major._id}>
                      {major.name}
                    </option>
                  ))}
                </select>
                <div className="w-2/3 mx-auto">
                  <input
                    className="hidden"
                    type="file"
                    id="icon-button-file"
                    encType="multipart/form-data"
                    onChange={(e) => {
                      setCourseData({
                        ...courseData,
                        image: e.target.files[0],
                      });
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <label
                    htmlFor="icon-button-file"
                    className="flex items-center"
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                    <p className="pt-1 text-sm font-bold cursor-pointer">
                      {preview || courseData?.image ? "Thay đổi" : "Chọn ảnh"}
                    </p>
                  </label>
                </div>

                <div className="mx-auto w-72 mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateCourse}
                  >
                    Cập nhật
                  </Button>
                </div>
              </div>

              <div className="mr-6 mx-20">
                <img
                  src={
                    preview
                      ? preview
                      : `https://ap-sever.herokuapp.com/images/${courseData?.image}`
                  }
                  alt=""
                  className="w-full h-full rounded-xl"
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
