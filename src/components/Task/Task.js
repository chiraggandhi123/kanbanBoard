import './Task.css'
import Modal from '../Modal/Modal'
import { useState, useContext } from 'react'
import { BoardContext } from '../Container/Container'
function Task(props) {
    const [FillData, setFillData] = useState({cardData:{cardId: "",
    boardId: "",
    Description: "",
    Date: "",
    Status: "",
    Assignee: "",
    class: ''
}});
    const BoardData = useContext(BoardContext)
    return (<>

        <div cid={props.cardData.cardId} bid={props.cardData.boardId} className={`Task ${props.cardData.class}`}>
            <div className="TaskInfo">
                <p className="Taskname">
                    {props.cardData.Description}
                </p>
                <p className="Taskname">
                    <span>Due: </span> {props.cardData.Date}
                </p>
                <p className='Assignee'>{props.cardData.Assignee}</p>
            <button className="editBtn" onClick={(e) => {
                let cid = e.target.parentNode.parentNode.getAttribute("cid")
                let bid = e.target.parentNode.parentNode.getAttribute("bid")
                let data = BoardData.boardData.find(item=>item.boardId===bid).cards.find(item=>item.cardId===cid)
                setFillData({cardData:data});

                BoardData.setShowEditModal(true)
            }} >Edit</button>
            </div>
        </div>
        {BoardData.showEditModal ? <Modal editStatus={true} FillData={FillData} /> : null}
    </>);
}

export default Task;