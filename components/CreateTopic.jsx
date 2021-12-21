import React, { memo, useState } from "react";
import { Modal } from "antd";

import Topic from "../../../../apis/topic";
import { useStore, actionsAlert } from "../../../../context";
import Input from "../../../../components/input";

// Fetch Course

function CreateClass({ isOpen, onClose, onRefesh }) {
    const { dispatchAlert } = useStore();

    const [topicData, setTopicData] = useState({
        name: "",
        description: "",
    });

    const handleChangeInput = (e) => {
        setTopicData({ ...topicData, [e.target.name]: e.target.value });
    };
    console.log(topicData);
    const handleCreateClass = async () => {
        try {
            const response = await Topic.createTopic(topicData);
            if (response) {
                onClose();
                onRefesh();
                setTopicData({
                    name: "",
                    description: "",
                });
            }
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
            <Modal
                title="Tạo mới lớp học"
                visible={isOpen}
                onOk={handleCreateClass}
                onCancel={onClose}
                destroyOnClose={true}
            >
                <Input
                    isIcon="courseIcon"
                    css="w-full"
                    name="name"
                    placeholder="Tên topic"
                    value={topicData.name}
                    handleChange={handleChangeInput}
                />
                <Input
                    isIcon="passwordIcon"
                    css="w-full"
                    name="description"
                    placeholder="Miêu tả"
                    value={topicData.description}
                    handleChange={handleChangeInput}
                />
            </Modal>
        </div>
    );
}

export default memo(CreateClass);
