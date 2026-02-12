import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const RouteSelection = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Geolocation not supported", variant: "destructive" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFrom(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        toast({ title: "Location detected!" });
      },
      () => toast({ title: "Location access denied", variant: "destructive" })
    );
  };

  const handleStart = () => {
    if (!from.trim() || !to.trim()) {
      toast({ title: "Enter both locations", variant: "destructive" });
      return;
    }
    // In a full implementation this would fetch OSRM route and start the game
    toast({ title: "Route loaded!", description: "Driving engine coming in Phase 2!" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background racing-grid px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-lg rounded-xl p-8"
      >
        <h1 className="mb-2 text-center font-heading text-2xl font-bold tracking-wider text-foreground">
          PLAN YOUR <span className="text-primary">ROUTE</span>
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Enter your start and destination, or detect your location
        </p>

        <div className="space-y-4">
          <div>
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Start location..."
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={handleDetectLocation} className="shrink-0 font-heading text-xs tracking-wider">
                📍 DETECT
              </Button>
            </div>
          </div>

          <div>
            <Label>To</Label>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination..."
            />
          </div>

          <div className="neon-line w-full" />

          <Button onClick={handleStart} className="w-full font-heading tracking-wider" size="lg">
            🏁 START DRIVING
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/leaderboard")} className="font-heading text-xs tracking-wider text-muted-foreground">
            VIEW LEADERBOARD
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default RouteSelection;
