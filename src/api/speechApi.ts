import {
  ISynthesisTaskResponse,
  SpeechPayload,
  StreamPayload,
  SynthesisTaskPayload,
} from "../types/index";

class UnrealSpeech {
  private api_key: string;
  private base_url: string;
  private headers: Record<string, string>;

  constructor(api_key: string) {
    this.api_key = api_key;
    this.base_url = "https://api.v6.unrealspeech.com";
    this.headers = {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    };
  }

  async stream(
    text: string,
    options: {
      VoiceId?: string;
      bitrate?: string;
      speed?: number;
      pitch?: number;
      codec?: string;
      temperature?: number;
    } = {}
  ): Promise<ArrayBuffer> {
    const url = `${this.base_url}/stream`;
    const payload: StreamPayload = {
      Text: text,
      VoiceId: options.VoiceId || "Scarlett",
      Bitrate: options.bitrate || "192k",
      Speed: options.speed || 0,
      Pitch: options.pitch || 1.0,
      Codec: options.codec || "libmp3lame",
      Temperature: options.temperature || 0.25,
    };
    const response = await this._makePostRequest(url, payload);
    return await response.arrayBuffer();
  }

  async createSynthesisTask(
    text: string,
    options: {
      VoiceId?: string;
      bitrate?: string;
      timestampType?: string;
      speed?: number;
      pitch?: number;
    } = {}
  ): Promise<string> {
    const url = `${this.base_url}/synthesisTasks`;
    const payload: SynthesisTaskPayload = {
      Text: [text],
      VoiceId: options.VoiceId || "Scarlett",
      Bitrate: options.bitrate || "192k",
      TimestampType: options.timestampType || "word",
      Speed: options.speed || 0,
      Pitch: options.pitch || 1.0,
    };
    const response = await this._makePostRequest(url, payload);
    const data = (await response.json()) as ISynthesisTaskResponse;
    return data.SynthesisTask?.TaskId || "";
  }

  async getSynthesisTaskStatus(
    taskId: string,
    maxAttempts: number = 10,
    retryDelay: number = 2000
  ): Promise<ISynthesisTaskResponse["SynthesisTask"]> {
    const url = `${this.base_url}/synthesisTasks/${taskId}`;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await this._makeGetRequest(url);
      const data = (await response.json()) as ISynthesisTaskResponse;
      const taskStatus = data.SynthesisTask;

      if (taskStatus?.TaskStatus === "completed") {
        return taskStatus;
      } else {
        console.log("Audiobook generation is in progress.");
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    throw new Error("Task status check exceeded maximum attempts");
  }

  async speech(
    text: string,
    options: {
      VoiceId?: string;
      bitrate?: string;
      timestampType?: string;
      speed?: number;
      pitch?: number;
    } = {}
  ): Promise<any> {
    const url = `${this.base_url}/speech`;
    const payload: SpeechPayload = {
      Text: text,
      VoiceId: options.VoiceId || "Scarlett",
      Bitrate: options.bitrate || "320k",
      OutputFormat: "uri",
      TimestampType: options.timestampType || "sentence",
      Speed: options.speed || 0,
      Pitch: options.pitch || 1.0,
    };
    const response = await this._makePostRequest(url, payload);
    return response.json();
  }

  private async _makePostRequest(url: string, data: any): Promise<Response> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error("Error making POST request:", error);
      throw error;
    }
  }

  private async _makeGetRequest(url: string): Promise<Response> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  }

  private async _handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error ${response.status}: ${errorData.message}`);
    }
    return response;
  }
}

export default UnrealSpeech;
