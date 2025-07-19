import React, { useContext, useRef, useState } from 'react'
import SimplifiedTextContainer from './TextContainer'
import { FaCircleStop, FaMicrophone } from 'react-icons/fa6'
import { SimplifierModel } from './model/SimplifierModel.model'
import { InputType } from './model/InputType.model'
import SimplifierContext from './context/SimplifierContext.context'

export default function DocumentHelperDashboard({file}) {

  let timer;

  const { getAnswer } = useContext(SimplifierContext)

  const hasTypedAnswer = useRef();

  const [ display, setDisplay ] = useState({
    type: InputType.text,
    index: 0
  })
  const [ question, setQuestion ] = useState("");
  const [ isRecording, setIsRecording ] = useState(false);
  const [ seconds, setSeconds ] = useState(0);
  const [recordedURL, setRecordedURL] = useState('');
  const [ isWaiting, setIsWaiting ] = useState(false);


  const mediaStream = useRef(null)
  const mediaRecorder = useRef(null)
  const chunks = useRef([])


  const handleClick = (event) => {
    event.preventDefault();

    hasTypedAnswer.current = false;
    getAnswer(question, file);
  }


  const handleStart = async (event) => {
    event.preventDefault()
    setIsRecording(true);
    setIsWaiting(true);

    try{
      setSeconds(0)
      const stream = await navigator.mediaDevices.getUserMedia({audio: true})
      mediaStream.current = stream
      mediaRecorder.current = new MediaRecorder(stream)
      mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0){
            console.log("chunks", event.data);
            chunks.current.push(event.data)
          }
      }
      
      setTimeout(() => {
        timer = setInterval(() => {
          setSeconds(prev => prev + 1);
        }, 1000)

        setIsWaiting(false);
      }, 2200);

      mediaRecorder.current.onstop = () => {
          const recordedBlob = new Blob(chunks.current,{type: 'audio/webm'})
          const url = URL.createObjectURL(recordedBlob)
          setRecordedURL(url)

          chunks.current = []
          clearInterval(timer);
      }

      mediaRecorder.current.start()
    } catch(error){
      console.log(error);
    }
  }
  
  const handleStop = (event) => {
    event.preventDefault()
    setIsRecording(false);
    setIsWaiting(false);

    if(mediaRecorder.current){
        mediaRecorder.current.stop()
        mediaStream.current.getTracks().forEach(track => track.stop())
    }
  }

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds/3600);
    const minutes = Math.floor((totalSeconds % 3600)/60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
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
                    <div className='timer'>{!!isWaiting ? "Preparing..." : formatTime(seconds)}</div>
                    {!isRecording ? <button className='mic-icon' onClick={handleStart}><FaMicrophone /></button>  : <button className='mic-icon' onClick={handleStop}><FaCircleStop/></button>} 
                </>
                }

                <button className='document-helper-btn' onClick={handleClick}>submit</button>
            </form>
            {/* {!!recordedURL && <audio controls src={recordedURL} />} */}
        </div>
    </div>
  )
}
