import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core'
import { ChattingService } from '../../chatting.service';
@Component({
  selector: 'chat-input',
  template: `
    <textarea type="text" class="chat-input-text" placeholder="Type message..."
              #message (keydown.enter)="onSubmit()" id="chattingInput" (keyup.enter)="message.value = ''" (keyup.escape)="dismiss.emit()"></textarea>
    <button type="submit" class="chat-input-submit" (click)="onSubmit()">
      {{buttonText}}
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {
  @Input() public buttonText = '↩︎'
  @Input() public focus = new EventEmitter()
  @Output() public send = new EventEmitter()
  @Output() public dismiss = new EventEmitter()
  @ViewChild('message', { static: true }) message: ElementRef

  constructor(public chattingService: ChattingService) {}

  ngOnInit() {
    this.focus.subscribe(() => this.focusMessage())
    this.chattingService.updateEvent.subscribe(value => {
      this.message.nativeElement.value = value
    })
  }

  public focusMessage() {
    this.message.nativeElement.focus()
  }

  public getMessage() {
    return this.message.nativeElement.value
  }

  public clearMessage() {
    this.message.nativeElement.value = ''
  }

  onSubmit() {
    const message = this.getMessage()
    if (message.trim() === '') {
      return
    }
    this.send.emit({ message })
    this.clearMessage()
    this.focusMessage()
  }

}
