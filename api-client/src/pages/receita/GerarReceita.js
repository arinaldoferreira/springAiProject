import React from "react";
import ReactMarkdown from "react-markdown";
import { useState } from 'react';
import api from "../../services/api";

function GerarReceita() {

    const [ingredientes, setIngredientes] = useState('');
    const [cozinha, setCozinha] = useState('');
    const [restricoes, setRestricoes] = useState('');

    const [receitaResult, setReceitaResult] = useState('');

    const generateRecipe = async () => {

        try {
            const response = await api.get(`recipe-creator`, {
                params: { ingredientes, cozinha , restricoes }
            })
            const data = await response.data;
            console.log(data);
            setReceitaResult(data);
        } catch (error) {
            console.log("Error generating response: ", error);
        }
    }

    return (
        <div>
            <h2>Gerar Receita</h2>
            <input
                type="text"
                value={ingredientes}
                onChange={(e) => setIngredientes(e.target.value)}
                placeholder="Ingredientes"
            />

            <input
                type="text"
                value={cozinha}
                onChange={(e) => setCozinha(e.target.value)}
                placeholder="Tipo de cozinha: Mexicana, Japonesa..."
            />

            <input
                type="text"
                value={restricoes}
                onChange={(e) => setRestricoes(e.target.value)}
                placeholder="Alguma restrição? Glúten, fritura, lactose..."
            />

            <button onClick={generateRecipe}>Gerar Receita</button>

            <div className="output">
                <ReactMarkdown>{receitaResult}</ReactMarkdown>
            </div>
        </div>
    );
}
export default GerarReceita;