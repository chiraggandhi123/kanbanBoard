import {Members as mem} from '../../config'
import user from '../../assests/user.png'
import {useState} from 'react'
import './Members.css'

function Members() {
    const [m ,sm] = useState(false)
    return ( <div className='member-outer'>
            {mem.map(item=>(
                <div className="member" onMouseOver={()=>{
                    sm(true)
                }}
                onMouseLeave={()=>{
                    sm(false)
                }}  
                >
                    <img src={user} />
                    {m?<p>{item}</p>:null}
                </div>
            ))}
    </div> );
}

export default Members;