import { useContext, useEffect, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import html2pdf  from 'html2pdf.js';
import uploadIcon from '../../images/upload-icon.png'; 
import SimplifiedTextContainer from './SimplifiedTextContainer';
import BlockScreen from '../core/BlockScreen';

export default function SimplifierDashboard({file}) {

  const { getSimplifiedText, simplifiedText, fileOriginalName} = useContext(SimplifierContext);

  const handleUpload =  (event) => {
    event.preventDefault();

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
        <SimplifiedTextContainer />
        <div className="simplifier-dashboard-buttons">
            <button className="file-upload-div dashboard-btn" type="submit" onClick={handleUpload}>Simplify</button>
            <button style={!!file && !!simplifiedText ? {cursor: "pointer"} : {cursor: "not-allowed"}} className="file-upload-div dashboard-btn" type="submit" onClick={!!file && !!simplifiedText ? handleDowload : () => console.log("Button Disabled")}> Download File</button>
        </div>
    </div>
  )
}
