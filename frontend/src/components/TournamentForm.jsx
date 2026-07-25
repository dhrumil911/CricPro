import { useState } from "react";
import { X, Award, Save, Calendar, MapPin, Users } from "lucide-react";

function TournamentForm({
  tournaments,
  setTournaments,
  closeForm,
  editingTournament,
}) {
  const [name, setName] = useState(editingTournament?.name || "");
  const [type, setType] = useState(editingTournament?.type || "");
  const [startDate, setStartDate] = useState(editingTournament?.startDate || "");
  const [endDate, setEndDate] = useState(editingTournament?.endDate || "");
  const [venue, setVenue] = useState(editingTournament?.venue || "");
  const [teams, setTeams] = useState(editingTournament?.teams || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type || !startDate || !endDate || !venue || !teams) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm} />

      <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden z-10">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-highlight" />
        
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-accent dark:text-highlight" />
          <h2 className="font-display font-bold text-base text-slate-850 dark:text-slate-150">
            {editingTournament ? "Edit Tournament" : "Create New Tournament"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Tournament Name</label>
            <input
              type="text"
              placeholder="e.g. Champions Cup T20"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Tournament Format</label>
              <input
                type="text"
                placeholder="e.g. League or Knockout"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Total Teams</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="number"
                  placeholder="e.g. 12"
                  value={teams}
                  onChange={(e) => setTeams(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Start Date</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">End Date</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Default Venue / Stadium</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="e.g. Wankhede Stadium, Mumbai"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-850">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {editingTournament ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TournamentForm;