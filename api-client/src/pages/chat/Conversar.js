import React from "react";
import { useState } from 'react';
import api from "../../services/api";

function Conversar() {

    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const askAi = async () => {
        try {
            const response = await api.get(`ask-ai-options`, {
                params: { prompt }
            })
            const data = await response.data;
            console.log(data);
            setChatResponse(data);
        } catch (error) {
            console.log("Error generating response: ", error);
        }
    }

    return (
        <div>
            <h2>Conversar com a IA</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Digite um texto para conversar com a IA"
            />
            <button onClick={askAi}>Enviar conversa</button>

            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}
export default Conversar;