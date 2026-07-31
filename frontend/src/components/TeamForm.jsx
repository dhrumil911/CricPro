import { useState } from "react";
import { X, Users, Save, Shield, ShieldAlert, Navigation } from "lucide-react";

function TeamForm({ teams, setTeams, closeForm, editingTeam }) {
  const [name, setName] = useState(editingTeam?.name || "");
  const [captain, setCaptain] = useState(editingTeam?.captain || "");
  const [city, setCity] = useState(editingTeam?.city || "");
  const [coach, setCoach] = useState(editingTeam?.coach || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !captain || !city || !coach) {
      alert("Please fill all fields.");
      return;
    }

    const teamData = {
      name,
      captain,
      city,
      coach,
      totalPlayers: editingTeam?.totalPlayers || 15,
    };

    if (editingTeam) {
      const updatedTeams = teams.map((team) =>
        team.id === editingTeam.id ? { ...team, ...teamData } : team
      );
      setTeams(updatedTeams);
      alert("Team updated successfully!");
    } else {
      const newTeam = {
        id: Date.now(),
        ...teamData,
        status: "Active",
      };
      setTeams([...teams, newTeam]);
      alert("Team added successfully!");
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
          <Users className="w-5 h-5 text-accent dark:text-highlight" />
          <h2 className="font-display font-bold text-base text-slate-855 dark:text-slate-150">
            {editingTeam ? "Edit Team Franchise" : "Register New Franchise"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left max-h-[75vh] overflow-y-auto pr-1">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Franchise Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="e.g. Mumbai Indians"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Squad Captain</label>
              <input
                type="text"
                placeholder="Captain Name"
                value={captain}
                onChange={(e) => setCaptain(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Head Coach</label>
              <input
                type="text"
                placeholder="Coach Name"
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Representing City</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Navigation className="w-4 h-4 text-slate-400 dark:text-slate-555" />
              </span>
              <input
                type="text"
                placeholder="e.g. Mumbai, Maharashtra"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-850">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {editingTeam ? "Update" : "Save"}
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

export default TeamForm;