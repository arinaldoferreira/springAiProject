import { useState } from 'react';
import './App.css';
import Conversar from './pages/chat/Conversar';
import GerarReceita from './pages/receita/GerarReceita';
import GerarImagem from './pages/imagem/GerarImagem';

function App() {

  const [activeTab, setActiveTab] = useState('ask-ai')

  const handleTabChanges = (tab) => {
    setActiveTab(tab);
  }

  return (
    <div className="App">
      <button 
        className={activeTab === 'ask-ai' ? 'active' : ''}
        onClick={() => handleTabChanges('ask-ai')}>
          Conversar com a IA
      </button>
      <button
        className={activeTab === 'recipe-generator' ? 'active' : ''}
        onClick={() => handleTabChanges('recipe-generator')}>
          Gerar Receita
      </button>
      <button
        className={activeTab === 'image-generator' ? 'active' : ''}
        onClick={() => handleTabChanges('image-generator')}>
          Gerar Imagens
      </button>

      <div>
        {activeTab === 'ask-ai' && <Conversar/>}  
        {activeTab === 'recipe-generator' && <GerarReceita/>}  
        {activeTab === 'image-generator' && <GerarImagem/>}  
      </div>

    </div>
  );
}

export default App;
