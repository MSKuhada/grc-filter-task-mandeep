import { useState } from "react";
import axios from "axios";

export default function RiskForm() {
  const [asset, setAsset] = useState("");
  const [threat, setThreat] = useState("");
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const score = likelihood * impact;

  const level =
    score <= 5 ? "Low" :
    score <= 12 ? "Medium" :
    score <= 18 ? "High" : "Critical";

  const submitRisk = async () => {
    if (!asset || !threat) {
      alert("Asset and Threat are required");
      return;
    }

    await axios.post("http://localhost:8000/assess-risk", {
      asset,
      threat,
      likelihood,
      impact
    });

    alert("Risk added successfully!");
    window.location.reload();
  };

  return (
    <div>
      <h2>Add New Risk</h2>

      <input
        placeholder="Asset (e.g. Database)"
        value={asset}
        onChange={e => setAsset(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Threat (e.g. Data Leak)"
        value={threat}
        onChange={e => setThreat(e.target.value)}
      />
      <br /><br />

      <label>Likelihood: {likelihood}</label><br />
      <input type="range" min="1" max="5"
        value={likelihood}
        onChange={e => setLikelihood(Number(e.target.value))}
      />
      <br />

      <label>Impact: {impact}</label><br />
      <input type="range" min="1" max="5"
        value={impact}
        onChange={e => setImpact(Number(e.target.value))}
      />
      <br /><br />

      <b>Preview:</b> Score = {score} | Level = {level}
      <br /><br />

      <button onClick={submitRisk}>Submit Risk</button>
    </div>
  );
}
