import { useState } from "react";
import RiskForm from "./RiskForm";
import Dashboard from "./Dashboard";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">GRC Risk Assessment</h1>
      <RiskForm onAdd={()=>setRefreshTrigger(rt=>rt+1)} />
      <Dashboard refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default App;