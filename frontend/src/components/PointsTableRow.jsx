function PointsTableRow({ team, position, isQualified }) {
  return (
    <tr className={`table-row ${isQualified ? "qualified" : ""}`}>
      <td>{position}</td>
      <td>
        <div className="team-cell">
          <span className="team-name">{team.name}</span>
          {isQualified && <span className="qualification-badge">Q</span>}
        </div>
      </td>
      <td>{team.matchesPlayed}</td>
      <td>{team.wins}</td>
      <td>{team.losses}</td>
      <td>{team.ties}</td>
      <td>{team.noResult}</td>
      <td>{team.points}</td>
      <td>{team.nrr.toFixed(2)}</td>
    </tr>
  );
}

export default PointsTableRow;
