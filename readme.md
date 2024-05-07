# UnrealSpeech React SDK

The UnrealSpeech React SDK is a package that provides a set of hooks and functions to interact with the UnrealSpeech API in a React application. It simplifies the process of generating speech, creating synthesis tasks, and retrieving task status using the UnrealSpeech service.

### Installation

To install the UnrealSpeech React SDK, use npm or yarn:

```bash
npm install unrealspeech-react-sdk
```

or

```bash
yarn add unrealspeech-react-sdk
```

## Usage

useUnrealSpeech
The `useUnrealSpeech` hook initializes an instance of the UnrealSpeech class with the provided API key. It returns the UnrealSpeech instance that can be used to access the UnrealSpeech API methods.

```js
import { useUnrealSpeech } from "unrealspeech-react-sdk";

const App = () => {
  const unrealSpeech = useUnrealSpeech("YOUR_API_KEY");
};
```

### useSynthesisTask

The `useSynthesisTask` hook provides a way to create synthesis tasks and retrieve their status. It returns an object containing the following properties:

1. `isLoading`: Indicates whether the synthesis task creation is in progress.
2. `error`: Stores any error that occurs during the synthesis task creation or status retrieval.
3. `taskId`: Stores the ID of the created synthesis task.
4. `taskStatus`: Stores the status of the synthesis task.
5. `createSynthesisTask`: A function to create a new synthesis task.
6. `getSynthesisTaskStatus`: A function to retrieve the status of a synthesis task.

```js
import { useSynthesisTask } from "unrealspeech-react-sdk";

const App = () => {
  const {
    isLoading,
    error,
    taskId,
    taskStatus,
    createSynthesisTask,
    getSynthesisTaskStatus,
  } = useSynthesisTask("YOUR_API_KEY");

  const handleCreateTask = async () => {
    await createSynthesisTask("Hello, world!");
  };
};
```

### useSpeech

The useSpeech hook provides a way to generate speech using the UnrealSpeech API. It returns an object containing the following properties:

1. `isLoading`: Indicates whether the speech generation is in progress.
2. `error`: Stores any error that occurs during the speech generation.
3. `data`: Stores the generated speech data.
4. `speech`: A function to generate speech.

```js
import { useSpeech } from "unrealspeech-react-sdk";

const App = () => {
  const { isLoading, error, data, speech } = useSpeech("YOUR_API_KEY");

  const handleSpeech = async () => {
    await speech("Hello, world!");
  };
};
```

### Example

```js
import React, { useState } from "react";
import {
  useUnrealSpeech,
  useSynthesisTask,
  useSpeech,
} from "unrealspeech-react-sdk";

const App = () => {
  const [text, setText] = useState("");
  const unrealSpeech = useUnrealSpeech("YOUR_API_KEY");
  const {
    isLoading: isSynthesisTaskLoading,
    error: synthesisTaskError,
    taskId,
    taskStatus,
    createSynthesisTask,
    getSynthesisTaskStatus,
  } = useSynthesisTask("YOUR_API_KEY");
  const {
    isLoading: isSpeechLoading,
    error: speechError,
    data: speechData,
    speech,
  } = useSpeech("YOUR_API_KEY");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCreateTask = async () => {
    await createSynthesisTask(text, {
      voiceId: "Scarlett",
      bitrate: "192k",
      timestampType: "word",
      speed: 0,
      pitch: 1.0,
    });
  };

  const handleGetTaskStatus = async () => {
    await getSynthesisTaskStatus(taskId);
  };

  const handleSpeech = async () => {
    await speech(text, {
      voiceId: "Scarlett",
      bitrate: "320k",
      timestampType: "sentence",
      speed: 0,
      pitch: 1.0,
    });
  };

  return (
    <div>
      <h1>UnrealSpeech React SDK Example</h1>
      <div>
        <h2>Create Synthesis Task</h2>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to synthesize"
        />
        <button onClick={handleCreateTask} disabled={isSynthesisTaskLoading}>
          {isSynthesisTaskLoading ? "Creating Task..." : "Create Task"}
        </button>
        {synthesisTaskError && <p>Error: {synthesisTaskError.message}</p>}
        {taskId && <p>Task ID: {taskId}</p>}
        {taskStatus && <p>Task Status: {taskStatus.TaskStatus}</p>}
        <button onClick={handleGetTaskStatus} disabled={!taskId}>
          Get Task Status
        </button>
      </div>
      <div>
        <h2>Generate Speech</h2>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to generate speech"
        />
        <button onClick={handleSpeech} disabled={isSpeechLoading}>
          {isSpeechLoading ? "Generating Speech..." : "Generate Speech"}
        </button>
        {speechError && <p>Error: {speechError.message}</p>}
        {speechData && (
          <audio controls>
            <source src={speechData.OutputUri} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default App;
```

### Configuration

The hooks and functions in the UnrealSpeech React SDK accept various options to customize the behavior of the UnrealSpeech API calls. Please refer to the UnrealSpeech API documentation for more information on the available options.

### Error Handling

The hooks and functions in the UnrealSpeech React SDK handle errors that may occur during API calls. The error property in the returned objects will contain any error that occurred. Make sure to check for errors and handle them appropriately in your application.

### License

This package is licensed under the MIT License.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the GitHub repository.
Support
For any questions or support, please contact our support team at support@unrealspeech.com.
