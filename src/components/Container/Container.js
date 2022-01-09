import React from 'react';
import './Container.css'
import Boardarea from '../Boardarea/Boardarea'
import Header from "../Header/Header";
import Modal from '../Modal/Modal'
import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { Status } from '../../config'
import { useEffect } from 'react';

export const BoardContext = React.createContext(null);
export const Container = function () {

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [boardData, setBoardData] = useState([{
        boardId: uuid(),
        boardName: Status[0],
        cards: []
    },
    {
        boardId: uuid(),
        boardName: Status[1],
        cards: []
    }, {
        boardId: uuid(),
        boardName: Status[2],
        cards: []
    }
    ])
    function updateCardClass(){
        const temp = boardData;
        let today = new Date().getTime();
        //planned
        temp[0].cards.map((item)=>{
            let DueDate = new Date(item.Date).getTime();
            // console.log(DueDate, today, DueDate<today)
            if(DueDate < today ){
                item.class="red"
            }
            else{
                item.class=" "
            }
            return item;
        })

        //started
        temp[1].cards.map((item)=>{
            let DueDate = new Date(item.Date).getTime()
            if(DueDate < today ){
                item.class="red"
            }
            else
            {
                item.class=" "
            }
            return item;
        })
        //Done
        temp[2].cards.map((item)=>{
            let DueDate = new Date(item.Date).getTime()
            if(DueDate > today ){
                item.class="green"
            }
            else
            {
                item.class=" "
            }
            return item;
        })
    }
    useEffect(() => {
        return updateCardClass()
    })
    const [activeBoard, setActiveBoard] = useState("")
    function updateCardData(cardData) {
        //check if card exists
        let cid = cardData.cardId;
        let bid = cardData.boardId;
        let boardIdx = -1
        let cardIdx = -1;

        boardIdx = boardData.findIndex(item => {
            return item.boardId === bid
        })
        if (boardIdx >= 0) {
            cardIdx = boardData.find(item => item.boardId === bid).cards.findIndex(item => item.cardId === cid);
            if (cardIdx >= 0)//card found 
            {
                let currStatus = boardData[boardIdx].boardName;
                let updatedStatus = cardData.Status;
                // console.log(currStatus, updatedStatus)
                if (currStatus === updatedStatus) {
                    let tempData = boardData;
                    tempData[boardIdx].cards.splice(cardIdx, 1)
                    tempData[boardIdx].cards.push(cardData);
                    //update  cardData
                }
                else {
                    //remove previous data;
                    let tempData = boardData;
                    tempData[boardIdx].cards.splice(cardIdx, 1)
                    //update new data
                    boardIdx = boardData.findIndex(item => item.boardName === cardData.Status);
                    //update Bid
                    cardData.boardId = boardData[boardIdx].boardId;
                    tempData[boardIdx].cards.push(cardData);
                }
            }

            //check if status is changed
        }
        updateCardClass();
    }
    // check if Status is updated or not
    // update card


    function updateModalState(val) {
        setShowModal(val)
    }
    function updateActiveBoard(bid) {
        setActiveBoard(bid);
    }
    function createCardData(data) {
        let tempBoard = boardData;
        let idxData = tempBoard.findIndex(item => item.boardId === activeBoard)
        tempBoard[idxData].cards.push(data);
        setBoardData(tempBoard)
        updateCardClass();
    }
    return (
        <BoardContext.Provider value={{
            boardData,
            showModal,
            activeBoard,
            showEditModal,
            updateCardData,
            updateModalState,
            updateActiveBoard,
            createCardData,
            setShowEditModal
        }}>
            <div className="container">
                <Header />
                <Boardarea
                    boardData={boardData}
                />
                {showModal ? <Modal createCardData={createCardData} updateModalState={updateModalState} /> : null}

            </div>
        </BoardContext.Provider>

    )
}

