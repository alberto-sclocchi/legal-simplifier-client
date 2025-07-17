import React, { useContext, useState } from 'react'
import SimplifierContext from '../simplifier/context/SimplifierContext.context';

export default function BlockScreen() {

  const [ password, setPassword ] = useState("");
  const [ isView, setIsView ] = useState(false);


  const {unlockSimplifier, errorLock} = useContext(SimplifierContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    unlockSimplifier(password);
    console.log("Unlocking Simplifier with password:", password);
    setPassword("");
  }

  return (
    <div  id="block-screen">
        <h1 className="title">AI Legal Simplifier</h1>
        <form>
            <span style={{textDecoration:"underline"}}>{errorLock && errorLock}</span>
            <input type={isView ? "text" : "password"} name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Insert Password'/>
            <button type="submit" className='dashboard-btn file-upload-div block-screen-button' onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}
