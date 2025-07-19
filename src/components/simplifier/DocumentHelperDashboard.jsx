import React, { useContext, useRef, useState } from 'react'
import SimplifiedTextContainer from './TextContainer'
import { FaCircleStop, FaMicrophone } from 'react-icons/fa6'
import { SimplifierModel } from './model/SimplifierModel.model'
import { InputType } from './model/InputType.model'
import SimplifierContext from './context/SimplifierContext.context'

export default function DocumentHelperDashboard({file}) {

  const { getAnswer } = useContext(SimplifierContext)

  const hasTypedAnswer = useRef();

  const [ display, setDisplay ] = useState({
    type: InputType.text,
    index: 0
  })
  const [ question, setQuestion ] = useState("");
  const [ isRecording, setIsRecording ] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();

    hasTypedAnswer.current = false;
    getAnswer(question, file);
  }


  return (
    <div className='document-helper-dashboard'>
        <SimplifiedTextContainer props={{model: SimplifierModel.documentHelper, hasTypedAnswer}}/>
        <div className="below-container-div">
            <div className="input-display-buttons">
                <button className={`display-button ${display.index === 0 && "display-button-active"}`} onClick={() => setDisplay({type: InputType.text, index: 0})}>Text</button> 
                <button className={`display-button ${display.index === 1 && "display-button-active"}`} onClick={() => setDisplay({type: InputType.audio, index: 1})}>Audio</button>
            </div>
            <form>
                {(!!display && display.type === InputType.text )
                ? 
                <input type='text' onChange={(e) => setQuestion(e.target.value)} placeholder='What would you like to know?'/> 
                : 
                <>
                    <div className='timer'>hello</div>
                    {!isRecording ? <button className='mic-icon'><FaMicrophone /></button> : <FaCircleStop className='mic-icon'/>} 
                </>
                }

                <button className='document-helper-btn' onClick={handleClick}>submit</button>
            </form>
        </div>
    </div>
  )
}
