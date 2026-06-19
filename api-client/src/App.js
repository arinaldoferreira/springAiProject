import { useState } from 'react';
import './App.css';

function App() {

  const [activeTab, setActiveTab] = useState('ask-ai')

  const handleTabChanges = (tab) => {
    alert(tab);
    setActiveTab(tab);
  }

  return (
    <div className="App">
      <button onClick={() => handleTabChanges('ask-ai')}>Falar com a IA</button>
      <button onClick={() => handleTabChanges('recipe-generator')}>Gerar Receita</button>
      <button onClick={() => handleTabChanges('image-generator')}>Gerar Imagens</button>

      <div>
        {activeTab === 'ask-ai' && <h2>Falar com a IA</h2>}  
        {activeTab === 'recipe-generator' && <h2>Gerar Receita</h2>}  
        {activeTab === 'image-generator' && <h2>Gerar Imagens</h2>}  
      </div>

    </div>
  );
}

export default App;
