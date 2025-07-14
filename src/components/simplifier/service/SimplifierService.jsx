import axios from "axios";



export default class SimplifierService { 

    constructor(){
        let service = axios.create({
            baseURL: "http://localhost:5005/simplifier",
        })

        this.service = service;
    }

    getSimplifiedText (file){
        return this.service.post("/", file, {headers: { 'Content-Type': 'multipart/form-data'}}).then((response) => {
            console.log("Response from SimplifierService:", response.data);
            return response.data;
        }).catch((error) => {
            console.error("Error in SimplifierService:", error);
        });
    }

    dowloadFile(fileName) { 
        return this.service.get(`/download/${fileName}`, {responseType: 'blob'})
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', fileName + ".pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error downloading file:", error);
            }
        ); 
    }                                   
}