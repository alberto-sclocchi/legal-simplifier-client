import { createContext, useState } from "react";
import SimplifierService from "../service/SimplifierService";


const SimplifierContext = createContext({});
const service =  new SimplifierService();


export const SimplifierProvider = ({children}) => {
    const [ fileName, setFileName ] = useState(null);
    const [ simplifiedText, setSimplifiedText ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const getSimplifiedText = async (file) => {
        setLoading(true);

        try {
            const response = await service.getSimplifiedText(file);
            setSimplifiedText(response.text);
            setFileName(response.filename);
        } catch (err) {
            console.error("Error fetching simplified text:", err);
        } finally {
            setLoading(false);
        }
    }

    const downloadFile = async () => {
        try {
            await service.dowloadFile(fileName);
        } catch (err) {
            console.error("Error downloading file:", err);
        }
    }

    return (
    <SimplifierContext.Provider value={{simplifiedText, loading, downloadFile, getSimplifiedText}}>
      {children}
    </SimplifierContext.Provider>
    )
}


export default SimplifierContext;