import React, { useContext, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';

export default function SimplifierDashboard() {

  const { getSimplifiedText, simplifiedText, downloadFile } = useContext(SimplifierContext);
  const [ file, setFile ] = useState(null);

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
    downloadFile();
  }

  return (
    <div className="simplifier-dashboard">
        <h1>AI Legal Simplifier</h1>
        <form>
            <input type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange}/>
            <button type="submit" onClick={handleUpload}>Simplify</button>
            {!!file && <button type="submit" onClick={handleDowload}> Dowload File</button>}
        </form>
        <div>
            {!!simplifiedText ? simplifiedText : "No text to display"}
        </div>
    </div>
  )
}
