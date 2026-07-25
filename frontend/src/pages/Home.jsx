import { useState } from "react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import {
  Trophy,
  Users,
  UserCheck,
  Calendar,
  Activity,
  BarChart3,
  FileText,
  ChevronDown,
  Quote,
  Star,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How do I create and configure a new tournament?",
      a: "Once logged into the admin panel, navigate to the 'Tournaments' section. Click 'Add Tournament', enter the details (type, venue, duration, teams), and click save. You can choose between League, Knockout, or Round Robin formats."
    },
    {
      q: "Does CricPro automatically calculate Net Run Rate (NRR)?",
      a: "Yes! Based on match results, runs scored, overs faced, runs conceded, and overs bowled, CricPro automatically calculates and updates the Net Run Rate (NRR) in the live Points Table."
    },
    {
      q: "Can I manage player stats like strike rates, averages, and wicket counts?",
      a: "Absolutely. The 'Player Management' and 'Reports' modules track detailed records for all registered players, automatically aggregating total runs, wickets, strike rates, and top figures."
    },
    {
      q: "How do we transition a tournament to declare a Champion?",
      a: "As matches progress and outcomes are logged, team points accumulate. CricPro supports final fixtures and knockout tracking, enabling tournament directors to finalize rankings and lock the champion."
    }
  ];

  const testimonials = [
    {
      quote: "CricPro has completely transformed how we run our annual university cricket tournaments. The live scoring and points table calculation save us hours of manual math.",
      author: "Rajesh Patel",
      role: "Sports Director, Gujarat Club",
      rating: 5,
      avatar: "RP"
    },
    {
      quote: "The interface looks extremely professional, like an IPL broadcast. Our sponsors and academy players love watching their stats updated in real-time.",
      author: "Sanjay Sharma",
      role: "Head Coach, Cricket Excellence Academy",
      rating: 5,
      avatar: "SS"
    },
    {
      quote: "Outstanding product. Navigating between fixtures, teams, and tournament analytics is incredibly smooth. Highly recommended for any serious sports organizer.",
      author: "Vikram Sen",
      role: "League Commissioner, Professional T20 League",
      rating: 5,
      avatar: "VS"
    }
  ];

  const timelineSteps = [
    { num: "01", title: "Create Tournament", desc: "Define format, venue, and duration.", icon: Trophy, color: "border-highlight dark:border-highlight" },
    { num: "02", title: "Register Teams", desc: "Add franchises, squads, and captains.", icon: Users, color: "border-accent dark:border-accent" },
    { num: "03", title: "Schedule Matches", desc: "Map fixtures, assign umpires and venues.", icon: Calendar, color: "border-blue-500 dark:border-blue-400" },
    { num: "04", title: "Live Score", desc: "Log run-by-run stats during the game.", icon: Activity, color: "border-red-500 dark:border-red-400" },
    { num: "05", title: "Points Table", desc: "Track standings and qualification status.", icon: BarChart3, color: "border-purple-550 dark:border-purple-400" },
    { num: "06", title: "Champion", desc: "Crown the winner at the final ceremony.", icon: Award, color: "border-highlight dark:border-highlight animate-pulse" }
  ];

  const features = [
    { title: "Tournament Management", desc: "Organize leagues, round robins, or knockouts easily. Configure rules, schedules, and brackets.", icon: "🏆" },
    { title: "Team Management", desc: "Add franchises, register squads, assign captains, and view overall team stats.", icon: "👥" },
    { title: "Player Profiles", desc: "Deep player rosters detailing roles, career aggregates, match summaries, and visual stats.", icon: "🏏" },
    { title: "Match Scheduling", desc: "Plan dates, assign umpires, book stadium venues, and set match durations.", icon: "📅" },
    { title: "Live Scoring", desc: "Broadcast live cricket action. View real-time squad sheets, runs, wickets, and run rates.", icon: "⚡" },
    { title: "Points Table", desc: "Live, automated standings detailing wins, losses, ties, points, and net run rate (NRR).", icon: "📊" },
    { title: "Reports & Analytics", desc: "Professional reports and visual charts tracking tournament growth, team wins, and top performers.", icon: "📈" }
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Hero />

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-white dark:bg-[#020617] overflow-hidden border-t border-slate-200 dark:border-slate-900 transition-colors">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Powerful Features For Tournament Organizers
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 max-w-xl mx-auto">
              Everything you need to host, score, and analyze high-stakes cricket tournaments in one premium, broadcast-grade dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="relative py-20 bg-slate-50 dark:bg-[#060b19] border-y border-slate-200 dark:border-slate-900 overflow-hidden transition-colors">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-highlight/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              CricPro by the Numbers
            </h2>
            <p className="text-slate-500 dark:text-slate-450 text-xs mt-2">
              Empowering cricket associations and local organizers around the globe.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon="🏆" number="12" title="Total Tournaments" />
            <StatCard icon="👥" number="48" title="Total Teams" />
            <StatCard icon="🏏" number="720" title="Total Players" />
            <StatCard icon="📅" number="168" title="Total Matches" />
          </div>
        </div>
      </section>

      {/* How CricPro Works (Timeline) */}
      <section id="how-it-works" className="relative py-24 bg-white dark:bg-[#020617] overflow-hidden transition-colors">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold text-accent dark:text-highlight tracking-widest">Workflow Timeline</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
              How CricPro Works
            </h2>
            <p className="text-slate-550 dark:text-slate-400 text-sm mt-3 max-w-xl mx-auto">
              From configuration to final trophy lifts, we simplify every step of your tournament cycle.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            
            {/* Connected background lines for desktop */}
            <div className="absolute top-12 left-12 right-12 h-0.5 bg-slate-200 dark:bg-gradient-to-r dark:from-accent/20 dark:via-blue-500/20 dark:to-highlight/20 hidden lg:block z-0" />

            {timelineSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4">
                  {/* Step Icon circle */}
                  <div className={`w-14 h-14 rounded-full bg-white dark:bg-slate-900 border-2 ${step.color} flex items-center justify-center shadow-md dark:shadow-lg relative group overflow-hidden`}>
                    <div className="absolute inset-0 bg-slate-100 dark:bg-slate-950 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <StepIcon className="w-5 h-5 text-slate-800 dark:text-slate-100" />
                    
                    {/* Floating badge for step order */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-950 text-[10px] font-bold border border-slate-200 dark:border-slate-800 flex items-center justify-center text-accent dark:text-highlight">
                      {step.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xs tracking-wider uppercase text-slate-800 dark:text-slate-150">{step.title}</h3>
                    <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-1.5 max-w-[150px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-slate-50 dark:bg-[#060b19] border-t border-slate-250 dark:border-slate-900 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold text-accent dark:text-highlight tracking-widest">Testimonials</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
              Trusted by Tournament Organizers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl relative border border-slate-250 dark:border-slate-800/80 flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-accent/10 dark:text-accent/20 mb-4" />
                  <p className="text-slate-600 dark:text-slate-350 text-xs sm:text-sm leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-6 border-t border-slate-100 dark:border-slate-850 pt-4">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center font-display font-bold text-xs text-accent dark:text-highlight">
                    {test.avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200">{test.author}</h4>
                    <p className="font-sans text-[10px] text-slate-500 mt-0.5">{test.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5 ml-auto text-highlight">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-highlight" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 bg-white dark:bg-[#020617] overflow-hidden border-t border-slate-250 dark:border-slate-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-550 dark:text-slate-400 text-sm mt-3">
              Find answers to commonly asked questions about managing CricPro.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card rounded-xl border border-slate-200 dark:border-slate-800/60 overflow-hidden transition-all duration-305"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-100/30 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <span className="font-display font-bold text-slate-800 dark:text-slate-250 text-xs sm:text-sm uppercase tracking-wide">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent dark:text-highlight" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-4 pt-1 border-t border-slate-100 dark:border-slate-850/50">
                          <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-450 leading-relaxed text-left">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;