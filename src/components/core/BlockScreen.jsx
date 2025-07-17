import { useContext, useState } from 'react'
import SimplifierContext from '../simplifier/context/SimplifierContext.context';
import viewIcon from '../../images/view-icon.png'
import noViewIcon from '../../images/no-view-icon.png'

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
            {!!errorLock ? <span style={{textDecoration:"underline"}} className='error-message'>{errorLock && errorLock}</span> : <span></span>}
            <div>
                <input type={isView ? "text" : "password"} name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Insert Password'/>
                <button type="button" onClick={() => setIsView(!isView)}><img src={isView ? noViewIcon : viewIcon} className={!!isView ? "view-img" : "no-view-img"} alt="view-icon" /></button>
            </div>
            <button type="submit" className='dashboard-btn file-upload-div block-screen-button' onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}
