import { useState } from "react";
import useUnrealSpeech from "./useUnrealSpeech";
import { StreamPayload } from "../types/index";

const useStream = (apiKey: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ArrayBuffer | null>(null);
  const unrealSpeech = useUnrealSpeech(apiKey);

  const stream = async (text: string, options?: StreamPayload) => {
    if (!unrealSpeech) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await unrealSpeech.stream(text, options);
      setData(result);
    } catch (error) {
      setError(error as Error);
    }

    setIsLoading(false);
  };

  return { isLoading, error, data, stream };
};

export default useStream;
