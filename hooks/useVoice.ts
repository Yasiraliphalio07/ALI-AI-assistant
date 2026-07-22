'use client';
import { useState, useCallback, useEffect } from 'react';
export function useVoice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SR);
  }, []);
  const startListening = useCallback(() => {
    if (!isSupported) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const r = new SR();
    r.onstart = () => setIsListening(true);
    r.onresult = (e: any) => {
      let t = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) t += e.results[i][0].transcript;
      }
      if (t) setTranscript(t);
    };
    r.onend = () => setIsListening(false);
    r.start();
  }, [isSupported]);
  return { transcript, isListening, isSupported, startListening };
}