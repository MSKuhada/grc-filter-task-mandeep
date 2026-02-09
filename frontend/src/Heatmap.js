export default function Heatmap({ risks }) {

  const getCount = (l, i) =>
    risks.filter(r => r.likelihood === l && r.impact === i).length;

  const getColor = (score) => {
    if (score <= 5) return "#00FF00";
    if (score <= 12) return "#FFFF00";
    if (score <= 18) return "#FFA500";
    return "#FF0000";
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Risk Heatmap (Likelihood × Impact)</h3>

      <table border="1">
        <tbody>
          {[5,4,3,2,1].map(l =>
            <tr key={l}>
              {[1,2,3,4,5].map(i => {
                const score = l * i;
                return (
                  <td key={i}
                      style={{
                        width: "60px",
                        height: "60px",
                        textAlign: "center",
                        backgroundColor: getColor(score)
                      }}
                      title={`${getCount(l,i)} risks`}>
                    {getCount(l,i)}
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>

      <p>Rows = Likelihood (top high → low) | Columns = Impact</p>
    </div>
  );
}
