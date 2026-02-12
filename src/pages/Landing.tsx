import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SpeedLines from "@/components/SpeedLines";

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background racing-grid">
      <SpeedLines />
      
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-md bg-primary" />
          <span className="font-heading text-lg font-bold tracking-wider text-foreground">
            REAL<span className="text-primary">DRIVE</span> AI
          </span>
        </motion.div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="font-heading text-xs tracking-wider">
              LOGIN
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="font-heading text-xs tracking-wider">
              SIGN UP
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 font-heading text-xs font-medium uppercase tracking-[0.3em] text-primary">
            The Future of Driving Simulation
          </p>
          <h1 className="mb-6 font-heading text-5xl font-black leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            DRIVE THE
            <br />
            <span className="text-glow text-primary">REAL WORLD</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Experience real-world roads in a stunning 3D driving simulator.
            Choose your vehicle, pick a route, and race to the finish.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/signup">
              <Button size="lg" className="font-heading text-sm tracking-widest px-8">
                START DRIVING
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" size="lg" className="font-heading text-sm tracking-widest px-8">
                LEADERBOARD
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-8 lg:gap-16"
        >
          {[
            { label: "VEHICLES", value: "3+" },
            { label: "REAL ROADS", value: "∞" },
            { label: "PLAYERS", value: "LIVE" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
              <div className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/5 to-transparent" />
    </div>
  );
};

export default Landing;
