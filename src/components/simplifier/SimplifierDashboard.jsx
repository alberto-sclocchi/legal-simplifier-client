import React, { useContext, useEffect, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import Spinner from '../core/Spinner';
import Markdown from 'react-markdown';
import html2pdf  from 'html2pdf.js';
import uploadIcon from '../../images/upload-icon.png'; 

export default function SimplifierDashboard() {

  const { getSimplifiedText, simplifiedText, downloadFile, loading, setSimplifiedText, fileOriginalName} = useContext(SimplifierContext);
  const [ file, setFile ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (!file) setSimplifiedText("");
    console.log("File changed: ", file);
  }, [file])


  const handleUploadedFileDownload = () => {
    const url = URL.createObjectURL(new Blob ([file]));
    console.log("File URL: ", url);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);

    console.log("File Selected: ", fileUploaded);
  }

  const handleUpload =  (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");

      setTimeout(() => {
        setError(null);
      }, 3000);
      
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);

    getSimplifiedText(formData);
    console.log("File Uploaded: ", file);
  }

  const handleDowload = (event) => {
    event.preventDefault();
    // downloadFile();

    html2pdf(document.getElementById("simplified-text"), {
      margin: 15,    
      filename: `${fileOriginalName}_Simplified_Text.pdf`,
    })
  }

  return (
    <div className="simplifier-dashboard">
        <h1 className='title'>AI Legal Simplifier</h1>
        <form>
            {!!error ?
            <span>{error}</span>
            : !!file 
            ? <span style={{color: "blue", cursor:"pointer"}} onClick={handleUploadedFileDownload}>({file.name})</span> 
            : <span></span>
            }
            <label className="file-upload-div" style={!!file ? {backgroundColor: "lightgreen"} : {backgroundColor: "whitesmoke"}}>
                <img src={uploadIcon} alt="upload-icon"/>
                <h3>Upload PDF</h3>
                <input style={{display:"none"}} type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange}/>
            </label>
        </form>
        <div className={`simplified-text-container ${!!loading && "simplified-text-container-loading"}`}>{!!loading ? <Spinner /> : <div id="simplified-text"> {!!simplifiedText ? <Markdown>{simplifiedText}</Markdown> :  "Upload a PDF file and click Simplify to get an easy-to-read summary."}</div>}</div>
        <div className="simplifier-dashboard-buttons">
            <button className="file-upload-div dashboard-btn" type="submit" onClick={handleUpload}>Simplify</button>
            <button style={!!file && !!simplifiedText ? {cursor: "pointer"} : {cursor: "not-allowed"}} className="file-upload-div dashboard-btn" type="submit" onClick={!!file && !!simplifiedText ? handleDowload : () => console.log("Button Disabled")}> Download File</button>
        </div>
    </div>
  )
}
