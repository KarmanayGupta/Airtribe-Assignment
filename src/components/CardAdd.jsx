

import React, { useState } from 'react';
import { X, Plus, Edit } from 'react-feather';
import CardEditModal from './CardEditModal'; // Assuming you have a CardEditModal component

const CardAdd = (props) => {
    const [card, setCard] = useState('');
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const saveCard = () => {
        if (!card) {
            return;
        }
        props.getcard(card);
        setCard('');
        setShow(!show);
    };

    const closeBtn = () => {
        setCard('');
        setShow(!show);
    };

    const openEditModal = () => {
        setEditMode(true);
    };

    const closeEditModal = () => {
        setEditMode(false);
    };

    return (
        <div className="relative">
            <div className="flex flex-col">
                {show && (
                    <div>
                        <textarea
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                            className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
                            name=""
                            id=""
                            cols="30"
                            rows="2"
                            placeholder="Enter Card Title..."
                        ></textarea>
                        <div className="flex p-1">
                            <button
                                onClick={() => saveCard()}
                                className="p-1 rounded bg-sky-600 text-white mr-2"
                            >
                                Add Card
                            </button>
                            <button
                                onClick={() => closeBtn()}
                                className="p-1 rounded hover:bg-gray-600"
                            >
                                <X size={16}></X>
                            </button>
                            <button
                                onClick={() => openEditModal()}
                                className="p-1 rounded hover:bg-gray-600 ml-2"
                            >
                                <Edit size={16}></Edit>
                            </button>
                        </div>
                    </div>
                )}
                {!show && (
                    <button
                        onClick={() => setShow(!show)}
                        className="flex p-0 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-8 relative"
                    >
                        <Plus size={16}></Plus> New
                        {props.cardCount > 0 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center ml-1">
                                {props.cardCount}
                            </div>
                        )}
                    </button>
                )}
            </div>
            {editMode && (
                <CardEditModal
                    card={card}
                    onSave={saveCard}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default CardAdd;


