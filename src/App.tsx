import { useState } from 'react';
import AtLeastOneSuccessCalculator from './components/AtLeastOneSuccessCalculator';
import TrialsNeededCalculator from './components/TrialsNeededCalculator';
import Nav from './components/Nav';

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
