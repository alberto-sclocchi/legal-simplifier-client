import React, { useContext, useEffect, useRef, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import Spinner from '../core/Spinner';
import Markdown from 'react-markdown';
import { SimplifierModel } from './model/SimplifierModel.model';

export default function SimplifiedTextContainer({props}) {
  const {simplifiedText, loading, answer, setAnswer, setSimplifiedText} = useContext(SimplifierContext);
  const [ displaySimplifiedText, setDisplaySimplifiedText ] = useState("");
  const [ displayAnswer, setDisplayAnswer ] = useState("");

  const ref = useRef()

  // console.log("model", props)

  const { model } = props;

  const hasTyped = SimplifierModel.simplifier === model ? props.hasTypedSimplified : props.hasTypedAnswer

  useEffect(() => {
    if(!!simplifiedText && !loading && !hasTyped.current &&  model === SimplifierModel.simplifier){
        setDisplaySimplifiedText("");
        let index = 0;
        const interval = setInterval(() => {
            if(index < simplifiedText.length){
                setDisplaySimplifiedText((prevState) => prevState + simplifiedText.charAt(index));
                index++;
            } else{
                clearInterval(interval);
            }
        }, 10);

        hasTyped.current = true;

        return () => {
            clearInterval(interval);
        }
    } else if (!!simplifiedText && !loading && hasTyped.current && model === SimplifierModel.simplifier) {
      setDisplaySimplifiedText(simplifiedText); 
    } 
  }, [simplifiedText, loading]);


   useEffect(() => {
    if(!!answer && !loading && !hasTyped.current && model === SimplifierModel.documentHelper){
        setDisplayAnswer("");
        let index = 0;
        const interval = setInterval(() => {
            if(index < answer.length){
                setDisplayAnswer((prevState) => prevState + answer.charAt(index));
                index++;
            } else{
                clearInterval(interval);
            }
        }, 10);

        hasTyped.current = true;

        return () => {
            clearInterval(interval);
        }
    } else if (!!answer && !loading && hasTyped.current && model === SimplifierModel.documentHelper) {
      setDisplayAnswer(answer); 
    } 
  }, [answer, loading]);

  useEffect(() => {
    if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight;
      ref.current.scrollTo({behavior:"smooth"})
    }
  }, [displaySimplifiedText, displayAnswer])

  return (
    <>
      {(!!model && model === SimplifierModel.simplifier) ?
        <div ref={ref} className={`simplified-text-container ${!!loading && "simplified-text-container-loading"}`}>
          {!!loading 
            ? <Spinner /> 
            : <div id="simplified-text"> 
                {!!simplifiedText ? <Markdown>{displaySimplifiedText}</Markdown> :  "Upload a PDF file and click Simplify to get an easy-to-read summary. Only upload legal documents."}
              </div>
          }
        </div>
        :
        <div ref={ref} className={`simplified-text-container ${!!loading && "simplified-text-container-loading"}`}>
          {!!loading 
            ? <Spinner /> 
            : <div id="simplified-text"> 
                {!!answer ? <Markdown>{displayAnswer}</Markdown> :  "Upload a PDF file and ask your question."}
              </div>
          }
        </div>
    
      }

    </>
  )
}

