import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Sliders, Bell, Shield, Save, Check, Settings as SettingsIcon } from "lucide-react";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [showSavedToast, setShowSavedToast] = useState(false);

  const [settings, setSettings] = useState({
    systemName: "CricPro Cricket Engine",
    defaultVenue: "Wankhede Stadium",
    maxSquadSize: "16",
    autoNRR: true,
    emailNotif: true,
    pushNotif: false,
    publicAccess: true,
    cacheTimeout: "30"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const tabs = [
    { id: "general", name: "General Setup", icon: Sliders },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Privacy & Permissions", icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 pitch-texture opacity-30 pointer-events-none" />
        
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5 font-display">
              <SettingsIcon className="w-6 h-6 text-accent dark:text-highlight shrink-0 hover:rotate-45 transition-transform duration-300" />
              Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Configure system parameters, notification settings, and privacy permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Tabs List */}
            <div className="lg:col-span-3 glass-card rounded-2xl p-4 border border-slate-250 dark:border-slate-800 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-accent/15 text-accent dark:text-highlight border-l-2 border-accent dark:border-highlight"
                        : "text-slate-450 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850/50 hover:text-slate-900 dark:hover:text-slate-250"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Config Form Panel */}
            <div className="lg:col-span-9 glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 space-y-6">
              {showSavedToast && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-accent dark:text-highlight text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Settings saved successfully.
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6">
                {activeTab === "general" && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-850 dark:text-slate-200 border-b border-slate-200 dark:border-slate-855 pb-2">
                      General Parameters
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">System Name</label>
                        <input
                          type="text"
                          value={settings.systemName}
                          onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-200 focus:outline-none focus:border-accent text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Default Venue</label>
                        <input
                          type="text"
                          value={settings.defaultVenue}
                          onChange={(e) => setSettings({ ...settings, defaultVenue: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-200 focus:outline-none focus:border-accent text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Max Squad Size</label>
                        <input
                          type="number"
                          value={settings.maxSquadSize}
                          onChange={(e) => setSettings({ ...settings, maxSquadSize: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-200 focus:outline-none focus:border-accent text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Cache Timeout (Minutes)</label>
                        <input
                          type="number"
                          value={settings.cacheTimeout}
                          onChange={(e) => setSettings({ ...settings, cacheTimeout: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-855 dark:text-slate-200 focus:outline-none focus:border-accent text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl mt-4">
                      <div>
                        <div className="text-xs font-bold text-slate-850 dark:text-slate-200">Auto-Calculate Net Run Rate</div>
                        <p className="text-[10px] text-slate-500 mt-0.5">Automatically update standings upon logging match results.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.autoNRR}
                        onChange={(e) => setSettings({ ...settings, autoNRR: e.target.checked })}
                        className="w-4 h-4 text-accent bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded focus:ring-accent"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-855 dark:text-slate-200 border-b border-slate-200 dark:border-slate-855 pb-2">
                      Alerts & Communications
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 rounded-xl">
                        <div>
                          <div className="text-xs font-bold text-slate-850 dark:text-slate-200">Email Notifications</div>
                          <p className="text-[10px] text-slate-500 mt-0.5">Send fixture updates and admin reports to team managers.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.emailNotif}
                          onChange={(e) => setSettings({ ...settings, emailNotif: e.target.checked })}
                          className="w-4 h-4 text-accent bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded focus:ring-accent"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 rounded-xl">
                        <div>
                          <div className="text-xs font-bold text-slate-850 dark:text-slate-200">Push Notifications</div>
                          <p className="text-[10px] text-slate-500 mt-0.5">Enable real-time scorecard notifications in browser.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.pushNotif}
                          onChange={(e) => setSettings({ ...settings, pushNotif: e.target.checked })}
                          className="w-4 h-4 text-accent bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded focus:ring-accent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-855 dark:text-slate-200 border-b border-slate-200 dark:border-slate-855 pb-2">
                      Privacy Configurations
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 rounded-xl">
                        <div>
                          <div className="text-xs font-bold text-slate-855 dark:text-slate-200">Public Live Scoreboard Access</div>
                          <p className="text-[10px] text-slate-500 mt-0.5">Allow guest visitors to view scores without logging in.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.publicAccess}
                          onChange={(e) => setSettings({ ...settings, publicAccess: e.target.checked })}
                          className="w-4 h-4 text-accent bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded focus:ring-accent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-850">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
