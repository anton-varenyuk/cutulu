import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private synthesis: SpeechSynthesis;
  private voices = [];
  private utterance = new SpeechSynthesisUtterance('KÜtÜlÜ');

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.getVoices();
  }

  public speak(): void {
    this.utterance.voice = this.voices[15];
    this.utterance.pitch = Math.random() * 2;
    console.log(this.utterance.pitch);
    this.utterance.rate = Math.random() * 2;
    this.synthesis.speak(this.utterance);
  }

  public getVoices(): void {
    this.synthesis.onvoiceschanged = () => {
      this.voices = this.synthesis.getVoices();
    };
  }
}

