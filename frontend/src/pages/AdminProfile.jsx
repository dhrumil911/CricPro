import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Mail, Phone, MapPin, Check, Save } from "lucide-react";

function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Dhrumil Dholakiya",
    email: "admin@cricpro.com",
    phone: "+91 98765 43210",
    location: "Gujarat, India",
    role: "Tournament Director",
    org: "Gujarat Cricket Association"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 pitch-texture opacity-30 pointer-events-none" />
        
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
          
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 font-display">
              🛡️ Admin Profile
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Manage your credentials, organization roles, and contact info.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Summary Panel */}
            <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800 text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent to-highlight" />
              
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-highlight p-1 mx-auto mb-4 relative shadow-lg">
                <div className="w-full h-full bg-white dark:bg-[#020617] rounded-full flex items-center justify-center font-display font-bold text-3xl text-accent dark:text-highlight">
                  DD
                </div>
              </div>

              <h2 className="font-display font-bold text-lg text-slate-850 dark:text-slate-200">{profile.name}</h2>
              <p className="text-xs text-accent dark:text-highlight font-bold mt-1 uppercase tracking-wide">{profile.role}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase mt-0.5">{profile.org}</p>

              <div className="border-t border-slate-200 dark:border-slate-850 mt-6 pt-6 text-left space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Form Details Panel */}
            <div className="lg:col-span-8 glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-4">
                <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 uppercase tracking-wider">Profile Details</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-accent dark:text-highlight hover:border-accent/40 hover:bg-slate-200 dark:hover:bg-slate-850 transition-all cursor-pointer shadow-sm"
                  >
                    Edit Profile
                  </button>
                ) : null}
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-accent dark:text-highlight text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Profile updated successfully.
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-250 text-xs focus:outline-none focus:border-accent disabled:opacity-60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-250 text-xs focus:outline-none focus:border-accent disabled:opacity-60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-250 text-xs focus:outline-none focus:border-accent disabled:opacity-60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Office Location</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-250 text-xs focus:outline-none focus:border-accent disabled:opacity-60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Designation</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-250 text-xs focus:outline-none focus:border-accent disabled:opacity-60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Organization</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.org}
                      onChange={(e) => setProfile({ ...profile, org: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-250 text-xs focus:outline-none focus:border-accent disabled:opacity-60 transition-colors"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-850">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminProfile;
