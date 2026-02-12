import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import RacerModel from "@/components/RacerModel";

interface Props {
  onComplete: () => void;
}

const colorOptions = ["#00e676", "#00bcd4", "#ff5722", "#ffeb3b", "#e91e63", "#9c27b0", "#ffffff"];

const AvatarCustomizer = ({ onComplete }: Props) => {
  const [nickname, setNickname] = useState("");
  const [helmet, setHelmet] = useState("#00e676");
  const [jacket, setJacket] = useState("#1a1a2e");
  const [gloves, setGloves] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!nickname.trim()) {
      toast({ title: "Enter a nickname", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({
          nickname,
          avatar_config: { helmet, jacket, gloves },
        })
        .eq("user_id", user.id);
    }
    setLoading(false);
    onComplete();
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 lg:flex-row lg:justify-center lg:gap-16">
      {/* 3D Preview */}
      <div className="h-[350px] w-full max-w-md lg:h-[500px]">
        <Canvas camera={{ position: [0, 1.5, 3], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <RacerModel helmet={helmet} jacket={jacket} gloves={gloves} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom={false} minPolarAngle={1} maxPolarAngle={1.8} />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="glass w-full max-w-sm rounded-xl p-6">
        <h2 className="mb-6 font-heading text-xl font-bold tracking-wider text-foreground">
          CUSTOMIZE <span className="text-primary">RACER</span>
        </h2>

        <div className="mb-4">
          <Label>Nickname</Label>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="SpeedDemon42"
            maxLength={20}
          />
        </div>

        <ColorPicker label="Helmet" value={helmet} onChange={setHelmet} options={colorOptions} />
        <ColorPicker label="Jacket" value={jacket} onChange={setJacket} options={colorOptions} />
        <ColorPicker label="Gloves" value={gloves} onChange={setGloves} options={colorOptions} />

        <Button onClick={handleSave} className="mt-6 w-full font-heading tracking-wider" disabled={loading}>
          {loading ? "SAVING..." : "NEXT →"}
        </Button>
      </div>
    </div>
  );
};

const ColorPicker = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (c: string) => void;
  options: string[];
}) => (
  <div className="mb-4">
    <Label className="mb-2 block text-xs uppercase tracking-wider">{label}</Label>
    <div className="flex gap-2">
      {options.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`h-8 w-8 rounded-full border-2 transition-transform ${
            value === c ? "scale-110 border-primary" : "border-transparent"
          }`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  </div>
);

export default AvatarCustomizer;
