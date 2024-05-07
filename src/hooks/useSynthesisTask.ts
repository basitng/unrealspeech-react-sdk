import { useState } from "react";
import useUnrealSpeech from "./useUnrealSpeech";
import { SynthesisTaskPayload, ISynthesisTaskResponse } from "../types/index";

const useSynthesisTask = (apiKey: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [taskId, setTaskId] = useState("");
  const [taskStatus, setTaskStatus] = useState<
    ISynthesisTaskResponse["SynthesisTask"] | null
  >(null);
  const unrealSpeech = useUnrealSpeech(apiKey);

  const createSynthesisTask = async (
    text: string,
    options?: SynthesisTaskPayload
  ) => {
    if (!unrealSpeech) return;

    setIsLoading(true);
    setError(null);
    setTaskId("");
    setTaskStatus(null);

    try {
      const result = await unrealSpeech.createSynthesisTask(text, options);
      setTaskId(result);
      await getSynthesisTaskStatus(result);
    } catch (error) {
      setError(error as Error);
    }

    setIsLoading(false);
  };

  const getSynthesisTaskStatus = async (
    taskId: string,
    maxAttempts: number = 10,
    retryDelay: number = 2000
  ) => {
    if (!unrealSpeech) return;

    try {
      const result = await unrealSpeech.getSynthesisTaskStatus(
        taskId,
        maxAttempts,
        retryDelay
      );
      setTaskStatus(result);
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    isLoading,
    error,
    taskId,
    taskStatus,
    createSynthesisTask,
    getSynthesisTaskStatus,
  };
};

export default useSynthesisTask;
