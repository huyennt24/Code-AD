import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

import Input from "../../../../components/input";
import Major from "../../../../apis/majors";
import { useStore, actionsMajor, actionsAlert } from "../../../../context";

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

export default function UpateCategory({ isOpen, onClose }) {
  const classes = useStyles();
  const {
    majorState: { majorFind },
    dispatchMajor,
    dispatchAlert,
  } = useStore();
  const [preview, setPreview] = useState(null);
  const [majorData, setMajorData] = useState(majorFind);

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview, isOpen]);
  useEffect(() => setMajorData(majorFind), [majorFind]);

  const handleChangeInput = (e) => {
    setMajorData({ ...majorData, [e.target.name]: e.target.value });
  };

  const handleUpdateMajor = async () => {
    let formData = new FormData();
    formData.append("_id", majorData._id);
    formData.append("name", majorData.name);
    formData.append("description", majorData.description);
    formData.append("image", majorData.image);

    try {
      const response = await Major.updateMajor(majorFind?._id, formData);
      if (response) {
        dispatchMajor(actionsMajor.majorActions.update_major(response.majors));
        dispatchAlert(
          actionsAlert.alertActions.display({
            variant: "success",
            text: "Cập nhật chuyên nghành thành công",
          })
        );
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="my-10 mx-20 bg-white h-4/5 p-10 rounded-2xl">
            <div className="text-gradient w-max">
              <p className="font-bold text-2xl pt-2 pl-14 text-white">
                Cập nhật chuyên nghành
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2">
              <div>
                <p className="text-xl font-bold text-center">
                  Thông tin chuyên nghành
                </p>
                <Input
                  css="w-2/3"
                  placeholder="Tên khoá học"
                  name="name"
                  value={majorData?.name}
                  isIcon="bookIcon"
                  handleChange={handleChangeInput}
                />
                <Input
                  css="w-2/3"
                  placeholder="Miêu tả"
                  name="description"
                  value={majorData?.description}
                  isIcon="bookIcon"
                  handleChange={handleChangeInput}
                />
                <div className="w-2/3 mx-auto">
                  <input
                    className="hidden"
                    type="file"
                    id="icon-button-file"
                    encType="multipart/form-data"
                    onChange={(e) => {
                      setMajorData({
                        ...majorData,
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
                      {preview || majorData?.image ? "Thay đổi" : "Chọn ảnh"}
                    </p>
                  </label>
                </div>

                <div className="mx-auto w-72 mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateMajor}
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
                      : `https://ap-sever.herokuapp.com/images/${majorData?.image}`
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
