import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  nickname: string | null;
  total_score: number | null;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("nickname, total_score")
      .order("total_score", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setEntries(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background racing-grid px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-center font-heading text-3xl font-bold tracking-wider text-foreground">
            LEADER<span className="text-primary">BOARD</span>
          </h1>
          <p className="mb-8 text-center text-sm text-muted-foreground">Top 10 racers worldwide</p>

          <div className="glass rounded-xl overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 border-b border-border px-6 py-3">
              <span className="font-heading text-xs uppercase tracking-wider text-muted-foreground">Rank</span>
              <span className="font-heading text-xs uppercase tracking-wider text-muted-foreground">Racer</span>
              <span className="font-heading text-xs uppercase tracking-wider text-muted-foreground">Score</span>
            </div>

            {entries.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                No racers yet. Be the first! 🏎️
              </div>
            )}

            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4 ${
                  i < 3 ? "bg-primary/5" : ""
                } ${i < entries.length - 1 ? "border-b border-border/50" : ""}`}
              >
                <span className={`font-heading text-lg font-bold ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                </span>
                <span className="font-body text-base text-foreground">{entry.nickname || "Anonymous"}</span>
                <span className="font-heading text-sm font-bold text-primary">{entry.total_score ?? 0}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="outline" className="font-heading text-xs tracking-wider">
                ← BACK HOME
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
