import React, { useContext, useEffect, useRef, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import Spinner from '../core/Spinner';
import Markdown from 'react-markdown';
import { SimplifierModel } from './model/SimplifierModel.model';

export default function SimplifiedTextContainer({model}) {
  const {simplifiedText, loading } = useContext(SimplifierContext);
  const [ displayText, setDisplayText ] = useState("");
  const ref = useRef()

  useEffect(() => {
    if(!!simplifiedText && !loading){
        let index = 0;
        const interval = setInterval(() => {
            if(index < simplifiedText.length){
                setDisplayText((prevState) => prevState + simplifiedText.charAt(index));
                index++;
            } else{
                clearInterval(interval);
            }
        }, 10);

        return () => {
            clearInterval(interval);
            setDisplayText("");
        }
    }
  }, [simplifiedText, loading]);

  useEffect(() => {
    if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight;
      ref.current.scrollTo({behavior:"smooth"})
    }
  }, [displayText])

  return (
    <>
      {(!!model && model === SimplifierModel.simplifier) ?
        <div ref={ref} className={`simplified-text-container ${!!loading && "simplified-text-container-loading"}`}>
          {!!loading 
            ? <Spinner /> 
            : <div id="simplified-text"> 
                {!!simplifiedText ? <Markdown>{displayText}</Markdown> :  "Upload a PDF file and click Simplify to get an easy-to-read summary. Only upload legal documents."}
              </div>
          }
        </div>
        :
        <div ref={ref} className={`simplified-text-container ${!!loading && "simplified-text-container-loading"}`}>
          {!!loading 
            ? <Spinner /> 
            : <div id="simplified-text"> 
                {!!simplifiedText ? <Markdown>{displayText}</Markdown> :  "Ask any questions"}
              </div>
          }
        </div>
    
      }

    </>
  )
}

