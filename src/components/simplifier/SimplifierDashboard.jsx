import React, { useContext, useEffect, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import Spinner from '../core/Spinner';
import Markdown from 'react-markdown';
import html2pdf  from 'html2pdf.js';

export default function SimplifierDashboard() {

  const { getSimplifiedText, simplifiedText, downloadFile, loading, setSimplifiedText} = useContext(SimplifierContext);
  const [ file, setFile ] = useState(null);

  useEffect(() => {
    if (!file) setSimplifiedText("");
  }, [file])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("pdfFile", file);
    console.log("File Selected: ", file);

    setFile(formData);
  }

  const handleUpload =  (event) => {
    event.preventDefault();

    if (!file) {
      alert("No file selected");
      return;
    }

    getSimplifiedText(file);
  }

  const handleDowload = (event) => {
    event.preventDefault();
    // downloadFile();

    html2pdf(document.getElementById("simplified-text"), {
      margin: 20,    
      filename: "Simplified_Text.pdf",
    })
  }

  return (
    <div className="simplifier-dashboard">
        <h1>AI Legal Simplifier</h1>
        <form>
            <input type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange}/>
            <button type="submit" onClick={handleUpload}>Simplify</button>
            {(!!file && !!simplifiedText) && <button type="submit" onClick={handleDowload}> Dowload File</button>}
        </form>
        {!!loading ? <Spinner /> : <div id="simplified-text"> {!!simplifiedText ? <Markdown>{simplifiedText}</Markdown> : "No text to display"}</div>}
    </div>
  )
}
