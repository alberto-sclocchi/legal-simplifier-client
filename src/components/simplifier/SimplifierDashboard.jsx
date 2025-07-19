import { useContext, useEffect, useRef, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import html2pdf  from 'html2pdf.js';
import uploadIcon from '../../images/upload-icon.png'; 
import SimplifiedTextContainer from './TextContainer';
import { SimplifierModel } from './model/SimplifierModel.model';
import BlockScreen from '../core/BlockScreen';

export default function SimplifierDashboard({file}) {
  const hasTypedSimplified = useRef(false);
  

  const { getSimplifiedText, simplifiedText, fileOriginalName, setSimplifiedText} = useContext(SimplifierContext);

  const handleUpload =  (event) => {
    event.preventDefault();
    setSimplifiedText("");
    
    hasTypedSimplified.current = false;

    getSimplifiedText(file);
    console.log("File Uploaded: ", file);
  }

  const handleDowload = (event) => {
    event.preventDefault();
    // downloadFile();

    html2pdf(document.getElementById("simplified-text"), {
      margin: 20,    
      filename: `${fileOriginalName}_Simplified_Text.pdf`,
    })
  }

  return (
    <div className='simplifier-dashboard'>
        <SimplifiedTextContainer props={{model: SimplifierModel.simplifier, hasTyped: hasTypedSimplified}}/>
        <div className="simplifier-dashboard-buttons">
            <button className="file-upload-div dashboard-btn" type="submit" onClick={handleUpload}>Simplify</button>
            <button style={!!file && !!simplifiedText ? {cursor: "pointer"} : {cursor: "not-allowed"}} className="file-upload-div dashboard-btn" type="submit" onClick={!!file && !!simplifiedText ? handleDowload : () => console.log("Button Disabled")}> Download File</button>
        </div>
    </div>
  )
}
