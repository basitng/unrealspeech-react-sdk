import { useState } from "react";
import useUnrealSpeech from "./useUnrealSpeech";
import { SpeechPayload } from "../types/index";

const useSpeech = (apiKey: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);
  const unrealSpeech = useUnrealSpeech(apiKey);

  const speech = async (text: string, options?: SpeechPayload) => {
    if (!unrealSpeech) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await unrealSpeech.speech(text, options);
      setData(result);
    } catch (error) {
      setError(error as Error);
    }

    setIsLoading(false);
  };

  return { isLoading, error, data, speech };
};

export default useSpeech;
