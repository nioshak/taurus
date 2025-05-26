import { useEffect, useState } from "react";

export default function LiveFeedCards({ signup }) {
  const [conjunction, setConjunction] = useState({});
  const [maneuver, setManeuver] = useState({});
  const [tle, setTLE] = useState({});

  useEffect(() => {
    const updateFeeds = () => {
      setConjunction({
        satellite_id: "38745",
        threat_object: "SAT-" + Math.floor(Math.random() * 10000),
        min_range_km: (Math.random() * 0.2 + 0.05).toFixed(3),
        ttc_minutes: Math.floor(Math.random() * 120 + 30),
        confidence: (Math.random()).toFixed(2)
      });

      setManeuver({
        satellite_id: "25544",
        risk_score: (Math.random() * 0.8 + 0.1).toFixed(2),
        min_range_km: (Math.random() * 0.3 + 0.1).toFixed(3),
        recommended: "ΔV +" + (Math.random() * 1.2).toFixed(1) + " m/s (R-bar)"
      });

      setTLE({
        satellite_id: "40294",
        epoch: new Date().toISOString(),
        inclination: (97 + Math.random() * 5).toFixed(2),
        eccentricity: "0.000" + Math.floor(Math.random() * 9)
      });
    };

    updateFeeds(); // Initial call
    const interval = setInterval(updateFeeds, 1000); // Update every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">

          {/* Conjunction Alert */}
          <div className="max-w-sm w-full sm:w-[400px] rounded-xl bg-black/80 p-4 font-mono text-xs shadow-lg shadow-amber-500/30 animate-fade-in overflow-hidden transition duration-500 ease-in-out">
            <p className="text-amber-300 mb-2">// Conjunction Alert</p>
            <pre className="whitespace-pre-line text-green-400">
    {JSON.stringify(conjunction, null, 2)}
            </pre>
          </div>

          {/* Maneuver Suggestion */}
          <div className="max-w-sm w-full sm:w-[400px] rounded-xl bg-black/80 p-4 font-mono text-xs shadow-lg shadow-teal-500/30 animate-fade-in overflow-hidden transition duration-500 ease-in-out">
            <p className="text-teal-300 mb-2">// Maneuver Suggestion</p>
            <pre className="whitespace-pre-line text-green-400">
    {JSON.stringify(maneuver, null, 2)}
            </pre>
          </div>

        </div>

        <p className="mt-10 text-center text-slate-400">
          Want full access?{" "}
          <button
            onClick={signup}
            className="underline decoration-teal-400 hover:text-teal-300"
          >
            Sign up
          </button>
          .
        </p>
      </div>
    </section>

  );
}
