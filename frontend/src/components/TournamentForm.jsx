import { useState } from "react";

function TournamentForm({
  tournaments,
  setTournaments,
  closeForm,
  editingTournament,
}) {

  const [name, setName] = useState(
    editingTournament?.name || ""
  );

  const [type, setType] = useState(
    editingTournament?.type || ""
  );

  const [startDate, setStartDate] = useState(
    editingTournament?.startDate || ""
  );

  const [endDate, setEndDate] = useState(
    editingTournament?.endDate || ""
  );

  const [venue, setVenue] = useState(
    editingTournament?.venue || ""
  );

  const [teams, setTeams] = useState(
    editingTournament?.teams || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !type ||
      !startDate ||
      !endDate ||
      !venue ||
      !teams
    ) {
      alert("Please fill all fields.");
      return;
    }

    const tournamentData = {
      name,
      type,
      venue,
      teams: Number(teams),
      startDate,
      endDate,
      duration: `${startDate} - ${endDate}`,
    };

    if (editingTournament) {

      const updatedTournaments = tournaments.map((tournament) =>
        tournament.id === editingTournament.id
          ? {
              ...tournament,
              ...tournamentData,
            }
          : tournament
      );

      setTournaments(updatedTournaments);

      alert("Tournament updated successfully!");

    } else {

      const newTournament = {
        id: Date.now(),
        ...tournamentData,
        status: "Upcoming",
      };

      setTournaments([...tournaments, newTournament]);

      alert("Tournament added successfully!");
    }

    closeForm();
  };

  return (
    <div className="modal-overlay">

      <div className="tournament-form">

        <h2>
          {editingTournament
            ? "✏ Edit Tournament"
            : "🏆 Add Tournament"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Tournament Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tournament Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />

          <input
            type="number"
            placeholder="Number of Teams"
            value={teams}
            onChange={(e) => setTeams(e.target.value)}
          />

          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button type="submit">
              {editingTournament
                ? "Update Tournament"
                : "Save Tournament"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default TournamentForm;