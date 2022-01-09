import Board from '../Board/Board'
import './Boardarea.css'
function Boardarea(props) {
    // console.log("==>",props)
    return (<>
        <div className='Boardarea'>
            {props.boardData.map(item => 
            <Board key={item.boardId} 
            boardId={item.boardId}
            boardName={item.boardName} 
            // updateModalState={props.updateModalState} 
            cardData={item.cards} 
            // updateActiveBoard={props.updateActiveBoard}
            
            />)}

        </div>
    </>);
}

export default Boardarea;