"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, X, Target, Gamepad, Volleyball } from 'lucide-react';

export default function RulesSection() {
  const [activeGame, setActiveGame] = useState(0);
  const [showFullRules, setShowFullRules] = useState(false);
  const [selectedRules, setSelectedRules] = useState<number | null>(null);

  const games = [
    {
      name: "Valorant Championship",
      icon: <Target className="w-5 h-5 text-red-500" />,
      shortDesc: "5v5 tactical shooter with unique agent abilities",
      rules: [
        "ELIGIBILITY: EACH TEAM MUST HAVE AT LEAST ONE OFFLINE PLAYER FROM HIT; THE REMAINING FOUR CAN BE FROM OUTSIDE HIT.",
        "REGISTRATION / IDS: ALL PLAYERS MUST REGISTER USING THEIR RIOT GAME ID. ONLY REGISTERED IDS WILL BE ALLOWED IN THE LOBBY.",
        "GAME VERSION / DEVICES: MUMBAI SERVER WILL BE USED. TOURNAMENT MODE MUST BE ON.",
        "TEAM COMPOSITION: EACH TEAM WILL HAVE 5 PLAYERS, INCLUDING THE MANDATORY 1 HIT PLAYER.",
        "MATCH FORMAT: ALL MATCHES WILL BE BEST OF 1, EXCEPT THE FINALS WHICH WILL BE BEST OF 3.",
        "MAP / MODE SETTINGS: MAP POOL: ASCENT, BIND, BREEZE, HAVEN, ICEBOX, LOTUS, SUNSET.",
        "MATCH SCHEDULING / CHECK-IN: TOURNAMENT FORMAT WILL BE DECIDED BASED ON NUMBER OF PARTICIPATING TEAMS.",
        "IN-GAME CONDUCT: OFFENSIVE LANGUAGE, TOXIC BEHAVIOR, OR MISCONDUCT WILL LEAD TO DISQUALIFICATION.",
        "CHEATING & SUSPICIOUS ACTIVITY: CHEATS MUST BE OFF. CHEATING WILL LEAD TO IMMEDIATE DISQUALIFICATION.",
        "GAMEPLAY SETTINGS: TOURNAMENT MODE MUST BE ON.",
        "RESULT SUBMISSION / TIEBREAKERS: NOT APPLICABLE.",
        "DISPUTES / RULE ENFORCEMENT: ORGANISERS RESERVE THE RIGHT TO CHANGE OR ADD RULES AT ANY POINT.",

      ]
    },
    {
      name: "COD M Masters",
      icon: <Shield className="w-5 h-5 text-red-500" />,
      shortDesc: "4v4 action-packed first-person shooter tournament",
      rules: [
        "ELIGIBILITY: ONE PLAYER MUST BE FROM HIT. THE IGL MUST BE PRESENT PHYSICALLY.",
        "REGISTRATION / IDS: ALL TEAMS MUST REGISTER BEFOREHAND.",
        "GAME VERSION / DEVICES: NO TABLETS, IPADS, OR EMULATORS ALLOWED. MOBILE PHONES ONLY.",
        "TEAM COMPOSITION: MINIMUM 2 MEMBERS PER SQUAD.",
        "MATCH FORMAT: 3 MATCHES WILL BE PLAYED; FINAL SCORE IS BASED ON OVERALL POINTS.",
        "MAP / MODE SETTINGS: BATTLE ROYALE FORMAT. MAPS: ISOLATED AND BLACKOUT.",
        "MATCH SCHEDULING / CHECK-IN: JOIN ROOM 10 MINUTES BEFORE THE MATCH.",
        "IN-GAME CONDUCT: ABUSIVE LANGUAGE TOWARD OPPONENTS LEADS TO FULL TEAM BAN.",
        "CHEATING & SUSPICIOUS ACTIVITY: UNFAIR MEANS EQUALS TEAM BAN.",
        "GAMEPLAY SETTINGS: STANDARD BATTLE ROYALE RULES.",
        "RESULT SUBMISSION / TIEBREAKERS: FINAL RESULT = TOTAL SCORE FROM 3 MATCHES.",
        "DISPUTES / RULE ENFORCEMENT: ORGANIZERS' DECISION IS FINAL; RULES MAY BE MODIFIED.",

      ]
    },
    {
      name: "BGMI Showdown",
      icon: <Gamepad className="w-5 h-5 text-red-500" />,
      shortDesc: "4-player squad battle royale on mobile",
      rules: [
        "TEAM COMPOSITION: EACH TEAM MUST CONSIST OF 4 PLAYERS; NO SUBSTITUTES ARE ALLOWED DURING THE TOURNAMENT.",
        "ELIGIBILITY: PLAYERS FROM OUTSIDE THE COLLEGE ARE ALLOWED. HOWEVER, AT LEAST ONE TEAM MEMBER (CURRENTLY ENROLLED HIT STUDENT) MUST BE PHYSICALLY PRESENT AT THE VENUE ON THE MATCH DAY.",
        "ALL PLAYERS MUST REGISTER USING THEIR CORRECT BGMI IDS. ANY CHANGES MUST BE INFORMED AT LEAST 24 HOURS BEFORE THE MATCH.",
        "ALL PARTICIPANTS MUST PLAY ON THE LATEST OFFICIAL VERSION OF BGMI AVAILABLE ON THEIR DEVICES.",
        "TOURNAMENT FORMAT: THE EVENT WILL FOLLOW AN ELIMINATION ROUND LEADING TO A POINTS-BASED FINAL. THE TEAM WITH THE HIGHEST TOTAL POINTS IN THE FINALS (BASED ON KILLS AND PLACEMENT) WILL BE DECLARED THE WINNER.",
        "MAP POOL: ERANGEL, MIRAMAR, AND SANHOK.",
        "ROUND FORMAT: AN ELIMINATION PHASE WILL SHORTLIST TEAMS. FINALISTS WILL BATTLE ACROSS MULTIPLE MATCHES, WITH OVERALL PERFORMANCE (KILLS + PLACEMENT POINTS) DECIDING THE WINNER.",
        "ROOM SETTINGS: TPP MODE, SQUAD, RED ZONE ON, STANDARD LOOT, AND BALANCED ZONE SETTINGS. ADDITIONAL MATCH PARAMETERS WILL BE SHARED BEFORE EACH ROUND.",
        "OFFLINE PLAYER REQUIREMENT: AT LEAST ONE TEAM MEMBER MUST BE PRESENT PHYSICALLY AT THE VENUE DURING MATCHES.",
        "TEAM CAPTAINS MUST CHECK IN 15 MINUTES BEFORE MATCH TIME. BEING MORE THAN 10 MINUTES LATE MAY RESULT IN DISQUALIFICATION.",
        "ONLY MOBILE PHONES ARE ALLOWED. THE USE OF TABLETS, EMULATORS, OR EXTERNAL DEVICES IS STRICTLY PROHIBITED.",
        "SUSPICIOUS ACTIVITY: PLAYERS MAY BE ASKED TO RECORD AND SUBMIT THEIR GAMEPLAY DURING LATER ROUNDS IF ANY SUSPICIOUS BEHAVIOR IS REPORTED.",
        "TOXIC BEHAVIOR, VERBAL ABUSE, OR UNSPORTSMANLIKE CONDUCT WILL LEAD TO DISQUALIFICATION.",
        "CHEATING, INCLUDING USE OF HACKS, THIRD-PARTY SOFTWARE, OR SCRIPTS, WILL RESULT IN IMMEDIATE DISQUALIFICATION.",
        "PLAYERS MUST PLAY USING THEIR OWN ACCOUNTS. SMURFING OR ACCOUNT SHARING IS STRICTLY PROHIBITED.",
        "TEAM CAPTAINS MUST SUBMIT CLEAR MATCH SCREENSHOTS, SHOWING RANK AND KILLS AFTER EACH MATCH.",
        "ORGANIZERS RESERVE THE RIGHT TO CHANGE OR UPDATE RULES WITH PRIOR NOTICE TO ENSURE FAIR COMPETITION."

      ]
    },
    {
      name: "FIFA Tournament",
      icon: <Volleyball className="w-5 h-5 text-red-500" />,
      shortDesc: "1v1 football simulation game",
      rules: [
        "ELIGIBILITY: ONLY CURRENT HITIANS ARE ELIGIBLE.",
        "REGISTRATION / IDS: INDIVIDUAL PLAYERS MUST REPORT TO THE FIFA DESK TO REGISTER ON THE DAY OF PARTICIPATION.",
        "GAME VERSION / DEVICES: ALL REQUIRED EQUIPMENT WILL BE PROVIDED.",
        "TEAM COMPOSITION: 1V1 FORMAT.",
        "MATCH FORMAT: DIRECT KNOCKOUT; NO SECOND CHANCES AFTER A LOSS.",
        "MAP / MODE SETTINGS: ONLY UCL TEAMS ALLOWED. HALF LENGTH: 5 MINS; GAME SPEED: NORMAL; INJURIES OFF; BOOKINGS & OFFSIDES ON.",
        "MATCH SCHEDULING / CHECK-IN: PLAYERS MUST REPORT 15 MINS BEFORE THEIR MATCH.",
        "IN-GAME CONDUCT: NO TOXIC BEHAVIOR, STALLING, OR REPEATED PAUSING.",
        "CHEATING & SUSPICIOUS ACTIVITY: REPLAYS ALLOWED ONLY IF UNDER 10 MINS PLAYED; ORGANIZERS DECIDE OTHERWISE.",
        "GAMEPLAY SETTINGS: JOYSTICK ONLY (PROVIDED OR PERSONAL XBOX-STYLE). NO KEYBOARDS. NO CONTROL ASSISTS.",
        "RESULT SUBMISSION / TIEBREAKERS: NO SECOND CHANCES; EXTRA TIME & PENALTIES ON FOR DRAWS.",
        "DISPUTES / RULE ENFORCEMENT: ORGANIZER DECISIONS ARE FINAL. RULE MODIFICATIONS ALLOWED.",

      ]
    },
    {
      name: "FREEFIRE MAX",
      icon: <Gamepad className="w-5 h-5 text-red-500" />,
      shortDesc: "4-player squad battle royale on mobile",
      rules: [
        "ELIGIBILITY: OUTSIDE PLAYERS ALLOWED, BUT AT LEAST 1 HIT MEMBER MUST BE PRESENT PHYSICALLY.",
        "REGISTRATION / IDS: REGISTER USING CORRECT FREE FIRE UIDS. CHANGES REPORTED 24 HRS PRIOR.",
        "GAME VERSION / DEVICES: MUST PLAY ON LATEST VERSION. ONLY MOBILE PHONES ALLOWED; NO EMULATORS/TABLETS.",
        "TEAM COMPOSITION: TEAMS OF 4. NO SUBSTITUTES ALLOWED.",
        "MATCH FORMAT: ELIMINATION ROUND → FINALS (POINTS-BASED).",
        "MAP / MODE SETTINGS: MAPS: BERMUDA AND PURGATORY. STANDARD BR MODE WITH BALANCED LOOT.",
        "MATCH SCHEDULING / CHECK-IN: CAPTAINS MUST CHECK IN 15 MINS BEFORE MATCH.",
        "IN-GAME CONDUCT: TOXICITY, ABUSE, OR UNSPORTSMANLIKE BEHAVIOR = DISQUALIFICATION.",
        "CHEATING & SUSPICIOUS ACTIVITY: HACKS, SMURFING, OR EXTERNAL SOFTWARE = INSTANT DISQUALIFICATION.",
        "GAMEPLAY SETTINGS: MATCH PARAMETERS (LOOT/ZONE) ANNOUNCED BEFORE ROUNDS.",
        "RESULT SUBMISSION / TIEBREAKERS: CAPTAINS MUST SUBMIT SCREENSHOTS SHOWING RANK AND KILLS.",
        "DISPUTES / RULE ENFORCEMENT: ORGANIZERS RESERVE RIGHT TO MODIFY RULES WITH PRIOR NOTICE.",

      ]
    },
    {
      name: "eFootball Mobile Tournament",
      icon: <Volleyball className="w-5 h-5 text-red-500" />,
      shortDesc: "1v1 football simulation game",
      rules: [
        "ELIGIBILITY: ONLY HIT STUDENTS ARE ELIGIBLE. MUST BE PRESENT PHYSICALLY.",
        "REGISTRATION / IDS: PLAYERS MUST REGISTER USING THEIR CORRECT KONAMI EFOOTBALL IDS. CHANGES MUST BE REPORTED 24 HOURS IN ADVANCE.",
        "GAME VERSION / DEVICES: LATEST OFFICIAL GAME VERSION MUST BE USED.",
        "TEAM COMPOSITION: ONE PLAYER PER TEAM.",
        "MATCH FORMAT: GROUP STAGE (8 GROUPS A to H), THEN KNOCKOUT.",
        "MAP / MODE SETTINGS: GROUP STAGE: AUTHENTIC TEAM SETTINGS. KNOCKOUTS: DREAM TEAM ALLOWED (MAX 3 EPIC/LEGENDARY CARDS, STRENGTH ≤ 3049).",
        "MATCH SCHEDULING / CHECK-IN: MATCHES CONDUCTED AS PER FIXTURE; TOSS BEFORE EACH MATCH FOR HOME/AWAY.",
        "IN-GAME CONDUCT: ANY DISCONNECTION IS A FORFEIT (2 to 0 LOSS).",
        "CHEATING & SUSPICIOUS ACTIVITY: INTENTIONAL DISCONNECTIONS = WALKOVER FIRST TIME; EXPULSION ON REPEAT.",
        "GAMEPLAY SETTINGS: MATCH LENGTH 6 MINS; NORMAL SPEED; 6 SUBS; 3 INTERVALS.",
        "RESULT SUBMISSION / TIEBREAKERS: POINTS SYSTEM: WIN = 3, DRAW = 1. TIEBREAKERS: GOAL DIFFERENCE → GOALS SCORED → ONE-LEG DECIDER.",
        "DISPUTES / RULE ENFORCEMENT: ORGANIZING HEAD WILL RESOLVE DISPUTES AND MAY MODIFY RULES.",

      ]
    },
  ];

  const nextGame = () => {
    setActiveGame((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  const prevGame = () => {
    setActiveGame((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const openFullRules = (gameIndex: number) => {
    setSelectedRules(gameIndex);
    setShowFullRules(true);
  };

  const closeFullRules = () => {
    setShowFullRules(false);
  };

  // Auto-rotate games every 8 seconds if full rules are not shown
  useEffect(() => {
    if (showFullRules) return;
    
    const interval = setInterval(() => {
      nextGame();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [showFullRules]);

  return (
    <section id="rules" className="py-20 relative bg-black">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-red-900/20 to-transparent"></div>
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-red-500/5 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-red-500/5 blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Shield className="text-red-500 mr-2" />
            <span className="text-white">Tournament <span className="text-red-500">Rules</span></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Familiarize yourself with the rules before competing. Fair play and sportsmanship are essential for an epic gaming experience.
          </p>
        </div>
        
        {/* Game Selector (Visible on larger screens) */}
        <div className="hidden md:flex justify-center space-x-4 mb-8">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => setActiveGame(index)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeGame === index 
                  ? 'bg-red-500 text-white scale-105' 
                  : 'bg-black/50 border border-red-500/30 text-gray-300 hover:border-red-500/50'
              }`}
            >
              <span className="mr-2 inline-flex">{game.icon}</span>
              {game.name}
            </button>
          ))}
        </div>
        
        {/* Slider */}
        <div className="relative">
          <div className="backdrop-blur-lg bg-black/60 border border-red-900/20 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-red-900/20">
              <h3 className="text-2xl font-bold text-red-500 flex items-center">
                <span className="text-3xl mr-3">{games[activeGame].icon}</span>
                {games[activeGame].name}
              </h3>
              <div className="md:hidden flex items-center">
                <span className="text-gray-400 text-sm mr-2">{activeGame + 1}/{games.length}</span>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-6">{games[activeGame].shortDesc}</p>
              
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                  <Shield className="w-4 h-4 text-red-500" />
                </span>
                Key Rules
              </h4>
              
              <div className="space-y-3">
                {games[activeGame].rules.slice(0, 5).map((rule, index) => (
                  <div 
                    key={index}
                    className="backdrop-blur-sm bg-black/30 border border-red-900/10 rounded-lg p-3 hover:border-red-500/30 transition-all flex"
                  >
                    <div className="text-red-500 font-bold mr-3 self-start">{index + 1}.</div>
                    <div className="text-gray-300">{rule}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={() => openFullRules(activeGame)}
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 py-2 px-6 rounded-lg text-sm transition-colors inline-flex items-center"
                >
                  View All Rules 
                  <span className="ml-2 text-xs bg-red-500/30 rounded-full px-2 py-1">
                    {games[activeGame].rules.length}
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevGame}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black border border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextGame}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black border border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Pagination indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveGame(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeGame === index 
                  ? 'w-8 bg-red-500' 
                  : 'bg-red-500/30 hover:bg-red-500/50'
              }`}
              aria-label={`Go to game ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Full Rules Modal */}
      {showFullRules && selectedRules !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-red-900/30 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-red-900/30 flex justify-between items-center">
              <h3 className="text-xl font-bold text-red-500 flex items-center">
                <span className="text-2xl mr-2">{games[selectedRules].icon}</span>
                {games[selectedRules].name} - Complete Rulebook
              </h3>
              <button 
                onClick={closeFullRules}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                {games[selectedRules].rules.map((rule, index) => (
                  <div 
                    key={index}
                    className="backdrop-blur-sm bg-black/30 border border-red-900/10 rounded-lg p-4 hover:border-red-500/30 transition-all flex"
                  >
                    <div className="text-red-500 font-bold mr-3 self-start">{index + 1}.</div>
                    <div className="text-gray-300">{rule}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-red-900/30 flex justify-end">
              <button 
                onClick={closeFullRules}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg text-sm transition-colors"
              >
                Close Rulebook
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}