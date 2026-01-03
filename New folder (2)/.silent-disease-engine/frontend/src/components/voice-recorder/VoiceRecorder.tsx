"use client";

import { useState, useRef } from "react";
import { Mic, Square, Send } from "lucide-react";

interface VoiceRecorderProps {
  onRecordingComplete?: () => void;
}

export default function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        // In a real app, we would send this blob to an STT service
        // For now, we'll simulate a transcript
        setTimeout(() => {
          setTranscript(
            "I slept only 4 hours last night, felt stressed at work, skipped breakfast, had junk food for lunch, and have a mild headache."
          );
        }, 1000);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };// alert("Log submitted successfully!"); // Removed alert to let parent handle UI
    if (onRecordingComplete) {
      onRecordingComplete();
    }

  const handleSubmit = () => {
    // TODO: Send transcript/audio to backend
    alert("Log submitted successfully!");
    setTranscript("");
    setAudioBlob(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <div
          className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${
            isRecording ? "bg-red-100 animate-pulse" : "bg-blue-100"
          }`}
        >
          {isRecording ? (
            <Mic className="h-12 w-12 text-red-600" />
          ) : (
            <Mic className="h-12 w-12 text-blue-600" />
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {isRecording ? "Listening... Speak clearly" : "Tap microphone to start recording"}
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Mic className="mr-2 h-5 w-5" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Square className="mr-2 h-5 w-5" />
            Stop Recording
          </button>
        )}
      </div>

      <div className="space-y-4">
        <label htmlFor="transcript" className="block text-sm font-medium text-gray-700">
          Transcript (You can edit this)
        </label>
        <textarea
          id="transcript"
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
          placeholder="Your daily health summary will appear here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!transcript}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="mr-2 h-4 w-4" />
          Submit Log
        </button>
      </div>
    </div>
  );
}
