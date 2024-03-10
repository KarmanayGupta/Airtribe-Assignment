

import React, { useContext, useEffect, useState } from 'react';
import { MoreHorizontal, UserPlus, Edit2 } from 'react-feather';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CardAdd from './CardAdd';
import AddList from './AddList';
import TaskDetails from './TaskDetails';
import Utils from '../utils/Utils';
import { BoardContext } from '../context/BoardContext';
import TaskOptionsMenu from './TaskOptionsMenu';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('trelloData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setAllBoard(parsedData);
        }
    }, [setAllBoard]);

    useEffect(() => {
        localStorage.setItem('trelloData', JSON.stringify(allboard));
    }, [allboard]);

    function onDragEnd(res) {
        if (!res.destination) {
            console.log('No Destination');
            return;
        }
        const newList = [...bdata.list];
        const s_id = parseInt(res.source.droppableId);
        const d_id = parseInt(res.destination.droppableId);
        const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
        newList[d_id - 1].items.splice(res.destination.index, 0, removed);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    }

    const cardData = (e, ind) => {
        let newList = [...bdata.list];
        newList[ind].items.push({ id: Utils.makeid(5), title: e });

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const listData = (e) => {
        let newList = [...bdata.list];
        newList.push({ id: newList.length + 1 + '', title: e, items: [] });

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const handleEditTask = (editedTask) => {
        const updatedList = bdata.list.map((list) => {
            return {
                ...list,
                items: list.items.map((item) => {
                    if (item.id === editedTask.id) {
                        return editedTask;
                    }
                    return item;
                }),
            };
        });

        let updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list = updatedList;
        setAllBoard(updatedBoard);

        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId) => {
        const updatedList = bdata.list.map((list) => {
            return {
                ...list,
                items: list.items.filter((item) => item.id !== taskId),
            };
        });

        let updatedBoard = { ...allboard };
        updatedBoard.boards[updatedBoard.active].list = updatedList;
        setAllBoard(updatedBoard);

        setSelectedTask(null);
    };

    return (
        <Router>
            <div className='flex flex-col w-full' style={{ backgroundColor: `${bdata.bgcolor}` }}>
                <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
                    <h2 className='text-lg'>{bdata.name}</h2>
                    <div className='flex items-center justify-center'>
                        <button className='bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center'>
                            <UserPlus size={16} className='mr-2'></UserPlus> Share
                        </button>
                        <button className='hover:bg-gray-500 px-2 py-1 h-8 rounded'>
                            <MoreHorizontal size={16}></MoreHorizontal>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col w-full flex-grow relative'>
                    <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Routes>
                                <Route path="/task/:taskId" element={<TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} onEdit={handleEditTask} onDelete={handleDeleteTask} />} />
                                <Route path="/" element={
                                    <>
                                        {bdata.list && bdata.list.map((x, ind) => (
                                            <div key={ind} className='mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0'>
                                                <div className='list-body'>
                                                    <div className='flex justify-between p-1'>
                                                        <div onClick={() => setSelectedTask(x)}>
                                                            <span>
                                                                {x.title} ({x.items.length} {x.items.length === 1 ? 'card' : 'cards'})
                                                            </span>
                                                        </div>
                                                        <button className='hover:bg-gray-500 p-1 rounded-sm'>
                                                            <MoreHorizontal size={16}></MoreHorizontal>
                                                        </button>
                                                    </div>
                                                    <Droppable droppableId={x.id}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                className='py-1'
                                                                ref={provided.innerRef}
                                                                style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                                                                {...provided.droppableProps}
                                                            >
                                                                {x.items && x.items.map((item, index) => (
                                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <div className='item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500'>
                                                                                    <span>{item.title}</span>
                                                                                    <span className='flex justify-start items-start'>
                                                                                        <div
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                setSelectedTask(item);
                                                                                            }}
                                                                                        >
                                                                                            {/* <button className='hover:bg-gray-600 p-1 rounded-sm'>
                                                                                                <Edit2 size={16}></Edit2>
                                                                                            </button> */}
                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                                {/* {selectedTask && selectedTask.id === item.id && (
                                                                                    <TaskOptionsMenu

                                                                                        position={optionsMenuPosition}
                                                                                        onEdit={() => handleEditTask(item)}
                                                                                        onAddDescription={() => handleAddDescription(item.id)}
                                                                                        onDelete={() => handleDeleteTask(item.id)}
                                                                                    />
                                                                                )} */}
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                    <CardAdd getcard={(e) => cardData(e, ind)} cardCount={x.items.length}></CardAdd>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                } />
                            </Routes>
                        </DragDropContext>
                        <AddList getlist={(e) => listData(e)}></AddList>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default Main;
