import React, { useContext, useEffect, useRef, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import Markdown from 'react-markdown';

export default function Assistant() {
  const [ question, setQuestion ] = useState("");
  const { getAssistantAnswer, messages, loading } = useContext(SimplifierContext);

  const ref = useRef()

  useEffect(() => {
    if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight;
      ref.current.scrollTo({behavior:"smooth"})
    }
  }, [messages])

  const handleChange = (event) => {
    setQuestion(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getAssistantAnswer(question);

    setTimeout(( ) => {
        setQuestion("");
    }, 1000)
  }

  return (
    <div className="assistant-div">
        <div ref={ref} className="simplified-text-container assistant-text-container">
            {
                messages.map((message, i) => {
                    return <div className={`message message-${message.type}`} key={i}><div style={{fontStyle:"italic"}}>{message.type === 'user' ? "You" : "Assistant"}</div><Markdown>{message.text}</Markdown></div>
                })
            }
            {!!loading && <div className="message message-bot" style={{width:"50%"}}><div style={{fontStyle:"italic"}}>Assistant</div><p>Thinking...</p></div>
}
        </div>  
        <form onSubmit={handleSubmit}>
            <input value={question} type="text" placeholder="Ask..." onChange={handleChange} name="question"/>
            <button className='document-helper-btn'  type="submit">Send</button>
        </form>
    </div>
  )
}
