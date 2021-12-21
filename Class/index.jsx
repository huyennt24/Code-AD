import React, { useCallback, useEffect, useState } from "react";

import Class from "../../../apis/class";

import ClassItem from "./components/ClassItem";
import DetailClass from "./components/DetailClass";
import Plus from "../../../components/plus";
import PlusItem from "../../../components/plus/components/PlusItem";
import CreateClass from "./components/CreateClass";
import UpdateClass from "./components/UpdateClass";

const ClassPage = () => {
    const [classData, setClassData] = useState({
        isLoading: true,
        classes: [],
    });
    const [isOpenDetail, setIsOpenDetail] = useState({
        isOpen: false,
        selectClass: {},
    });
    const [isOpenCreate, setOpenCreate] = useState({
        isOpen: false,
        isRefesh: false,
    });
    const [isOpenUpdate, setIsOpenUpdate] = useState({
        isOpen: false,
        classUpdate: {},
    });

    console.log(isOpenUpdate);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Class.getClasses();

                setClassData({ isLoading: false, classes: response });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleOpenDetail = useCallback(
        (classId) => {
            setIsOpenDetail({
                isOpen: true,
                selectClass: classData.classes.find(
                    (cls) => cls._id === classId
                ),
            });
        },
        [classData.classes]
    );

    const handleOpenCreate = useCallback(() => {
        setOpenCreate((pve) => {
            return {
                ...pve,
                isOpen: true,
            };
        });
    }, []);

    const handleOpenUpdate = useCallback(
        (classId) => {
            setIsOpenUpdate({
                isOpen: true,
                classUpdate: classData.classes.find(
                    (cls) => cls._id === classId
                ),
            });
        },
        [classData.classes]
    );

    const handleClose = useCallback(() => {
        setIsOpenDetail({ isOpen: false, selectClass: {} });
        setOpenCreate((pve) => {
            return {
                ...pve,
                isOpen: false,
            };
        });
        setIsOpenUpdate({ isOpen: false, classUpdate: {} });
    }, []);

    const handleRefeshData = useCallback(() => {
        setOpenCreate((pve) => {
            return {
                ...pve,
                isRefesh: !pve.isRefesh,
            };
        });
    }, []);

    return (
        <div className="page bg-white">
            <div className="mx-10">
                <div className="flex justify-between">
                    <div className="text-gradient">
                        <p className="text-2xl font-bold text-white pt-2 pl-14">
                            Manager User
                        </p>
                    </div>
                    <div className="mt-6">
                        <Plus>
                            <PlusItem
                                handleOpen={handleOpenCreate}
                                name="Tạo mới lớp học"
                                path="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                        </Plus>
                    </div>
                </div>

                <div className="mt-14">
                    <div className="t-head text-md text-white font-bold col-span-3 shadow-lg">
                        <ul className="flex items-center grid grid-cols-7 gap-4 p-3 rounded-t-xl bg-gray-500">
                            <li className="col-span-5">Name</li>
                            <li className="">Thêm sinh viên</li>
                            <li className="flex items-center justify-between">
                                <p>Cập nhật</p>
                                <p>Xoá</p>
                            </li>
                        </ul>
                    </div>

                    {classData.isLoading ? (
                        <div className="loader">
                            <div className="spinner"></div>
                        </div>
                    ) : classData.classes.length > 0 ? (
                        classData.classes.map((cls) => (
                            <div key={cls._id}>
                                <ClassItem
                                    items={cls}
                                    onOpenDetail={handleOpenDetail}
                                    onOpenUpdate={handleOpenUpdate}
                                />
                            </div>
                        ))
                    ) : (
                        "Có lỗi vui lòng thử lại sau"
                    )}
                </div>

                <DetailClass
                    isOpen={isOpenDetail.isOpen}
                    classData={isOpenDetail.selectClass}
                    onClose={handleClose}
                />

                <CreateClass
                    isOpen={isOpenCreate.isOpen}
                    onClose={handleClose}
                    onRefesh={handleRefeshData}
                />

                <UpdateClass
                    isOpen={isOpenUpdate.isOpen}
                    selectClass={isOpenUpdate.selectClass}
                    onClose={handleClose}
                />
            </div>
        </div>
    );
};

export default ClassPage;
