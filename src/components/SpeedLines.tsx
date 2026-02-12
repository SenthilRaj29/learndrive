import { motion } from "framer-motion";

const SpeedLines = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            top: `${15 + i * 15}%`,
            width: `${30 + Math.random() * 40}%`,
          }}
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: "-100vw", opacity: [0, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default SpeedLines;
