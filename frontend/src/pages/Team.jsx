import Sidebar from "../components/Sidebar";
import TeamCard from "../components/TeamCard";
import TeamForm from "../components/TeamForm";
import "../styles/team.css";

function Team() {
  return (
    <div className="team-layout">

      <Sidebar />

      <div className="team-page">

        <div className="team-header">

          <div>
            <h1>👥 Team Management</h1>
            <p>Manage all cricket teams from one place.</p>
          </div>

          <button className="add-btn">
            + Add Team
          </button>

        </div>

        <input
          type="text"
          placeholder="🔍 Search Team..."
          className="search-box"
        />

        <div className="team-list">

          <TeamCard />
          <TeamCard />
          <TeamCard />

        </div>

        <TeamForm />

      </div>

    </div>
  );
}

export default Team;