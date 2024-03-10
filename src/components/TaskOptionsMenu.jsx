

import React from 'react';
import { Edit2, FileText, Trash } from 'react-feather';

const TaskOptionsMenu = ({ position, onEdit, onAddDescription, onDelete, onClose }) => {
    const { top, left } = position;

    return (
        <div
            className="absolute top-0 left-0 bg-white border rounded-md shadow-md p-2"
            style={{ top, left }}
        >
            <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                    onEdit();
                    onClose();
                }}
            >
                <Edit2 size={16} className="mr-2" />
                Edit
            </button>
            <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                    onAddDescription();
                    onClose();
                }}
            >
                <FileText size={16} className="mr-2" />
                Add Description
            </button>
            <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                    onDelete();
                    onClose();
                }}
            >
                <Trash size={16} className="mr-2" />
                Delete
            </button>
        </div>
    );
};

export default TaskOptionsMenu;
