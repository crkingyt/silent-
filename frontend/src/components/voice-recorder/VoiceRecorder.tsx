"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Send, Loader2 } from "lucide-react";

interface VoiceRecorderProps {
  onRecordingComplete?: (data: any) => void;
}

export default function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const maxDurationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const latestTranscriptRef = useRef("");

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "hi-IN", name: "Hindi (India)" },
    { code: "ta-IN", name: "Tamil (India)" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        // Initial lang
        recognitionRef.current.lang = language;

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = "";
          // Iterate from 0 to get the full transcript history
          for (let i = 0; i < event.results.length; i++) {
            finalTranscript += event.results[i][0].transcript;
          }
          setTranscript(finalTranscript);
          latestTranscriptRef.current = finalTranscript;

          // Reset silence timer on every speech result
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            stopAndSubmit();
          }, 2000);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };
      }
    }
    
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (maxDurationTimerRef.current) clearTimeout(maxDurationTimerRef.current);
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      try {
        setTranscript("");
        latestTranscriptRef.current = "";
        recognitionRef.current.lang = language; // Update language before starting
        recognitionRef.current.start();
        setIsRecording(true);
        
        // Set max duration timer (30 seconds)
        if (maxDurationTimerRef.current) clearTimeout(maxDurationTimerRef.current);
        maxDurationTimerRef.current = setTimeout(() => {
          stopAndSubmit();
        }, 30000);

      } catch (error) {
        console.error("Error starting recognition:", error);
      }
    } else {
      alert("Voice recognition is not supported in this browser. Please use Chrome or Edge.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (maxDurationTimerRef.current) clearTimeout(maxDurationTimerRef.current);
  };

  const stopAndSubmit = () => {
    stopRecording();
    // Small delay to ensure recognition stops cleanly before submitting
    setTimeout(() => {
        handleSubmit(latestTranscriptRef.current);
    }, 500);
  };

  const handleSubmit = async (textToSubmit?: string) => {
    const text = textToSubmit || transcript;
    if (!text) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/voice-nlp/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, language: language }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze voice log");
      }

      const data = await response.json();
      
      if (onRecordingComplete) {
        onRecordingComplete(data);
      }
      
      setTranscript("");
      latestTranscriptRef.current = "";
    } catch (error) {
      console.error("Error submitting log:", error);
      alert("Failed to submit log. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <div className="mb-4">
          <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isRecording || isSubmitting}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-colors duration-300 ${
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
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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

      {transcript && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Transcript:</h4>
          <p className="text-gray-900">{transcript}</p>
        </div>
      )}

      {transcript && !isRecording && (
        <div className="flex justify-center">
          <button
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Send className="mr-2 h-5 w-5" />
            )}
            {isSubmitting ? "Analyzing..." : "Submit Log"}
          </button>
        </div>
      )}
    </div>
  );
}
