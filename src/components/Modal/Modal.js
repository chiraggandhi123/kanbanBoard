import './Modal.css'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Members, Status } from '../../config'
import { BoardContext } from '../Container/Container'
import { useContext, useEffect } from 'react'
function Modal(props) {
    // console.log("{RP{S", props)
    const BoardData = useContext(BoardContext);
    let status = BoardData.boardData.find(item => item.boardId === BoardData.activeBoard);

    const [cardData, setCardData] = useState({
        cardId: "",
        boardId: "",
        Description: "",
        Date: "",
        Status: status.boardName,
        Assignee: Members[0],
        class: ''
    });

    useEffect(() => {
        if (props.editStatus) {
            // console.log(props.FillData)
            setCardData(props.FillData.cardData)
        }
    },[props])

    function updateCardState(name, data) {
        setCardData({ ...cardData, [name]: data })
    }
    return (
        <>

            <div id="myModal" className="modal">
                <form className="modal-content" onSubmit={(event) => {
                    event.preventDefault();
                    if (!props.editStatus) {
                        cardData.cardId = uuid();
                        cardData.boardId = BoardData.activeBoard;
                        BoardData.updateModalState(false);
                    }
                    BoardData.setShowEditModal(false)
                    props.editStatus ? BoardData.updateCardData(cardData) : BoardData.createCardData(cardData)
                }}>
                    <div>
                        <input type="text" required name="Description" value={cardData.Description} className='textbox' onChange={(e) => {
                            const { name, value } = e.target;
                            updateCardState(name, value);
                        }} placeholder='add a description' />
                    </div>
                    <div>
                        <input type="date" required name="Date" value={cardData.Date} onChange={(e) => {
                            const { name, value } = e.target;
                            updateCardState(name, value);
                        }} />
                        {props.editStatus?
                        <select name="Status" value={cardData.Status} onChange={(e) => {
                            const { name, value } = e.target;
                            updateCardState(name, value);
                        }}>
                            {Status.map(item => <option>{item}</option>)}
                        </select>:null}
                    </div>
                    <div>
                        <p>
                            <input type="submit" value="save" />
                            <button onClick={() => BoardData.updateModalState(false)}>cancel</button>
                        </p>
                        <select name="Assignee" value={cardData.Assignee} onChange={(e) => {
                            const { name, value } = e.target;
                            updateCardState(name, value);
                        }}>
                            {Members.map(item => <option>{item}</option>)}
                        </select>
                    </div>

                </form>

            </div>
        </>
    );
}

export default Modal;