import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
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

export default function DetailCategory({ isOpen, onClose }) {
  const classes = useStyles();
  const { dispatchMajor, dispatchAlert } = useStore();
  const [preview, setPreview] = useState(null);
  const [majorData, setMajorData] = useState({
    name: "",
    description: "",
    image: null,
  });
  console.log(preview);
  useEffect(() => {
    return () => {
      console.log("remove memory");
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview, isOpen]);

  const handleChangeInput = (e) => {
    setMajorData({ ...majorData, [e.target.name]: e.target.value });
  };

  const handleCreateMajor = async () => {
    let formData = new FormData();
    formData.append("name", majorData.name);
    formData.append("description", majorData.description);
    formData.append("image", majorData.image);

    try {
      const response = await Major.postMajors(formData);

      if (response) {
        dispatchMajor(actionsMajor.majorActions.post_major(response.data));
        dispatchAlert(
          actionsAlert.alertActions.display({
            variant: "success",
            text: "Tạo chuyên nghành thành công",
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
          <div className="page m-10 bg-white h-4/5 p-10 rounded-2xl">
            <div className="w-max text-gradient">
              <p className="font-bold text-2xl text-white pt-2 pl-14 pr-10">
                Tạo mới chuyên nghành
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2">
              <div>
                <p className="text-xl font-bold text-center">
                  Thông tin chuyên nghành
                </p>
                <Input
                  css="w-2/3"
                  placeholder="Tên chuyên nghành"
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
                      {preview ? "Thay đổi" : "Chọn ảnh"}
                    </p>
                  </label>
                </div>

                <div className="mx-auto w-72 mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateMajor}
                  >
                    Tạo mới
                  </Button>
                </div>
              </div>

              <div className="mr-6 mx-20">
                <img
                  src={preview}
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
