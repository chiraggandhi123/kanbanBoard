import './Board.css'
import Task from '../Task/Task'
import {BoardContext} from '../Container/Container'
import { useState, useContext } from 'react'
function Board(props) {
    const BoardData = useContext(BoardContext);
    return (<>
        <div boardid={props.boardId} className="Board custom-scroll">
            <div className="Board_Nav">{props.boardName}</div>
            {props.cardData.map(item => <Task  key={item.cardId} cardData={item}/>)}

            <p onClick={(event) => {
                let activeBid = event.target.parentNode.getAttribute("boardid")
                BoardData.updateActiveBoard(activeBid);
                BoardData.updateModalState(true)

            }
            } className='AddTask'>Add a Task</p>


        </div>
    </>);
}

export default Board;