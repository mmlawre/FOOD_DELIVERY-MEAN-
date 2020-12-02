import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  updateEvent: EventEmitter<string> = new EventEmitter();
  message = "";
  constructor() {

  }

  public getMessage() {
    return this.message;
  }

  public setMessage(message) {
    this.message = message;
    this.updateEvent.emit(this.message);
    // document.getElementById("chattingInput")
  }
}
