import React from "react";
import { useState } from 'react';
import api from "../../services/api";

function GerarImagens(){

    const [prompt, setPrompt] = useState('');
    const [quality, setQuality] = useState('low');
    const [n, setN] = useState('2');
    const [height, setHeight] = useState('1024');
    const [width, setWidth] = useState('1024');
    const [imageUrls, setImageUrls] = useState([]);

    const generateImages = async () => {

        try {
            const response = await api.get(`generate-image`, {
                params: {
                    prompt,
                    quality,
                    n,
                    height,
                    width
                 }
            })
            const data = await response.data;
            console.log(data);
            setImageUrls(data);
        } catch (error) {
            console.log("Error generating image: ", error);
        }
    }

  return (
        <div>
            <h2>Gerar Imagens</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Descreva a imagem que será gerada"
            />
            <button onClick={generateImages}>Gerar Imagens</button>
            <div className="image-grid">
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Generated ${index}`} />
                ))}
                {[...Array(4 - imageUrls.length)].map((_, index) => (
                   <div key={index + imageUrls.length} 
                        className="empty-image-slot"></div>
                ))}
            </div>
        </div>
    );
}
export default GerarImagens;