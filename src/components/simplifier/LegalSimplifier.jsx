import { useContext, useEffect, useState } from 'react'
import SimplifierContext from './context/SimplifierContext.context';
import uploadIcon from '../../images/upload-icon.png'; 
import BlockScreen from '../core/BlockScreen';
import SimplifierDashboard from './SimplifierDashboard';
import { SimplifierModel } from './model/SimplifierModel.model';
import DocumentHelperDashboard from './DocumentHelperDashboard';
import Assistant from './Assistant';

export default function LegalSimplifier() {

  const { setSimplifiedText, setAnswer, errorMessage, isLocked} = useContext(SimplifierContext);
  const [ file, setFile ] = useState(null);
  const [ display, setDisplay ] = useState({
    type: SimplifierModel.simplifier,
    index: 0
  });

  useEffect(() => {
    if (!file) {
      setSimplifiedText("");
      setAnswer("");
    }
    console.log("File changed: ", file);
  }, [file])


  const handleUploadedFileDownload = () => {
    const url = URL.createObjectURL(new Blob ([file]));
    // console.log("File URL: ", url);
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



  return (
    <> 
        {
            isLocked &&
            <BlockScreen />
        }

        <div className="legal-simplifier">
            <h1 className='title'>AI Legal Simplifier</h1>
            <form>
                {(!!errorMessage && !isLocked) ?
                <span className="error-message" style={{color: "brown", textDecoration:"underline"}}>{errorMessage}</span>
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
            <div className='display-buttons'>
                <button className={`display-button ${display.index === 0 && "display-button-active"}`} onClick={() => setDisplay({type: SimplifierModel.simplifier, index: 0})}>Simplifier</button>
                <button className={`display-button ${display.index === 1 && "display-button-active"}`} onClick={() => setDisplay({type: SimplifierModel.documentHelper, index: 1})}>Doc Helper</button>
                <button className={`display-button ${display.index === 2 && "display-button-active"}`} onClick={() => setDisplay({type: SimplifierModel.assistant, index: 2})}>AI Assistant</button>
            </div>
            {(!!display && display.type === SimplifierModel.simplifier) 
              ? <SimplifierDashboard file={file}/> 
              : (!!display && display.type === SimplifierModel.documentHelper) 
              ? <DocumentHelperDashboard file={file}/>
              : <Assistant />
            }
        </div>
    </>
  )
}