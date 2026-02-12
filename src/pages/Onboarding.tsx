import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AvatarCustomizer from "@/components/AvatarCustomizer";
import VehicleSelector from "@/components/VehicleSelector";

const Onboarding = () => {
  const [step, setStep] = useState<"avatar" | "vehicle">("avatar");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background racing-grid">
      {/* Progress */}
      <div className="flex items-center justify-center gap-4 px-6 pt-6">
        <div className={`h-1 w-20 rounded-full ${step === "avatar" ? "bg-primary" : "bg-muted"}`} />
        <div className={`h-1 w-20 rounded-full ${step === "vehicle" ? "bg-primary" : "bg-muted"}`} />
      </div>

      <AnimatePresence mode="wait">
        {step === "avatar" ? (
          <motion.div
            key="avatar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <AvatarCustomizer onComplete={() => setStep("vehicle")} />
          </motion.div>
        ) : (
          <motion.div
            key="vehicle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <VehicleSelector onComplete={() => navigate("/route")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
