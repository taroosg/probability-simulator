import { useState } from 'react';
import './App.css';
import AtLeastOneSuccessCalculator from './components/AtLeastOneSuccessCalculator';
import Nav from './components/Nav';
import TrialsNeededCalculator from './components/TrialsNeededCalculator';

function App() {
  const [activeTab, setActiveTab] = useState<string>('atLeastOne');

  return (
    <div className="app-container">
      {activeTab === 'atLeastOne' && <AtLeastOneSuccessCalculator />}
      {activeTab === 'trialsNeeded' && <TrialsNeededCalculator />}
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
