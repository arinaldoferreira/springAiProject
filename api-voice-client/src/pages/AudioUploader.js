import React, { useState } from "react";

import api from '../services/api';

const AudioUploader = () => {

    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('transcribe', formData, {
                headers: {
                   'Content-Type': 'multipart/form-data'
                }
            });
            setTranscription(response.data)
        } catch (error) {
            console.log("Error transcribing audio", error);
        }
    };

    return (
        <div className="container">
            <h2>Transcrever áudio para texto</h2>
            <div className="file-input">
                <input type="file" accept="audio/*" onChange={handleFileChange} />
            </div>
            <button className="upload-button"
                onClick={handleUpload}>
                    Fazer Upload e Transcrever
            </button>
            <div className="transcription-result">
                <h2>Resultado da Transcrição:</h2>
                <p>{transcription}</p>
            </div>
        </div>
    );
} 
export default AudioUploader;