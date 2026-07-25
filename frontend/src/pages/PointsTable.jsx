import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PointsTableRow from "../components/PointsTableRow";
import "../styles/pointsTable.css";

function PointsTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("points");

  const teams = useMemo(
    () => [
      {
        id: 1,
        name: "Mumbai Indians",
        matchesPlayed: 14,
        wins: 10,
        losses: 4,
        ties: 0,
        noResult: 0,
        points: 20,
        nrr: 0.842,
      },
      {
        id: 2,
        name: "Chennai Super Kings",
        matchesPlayed: 14,
        wins: 8,
        losses: 6,
        ties: 0,
        noResult: 0,
        points: 16,
        nrr: 0.421,
      },
      {
        id: 3,
        name: "Royal Challengers Bengaluru",
        matchesPlayed: 14,
        wins: 7,
        losses: 7,
        ties: 0,
        noResult: 0,
        points: 14,
        nrr: 0.103,
      },
      {
        id: 4,
        name: "Gujarat Titans",
        matchesPlayed: 14,
        wins: 7,
        losses: 7,
        ties: 0,
        noResult: 0,
        points: 14,
        nrr: 0.092,
      },
      {
        id: 5,
        name: "Delhi Capitals",
        matchesPlayed: 14,
        wins: 5,
        losses: 9,
        ties: 0,
        noResult: 0,
        points: 10,
        nrr: -0.312,
      },
      {
        id: 6,
        name: "Kolkata Knight Riders",
        matchesPlayed: 14,
        wins: 6,
        losses: 8,
        ties: 0,
        noResult: 0,
        points: 12,
        nrr: -0.218,
      },
    ],
    []
  );

  const filteredAndSortedTeams = useMemo(() => {
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "nrr") {
        return b.nrr - a.nrr;
      }
      return b.points - a.points;
    });
  }, [search, sortBy, teams]);

  return (
    <div className="points-layout">
      <Sidebar />

      <div className="points-page">
        <div className="points-header">
          <div>
            <h1>📊 Points Table</h1>
            <p>Track team standings and qualification race.</p>
          </div>

          <div className="points-controls">
            <input
              type="text"
              placeholder="🔍 Search team..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="points">Sort by Points</option>
              <option value="nrr">Sort by NRR</option>
            </select>
          </div>
        </div>

        <div className="table-card">
          <div className="table-wrapper">
            <table className="points-table">
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Team</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>L</th>
                  <th>T</th>
                  <th>NR</th>
                  <th>Pts</th>
                  <th>NRR</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTeams.map((team, index) => (
                  <PointsTableRow
                    key={team.id}
                    team={team}
                    position={index + 1}
                    isQualified={index < 4}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointsTable;
