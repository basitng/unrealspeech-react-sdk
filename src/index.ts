import useSpeech from "./hooks/useSpeech";
import useStream from "./hooks/useStream";
import useSynthesisTask from "./hooks/useSynthesisTask";
import useUnrealSpeech from "./hooks/useUnrealSpeech";
import {
  ISynthesisTask,
  ISynthesisTaskResponse,
  SpeechPayload,
  StreamPayload,
  SynthesisTaskPayload,
} from "./types";

export { default } from "./api/speechApi";

export { useSpeech, useStream, useSynthesisTask, useUnrealSpeech };
export {
  ISynthesisTask,
  ISynthesisTaskResponse,
  StreamPayload,
  SynthesisTaskPayload,
  SpeechPayload,
};
