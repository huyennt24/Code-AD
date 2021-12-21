import React, { memo } from "react";

import ToolTipUpdate from "../../../../components/tooltip/Update";
import ToolTipDelete from "../../../../components/tooltip/Delete";

const CategoryItem = ({
  name,
  idMajor,
  onOpenInfo,
  onFindMajor,
  onOpenUpdate,
  onOpenDelete,
}) => {
  console.log("re-render");
  return (
    <div className="t-body text-sm text-gray-700 font-semibold col-span-3 mt-5">
      <div className="p-2.5 rounded-lg shadow-md mb-3 hover:bg-gray-100">
        <ul className="grid grid-cols-7 gap-4 transform translate-y-1">
          <li
            className="col-span-5 w-full cursor-pointer"
            onClick={() => {
              onOpenInfo();
              onFindMajor(idMajor);
            }}
          >
            {name}
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-5 text-blue-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </li>
          <li className="flex items-center justify-between">
            <ToolTipUpdate title="Cập nhật" placement="top-end">
              <svg
                onClick={() => {
                  onOpenUpdate();
                  onFindMajor(idMajor);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-6 text-blue-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </ToolTipUpdate>
            <ToolTipDelete title="Xoá" placement="top-end">
              <svg
                onClick={() => {
                  onOpenDelete();
                  onFindMajor(idMajor);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </ToolTipDelete>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(CategoryItem);
