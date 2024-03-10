import React, { useState } from 'react';
import { X } from 'react-feather';

const CardEditModal = ({ card, onSave, onClose }) => {
    const [editedCard, setEditedCard] = useState(card);

    const handleInputChange = (e) => {
        setEditedCard(e.target.value);
    };

    const handleSave = () => {
        onSave(editedCard);
        onClose();
    };

    const handleClose = () => {
        setEditedCard(card); // Reset to the original value if canceled
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="bg-white p-4 rounded-md">
                <textarea
                    value={editedCard}
                    onChange={handleInputChange}
                    className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
                    placeholder="Enter Updated Card Title..."
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleSave}
                        className="p-1 rounded bg-sky-600 text-white mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleClose}
                        className="p-1 rounded hover:bg-gray-600"
                    >
                        <X size={16}></X>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardEditModal;
