import { useState } from 'react';
import AtLeastOneSuccessCalculator from './components/AtLeastOneSuccessCalculator';
import Nav from './components/Nav';
import TrialsNeededCalculator from './components/TrialsNeededCalculator';

function App() {
  const [activeTab, setActiveTab] = useState<string>('atLeastOne');

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 pb-24">
        {activeTab === 'atLeastOne' && <AtLeastOneSuccessCalculator />}
        {activeTab === 'trialsNeeded' && <TrialsNeededCalculator />}
      </div>
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
