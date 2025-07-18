import React, { useState } from 'react'
import SimplifiedTextContainer from './SimplifiedTextContainer'
import { FaCircleStop, FaMicrophone } from 'react-icons/fa6'
import { SimplifierModel } from './model/SimplifierModel.model'
import { InputType } from './model/InputType.model'

export default function DocumentHelperDashboard() {

  const [ display, setDisplay ] = useState({
    type: InputType.text,
    index: 0
  })

  return (
    <div className='document-helper-dashboard'>
        <SimplifiedTextContainer model={SimplifierModel.documentHelper}/>
        <div className="below-container-div">
            <div className="input-display-buttons">
                <button className={`display-button ${display.index === 0 && "display-button-active"}`} onClick={() => setDisplay({type: InputType.text, index: 0})}>Text</button> 
                <button className={`display-button ${display.index === 1 && "display-button-active"}`} onClick={() => setDisplay({type: InputType.audio, index: 1})}>Audio</button>
            </div>
            <form>
                {(!!display && display.type === InputType.text )
                ? 
                <input type='text' /> 
                : 
                <>
                    <FaCircleStop />
                    <FaMicrophone /> 
                </>
                }

                <button className='document-helper-btn'>submit</button>
            </form>
        </div>
    </div>
  )
}
