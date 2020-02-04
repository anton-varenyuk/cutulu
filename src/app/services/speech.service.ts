import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private synthesis: SpeechSynthesis;
  private voices = [];
  private utterance: SpeechSynthesisUtterance;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.getVoices();
  }

  public speak(what: string): void {
    this.utterance = new SpeechSynthesisUtterance(what);
    this.utterance.voice = this.voices[15];
    this.utterance.pitch = 0;
    this.utterance.rate = 2;
    this.synthesis.speak(this.utterance);
  }

  public getVoices(): void {
    this.synthesis.onvoiceschanged = () => {
      this.voices = this.synthesis.getVoices();
    };
  }
}

