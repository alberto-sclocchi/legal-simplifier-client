import { createContext, useState } from "react";
import SimplifierService from "../service/SimplifierService";


const SimplifierContext = createContext({});
const service =  new SimplifierService();


export const SimplifierProvider = ({children}) => {
    const [ fileName, setFileName ] = useState(null);
    const [ fileOriginalName, setFileOriginalName ] = useState(null);
    const [ simplifiedText, setSimplifiedText ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const getSimplifiedText = async (file) => {
        setLoading(true);

        try {
            const response = await service.getSimplifiedText(file);
            setSimplifiedText(response.text);
            setFileName(response.filename);
            setFileOriginalName(response.fileOriginalName);
        } catch (err) {
            console.error("Error fetching simplified text:", err);
        } finally {
            setLoading(false);
        }
    }

    const downloadFile = async () => {
        try {
            await service.dowloadFile(fileName, fileOriginalName);
        } catch (err) {
            console.error("Error downloading file:", err);
        }
    }

    return (
    <SimplifierContext.Provider value={{simplifiedText, loading, downloadFile, getSimplifiedText, setSimplifiedText}}>
      {children}
    </SimplifierContext.Provider>
    )
}


export default SimplifierContext;