import { createContext, useState } from "react";
import SimplifierService from "../service/SimplifierService";


const SimplifierContext = createContext({});
const service =  new SimplifierService();
const PASSWORD_SIMPLIFIER = "legal2005";



export const SimplifierProvider = ({children}) => {
    const [ fileName, setFileName ] = useState(null);
    const [ fileOriginalName, setFileOriginalName ] = useState(null);
    const [ simplifiedText, setSimplifiedText ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ errorLock, setErrorLock ] = useState(null);
    const [ isLocked, setIsLocked ] = useState(true);

    const getSimplifiedText = async (file) => {
        setLoading(true);

        try {
            const response = await service.getSimplifiedText(file);
            setSimplifiedText(response.text);
            setFileName(response.filename);
            setFileOriginalName(response.fileOriginalName);
        } catch (err) {
            console.log("Error fetching simplified text:", err);
        } finally {
            setLoading(false);
        }
    }

    const downloadFile = async () => {
        try {
            await service.dowloadFile(fileName, fileOriginalName);
        } catch (err) {
            console.log("Error downloading file:", err);
        }
    }

    const unlockSimplifier = (password) => {
        if(!password || password !== PASSWORD_SIMPLIFIER) {
            console.log("Incorrect password");
            setErrorLock("Incorrect password. Please try again.");

            setTimeout(() => {
                setErrorLock(null);
            }, 3000);

            return;
        }

        setIsLocked(false);
        setErrorLock(null);

        
    }

    return (
    <SimplifierContext.Provider value={{simplifiedText, loading, downloadFile, getSimplifiedText, setSimplifiedText, fileOriginalName, unlockSimplifier, isLocked, errorLock}}>
      {children}
    </SimplifierContext.Provider>
    )
}


export default SimplifierContext;