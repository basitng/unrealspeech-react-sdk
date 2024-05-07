import { useState, useEffect } from "react";
import UnrealSpeech from "../index";

const useUnrealSpeech = (apiKey: string) => {
  const [unrealSpeech, setUnrealSpeech] = useState<UnrealSpeech | null>(null);

  useEffect(() => {
    const instance = new UnrealSpeech(apiKey);
    setUnrealSpeech(instance);
  }, [apiKey]);

  return unrealSpeech;
};

export default useUnrealSpeech;
