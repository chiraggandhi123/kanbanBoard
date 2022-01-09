import React from 'react';
import Members from '../Members/Members'
import './Header.css'
function Header() {
    return ( 
        <>
            <div className='header'>
                <h1>Task Board</h1>
                 <Members />
            </div>
        </>
     );
}

export default Header;