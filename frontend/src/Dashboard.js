import { useEffect, useState } from "react";
import axios from "axios";
import Heatmap from "./Heatmap";

export default function Dashboard() {
  const [risks, setRisks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadRisks();
  }, []);

  const loadRisks = async () => {
    const res = await axios.get("http://localhost:8000/risks");
    setRisks(res.data);
  };

  const filteredRisks =
    filter === "All" ? risks : risks.filter(r => r.level === filter);

  const highCritical = risks.filter(
    r => r.level === "High" || r.level === "Critical"
  ).length;

  const avgScore =
    risks.length === 0
      ? 0
      : risks.reduce((a, b) => a + b.score, 0) / risks.length;

  const exportCSV = () => {
    const header = "ID,Asset,Threat,Likelihood,Impact,Score,Level\n";
    const rows = risks.map(r =>
      `${r.id},${r.asset},${r.threat},${r.likelihood},${r.impact},${r.score},${r.level}`
    ).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "risks.csv";
    link.click();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <p>
        <b>Total:</b> {risks.length} |
        <b> High/Critical:</b> {highCritical} |
        <b> Avg Score:</b> {avgScore.toFixed(1)}
      </p>

      <label>Filter by Level: </label>
      <select onChange={e => setFilter(e.target.value)}>
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>

      <button onClick={exportCSV} style={{ marginLeft: "10px" }}>
        Export CSV
      </button>

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Asset</th><th>Threat</th>
            <th>L</th><th>I</th><th>Score</th><th>Level</th><th>Hint</th>
          </tr>
        </thead>
        <tbody>
          {filteredRisks.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.asset}</td>
              <td>{r.threat}</td>
              <td>{r.likelihood}</td>
              <td>{r.impact}</td>
              <td>{r.score}</td>
              <td>{r.level}</td>
              <td>{r.hint}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heatmap risks={risks} />
    </div>
  );
}
