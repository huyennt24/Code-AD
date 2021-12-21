import React, { useState, useEffect, useCallback } from "react";

import CourseDetail from "./components/Detail";
import CourseItem from "./components/CourseItem";
import Plus from "../../../components/plus";
import PlusItem from "../../../components/plus/components/PlusItem";
import { useStore, actionsCourse, actionsAlert } from "../../../context";
import Course from "../../../apis/course";
import Icon from "../../../components/icon";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import DeleteCourse from "../../../components/modal/ModalConfirm";
import Pagination from "../../../components/pagination";
import Alert from "../../../components/alert";

const ManagerCoursePage = () => {
    const {
        majorState: { majors },
        courseState: { courses_pagination, courseFind },
        dispatchCourse,
        dispatchAlert,
    } = useStore();
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [courseMajor, setCourseMajor] = useState([]);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isLoad, setIsLoad] = useState(true);
    const [paginations, setPagination] = useState({
        _page: 1,
        _totalRow: 1,
        _limit: 5,
    });
    const [filterCourse, setFilterCourse] = useState({
        id: null,
        _page: 1,
        _limit: 5,
    });

    console.log("course-re-render");
    useEffect(() => {
        const fetchData = async () => {
            setIsLoad(true);
            if (filterCourse.id) {
                try {
                    const response = await Course.getCoursesMajor(
                        filterCourse.id
                    );

                    if (response) {
                        setCourseMajor(response);
                        setIsLoad(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else if (
                filterCourse._limit &&
                filterCourse._page &&
                courseMajor.length < 1
            ) {
                try {
                    const response = await Course.getCoursesPagination(
                        filterCourse._limit,
                        filterCourse._page
                    );
                    console.log(response);
                    const { pagination, courses } = response;
                    setPagination(pagination);
                    setIsLoad(false);
                    dispatchCourse(
                        actionsCourse.courseActions.get_courses_pagination(
                            courses
                        )
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [dispatchCourse, filterCourse, courseMajor.length]);

    const handlePageChange = (newPage) => {
        setFilterCourse({ ...filterCourse, _page: newPage });
    };

    const handleOpenInfo = () => {
        setIsOpenInfo(true);
    };

    const handleOpenCreate = () => {
        setIsOpenCreate(true);
    };

    const handleOpenUpdate = () => {
        setIsOpenUpdate(true);
    };

    const handleOpenDelete = () => {
        setIsOpenDelete(true);
    };

    const handleClose = useCallback(() => {
        setIsOpenInfo(false);
        setIsOpenCreate(false);
        setIsOpenDelete(false);
        setIsOpenUpdate(false);
    }, []);

    const handleMajorChange = (idMajor) => {
        setFilterCourse({ id: idMajor });
    };

    const handleFindCourse = (idCourse) => {
        const courseFind = courses_pagination.find(
            (course) => course._id === idCourse
        );

        dispatchCourse(actionsCourse.courseActions.find_course(courseFind));
    };

    const handleDeleteCourse = async () => {
        try {
            const response = await Course.deleteCourse(courseFind?._id);

            if (response) {
                dispatchCourse(
                    actionsCourse.courseActions.delete_course(response.course)
                );
                dispatchAlert(
                    actionsAlert.alertActions.display({
                        variant: "success",
                        text: "Xoá môn học thành công",
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
                            Manager Course
                        </p>
                    </div>
                    <div className="mt-6">
                        <Plus>
                            <PlusItem
                                handleOpen={handleOpenCreate}
                                name="Tạo mới môn học"
                                path="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                            {majors.map((major) => (
                                <div
                                    className={`w-full my-3 font-bold ${
                                        major._id === filterCourse.id
                                            ? "active"
                                            : null
                                    }`}
                                    onClick={() => handleMajorChange(major._id)}
                                    key={major._id}
                                >
                                    <div className="flex items-center px-2 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                                        <div className="mx-3">
                                            <Icon>
                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                />
                                            </Icon>
                                        </div>

                                        <p className="">{major.name}</p>
                                    </div>
                                </div>
                            ))}
                        </Plus>
                    </div>
                </div>

                <div className="mt-14">
                    <div className="t-head text-md text-white font-bold col-span-3">
                        <ul className="flex items-center grid grid-cols-7 gap-4 p-3 rounded-t-xl shadow-lg bg-gray-500">
                            <li className="col-span-5">Tên môn học</li>
                            <li>Chi tiết</li>
                            <li className="flex items-center justify-between">
                                <p>Cập nhật</p>
                                <p>Xoá</p>
                            </li>
                        </ul>
                    </div>
                    {isLoad ? (
                        <div className="loader">
                            <div className="spinner"></div>
                        </div>
                    ) : courseMajor?.length > 0 ? (
                        isLoad ? (
                            <div className="loader">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            courseMajor?.map((course) => (
                                <div key={course._id}>
                                    <CourseItem
                                        id={course._id}
                                        name={course.name}
                                        onOpenInfo={handleOpenInfo}
                                        onOpenUpdate={handleOpenUpdate}
                                        onFindCourse={handleFindCourse}
                                        onOpenDelete={handleOpenDelete}
                                    />
                                </div>
                            ))
                        )
                    ) : (
                        courses_pagination?.map((course) => (
                            <div key={course._id}>
                                <CourseItem
                                    id={course._id}
                                    name={course.name}
                                    onOpenInfo={handleOpenInfo}
                                    onOpenUpdate={handleOpenUpdate}
                                    onFindCourse={handleFindCourse}
                                    onOpenDelete={handleOpenDelete}
                                />
                            </div>
                        ))
                    )}

                    <div>
                        <CourseDetail
                            isOpen={isOpenInfo}
                            onClose={handleClose}
                        />

                        <CreateCourse
                            isOpen={isOpenCreate}
                            onClose={handleClose}
                        />

                        <UpdateCourse
                            isOpen={isOpenUpdate}
                            onClose={handleClose}
                        />

                        <DeleteCourse
                            isOpen={isOpenDelete}
                            onClose={handleClose}
                            onDelete={handleDeleteCourse}
                        />

                        <Alert />
                    </div>
                </div>
            </div>
            {courseMajor?.length === 0 ? (
                <Pagination
                    pagination={paginations ? paginations : {}}
                    onPageChange={handlePageChange}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default ManagerCoursePage;
