import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import VehicleModel from "@/components/VehicleModel";

interface Props {
  onComplete: () => void;
}

interface Vehicle {
  id: string;
  name: string;
  type: string;
  max_speed: number;
  acceleration: number;
  handling: number;
}

const VehicleSelector = ({ onComplete }: Props) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    supabase.from("vehicles").select("*").then(({ data }) => {
      if (data) setVehicles(data as Vehicle[]);
    });
  }, []);

  const current = vehicles[selected];

  return (
    <div className="flex flex-col items-center px-6 py-8">
      <h2 className="mb-2 font-heading text-2xl font-bold tracking-wider text-foreground">
        SELECT <span className="text-primary">VEHICLE</span>
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">Choose your ride for the road</p>

      {/* 3D Preview */}
      <div className="h-[300px] w-full max-w-lg lg:h-[400px]">
        <Canvas camera={{ position: [3, 2, 5], fov: 40 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            {current && <VehicleModel type={current.type} />}
            <Environment preset="night" />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* Vehicle cards */}
      <div className="mt-4 flex gap-4">
        {vehicles.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setSelected(i)}
            className={`glass rounded-lg px-6 py-4 text-center transition-all ${
              selected === i ? "border-glow border-primary" : ""
            }`}
          >
            <div className="font-heading text-sm font-bold tracking-wider text-foreground">{v.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{v.max_speed} km/h</div>
            <div className="mt-2 flex gap-2">
              <StatBar label="SPD" value={v.max_speed / 250} />
              <StatBar label="ACC" value={v.acceleration} />
              <StatBar label="HND" value={v.handling} />
            </div>
          </button>
        ))}
      </div>

      <Button onClick={onComplete} className="mt-8 font-heading tracking-wider px-12">
        CHOOSE & CONTINUE →
      </Button>
    </div>
  );
};

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="mt-1 h-1 w-10 overflow-hidden rounded-full bg-muted">
      <div className="h-full rounded-full bg-primary" style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

export default VehicleSelector;
