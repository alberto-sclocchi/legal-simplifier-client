import { createContext, useState } from "react";
import SimplifierService from "../service/SimplifierService";
import { InputType } from "../model/InputType.model";


const SimplifierContext = createContext({});
const service =  new SimplifierService();
const PASSWORD_SIMPLIFIER = "legal2005";



export const SimplifierProvider = ({children}) => {
    const [ fileName, setFileName ] = useState(null);
    const [ fileOriginalName, setFileOriginalName ] = useState(null);
    const [ simplifiedText, setSimplifiedText ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ isLocked, setIsLocked ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ answer, setAnswer ] = useState("");
    const [ messages, setMessages ] = useState([]);

    const getSimplifiedText = async (file) => {
        if(!file){
            setErrorMessage("File not uploaded. Please try again.");

            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);

            return;
        }

        const formData = new FormData();
        formData.append("pdfFile", file);
        
        setLoading(true);

        try {
            const response = await service.getSimplifiedText(formData);
            setSimplifiedText(response.text);
            setFileName(response.filename);
            setFileOriginalName(response.fileOriginalName);
        } catch (err) {
            console.log("Error fetching simplified text:", err);
        } finally {
            setLoading(false);
        }
    }

    // const downloadFile = async () => {
    //     try {
    //         await service.dowloadFile(fileName, fileOriginalName);
    //     } catch (err) {
    //         console.log("Error downloading file:", err);
    //     }
    // }

    const unlockSimplifier = (password) => {
        if(!password || password !== PASSWORD_SIMPLIFIER) {
            console.log("Incorrect password");
            setErrorMessage("Incorrect password. Please try again.");

            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);

            return;
        }

        setIsLocked(false);
        setErrorMessage(null); 
    }


    const getAnswer = async (question, file, fileAudio, inputType) => {
        if(!file){
            setErrorMessage("File not uploaded. Please try again.");

            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);

            return;
        }

        if(inputType === InputType.text && !question){
            setErrorMessage("Ask a question and try again.");

            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);

            return;
        }

        if(inputType === InputType.audio && !fileAudio){
            setErrorMessage("Record a question and try again.");

            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);

            return;
        }

        console.log({question, file, fileAudio, inputType})

        const formData = new FormData();

        if(inputType === InputType.text) {
            formData.append("pdfFile", file);
            formData.append("question", question);
        } else {
            formData.append("audioFile", fileAudio);
            formData.append("pdfFile", file);
        }
        
        setLoading(true);

        try {
            const response = await service.getAnswer(formData, inputType);
            setAnswer(response.answer);
        } catch (err) {
            console.log("Error fetching simplified text:", err);
        } finally {
            setLoading(false);
        }
    }

    const getAssistantAnswer = async (question) => {
        setMessages((prevState) => [...prevState, {type:"user", text: question}]);

        try{
            setLoading(true);
            const assistantAnswer = await service.getAssistantResponse(question);
            setMessages((prevState) => [...prevState, {type:"bot", text: assistantAnswer.answer}])
        } catch(err){
            console.log("Error: ", err)
        } finally{
            setLoading(false);
        }
    }

    return (
    <SimplifierContext.Provider value={{simplifiedText, loading, getSimplifiedText, setSimplifiedText, fileOriginalName, unlockSimplifier, isLocked, errorMessage, answer, getAnswer, setAnswer, getAssistantAnswer, messages}}>
      {children}
    </SimplifierContext.Provider>
    )
}


export default SimplifierContext;