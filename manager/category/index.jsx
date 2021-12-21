import React, { useState, useCallback, useEffect } from "react";

import { useStore, actionsMajor, actionsAlert } from "../../../context";
import Plus from "../../../components/plus";
import PlusItem from "../../../components/plus/components/PlusItem";
import CategoryItem from "./components/CategoryItem";
import Detail from "./components/Detail";
import CreateCategory from "./components/CreateCategory";
import UpdateCategory from "./components/UpdateCategory";
import ModalConfim from "../../../components/modal/ModalConfirm";
import Major from "../../../apis/majors";
import Alert from "../../../components/alert";

const ManagerCategoryPage = () => {
  const {
    majorState: { isLoading, majors, majorFind },
    dispatchMajor,
    dispatchAlert,
  } = useStore();
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Major.getMajors();

        if (response) {
          dispatchMajor(actionsMajor.majorActions.get_mojors(response));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatchMajor]);

  const handleOpenInfo = useCallback(() => {
    setIsOpenInfo(true);
  }, []);

  const handleOpenCreate = useCallback(() => {
    setIsOpenCreate(true);
  }, []);

  const handleOpenDelete = useCallback(() => {
    setIsOpenDelete(true);
  }, []);

  const handleOpenUpdate = useCallback(() => {
    setIsOpenUpdate(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpenInfo(false);
    setIsOpenCreate(false);
    setIsOpenDelete(false);
    setIsOpenUpdate(false);
  }, []);

  const handleFindMajor = useCallback(
    (idMajor) => {
      const majorFind = majors.find((major) => major._id === idMajor);

      dispatchMajor(actionsMajor.majorActions.find_major(majorFind));
    },
    [majors, dispatchMajor]
  );

  const handleDeleteMajor = async () => {
    try {
      const response = await Major.deleteMajor(majorFind?._id);
      handleClose();
      if (response) {
        dispatchMajor(actionsMajor.majorActions.delete_major(response.majors));
        dispatchAlert(
          actionsAlert.alertActions.display({
            variant: "success",
            text: "Xoá chuyên nghành thành công",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page bg-white">
      <div className="mx-10">
        <div className="flex justify-between">
          <div className="text-gradient w-max">
            <p className="text-2xl font-bold text-white pt-2 pl-14">
              Manager Category
            </p>
          </div>
          <div className="mt-6">
            <Plus>
              <PlusItem
                handleOpen={handleOpenCreate}
                name="Tạo mới Chuyên nghành"
                path="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </Plus>
          </div>
        </div>

        <div className="mt-14">
          {isLoading ? (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="t-head text-md text-white font-bold col-span-3 shadow-lg">
                <ul className="flex items-center grid grid-cols-7 gap-4 p-3 rounded-t-xl bg-gray-500">
                  <li className="col-span-5">Tên chuyên nghành</li>
                  <li>Chi tiết</li>
                  <li className="flex items-center justify-between">
                    <p>Cập nhật</p>
                    <p>Xoá</p>
                  </li>
                </ul>
              </div>

              {majors.map((major) => (
                <div key={major._id}>
                  <CategoryItem
                    idMajor={major._id}
                    name={major.name}
                    onOpenInfo={handleOpenInfo}
                    onFindMajor={handleFindMajor}
                    onOpenDelete={handleOpenDelete}
                    onOpenUpdate={handleOpenUpdate}
                  />
                </div>
              ))}

              <div>
                <Detail isOpen={isOpenInfo} onClose={handleClose} />

                <CreateCategory isOpen={isOpenCreate} onClose={handleClose} />

                <ModalConfim
                  isOpen={isOpenDelete}
                  onClose={handleClose}
                  onDelete={handleDeleteMajor}
                />

                <UpdateCategory isOpen={isOpenUpdate} onClose={handleClose} />

                <Alert />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerCategoryPage;
