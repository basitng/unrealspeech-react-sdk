export interface ISynthesisTask {
  CreationTime: string;
  OutputUri: string;
  RequestCharacters: string;
  TaskId: string;
  TaskStatus: string;
  VoiceId: string;
}

export interface ISynthesisTaskResponse {
  SynthesisTask?: ISynthesisTask;
}

export interface StreamPayload {
  Text: string;
  VoiceId: string;
  Bitrate?: string;
  Speed?: number;
  Pitch?: number;
  Codec?: string;
  Temperature?: number;
}

export interface SynthesisTaskPayload {
  Text: string[];
  VoiceId: string;
  Bitrate?: string;
  TimestampType?: string;
  Speed?: number;
  Pitch?: number;
}

export interface SpeechPayload {
  Text: string;
  VoiceId: string;
  Bitrate?: string;
  OutputFormat?: string;
  TimestampType?: string;
  Speed?: number;
  Pitch?: number;
}
