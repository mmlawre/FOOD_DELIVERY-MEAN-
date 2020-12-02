import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, NgModule } from '@angular/core'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import {io}  from 'socket.io-client'
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ChattingService } from '../../chatting.service';
import { FormsModule } from '@angular/forms'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
const SOCKET_ENDPOINT = 'http://localhost:3000';

// const getRandomMessage = () => randomMessages[rand(randomMessages.length)]

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn]
})
@Injectable()
export class ChatWidgetComponent implements OnInit {
  socket;
  message: string;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  user_name = 'Client';
  update_flag=false;
  update_message_id = -1;
  current_message = ''
  loaded_message_datas;
  userID: any;

  constructor(public chattingService: ChattingService) {
    this.socket = io(SOCKET_ENDPOINT);
    this.userID = localStorage.getItem('currentUserID')
  }

  @ViewChild('bottom') bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'
  @NgModule({
    imports: [
      FormsModule
    ],
  })
  public _visible = true

  public get visible() {
    return this._visible
  }
  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new Subject()

  public operator = {
    name: 'Client',
    status: 'online',
    avatar: `../../assets/user_avatar/me.jpg`,
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `../../assets/user_avatar/client.svg`,
  }

  public messages = []

  public addMessage(message) {
    let text = message.message
    let messageID = message.messageID
    let date = message.date
    let type: string;
    let from: any;
    if (message.sender=='user') {
       from={
        name: 'Me',
        status: 'online',
        avatar: this.operator.avatar
      }
      type='sent'
      // var id = text.id
      this.messages.unshift({
        messageID,
        from,
        text,
        type,
        date,
      })
    }
    else {
      type='received'
      from={
        name: "support",
        status: 'online',
        avatar: this.client.avatar
      }
      this.messages.unshift({
        messageID,
        from,
        text,
        type,
        date,
      })
    }
    this.scrollToBottom()
  }
  public showHistoryMessage() {
    let history = this.loaded_message_datas
    this.messages = [];
    for (let i = 0; i < history.datas.length; i++) {
      this.addMessage(history.datas[i])
    }
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

   /**
   * @ socket connection part
   */
  setupSocketConnection() {
    this.messages.length =0;
    // ---------------received message from other client------------------------------
    this.socket.on('reply-message', (data) => {
      this.addMessage(data.receive_message);
    });

    // ---------------load history from server------------------------------
    this.socket.on('history', (data: object) => {
      this.loaded_message_datas = data
      this.showHistoryMessage()
    });
    // -------------------delete_message_item------------------------------
    this.socket.on('delete_message_item', (messageID: String) => {
     this.deleteMessageId(messageID)
    });

    // -------------------update_message_item------------------------------
    this.socket.on('update_message_item', (update_data: Object) => {
      this.updateMessageOtherClients(update_data)
     });

    this.socket.emit('get_history');
  }
  /**
   * @ updateMessage to Other Clients
   */
  updateMessageOtherClients(update_data){
    for(var i=0; i<this.messages.length; i++){
      if(this.messages[i].messageID === update_data.messageID){
        this.messages[i].text = update_data.message
      }
    }
  }
   /**
   * @ event function when user delete dropdown menu
   */
  deleteMessageId(messageID){
    for(var i=0; i<this.messages.length; i++){
      if(this.messages[i].messageID === messageID){
        this.messages.splice(i,1)
      }
    }
  }
  /**
   * @ event function when user update dropdown menu
   */
  updateMessage(messageID){
    this.update_message_id = messageID;
    for(var i=0; i<this.messages.length; i++){
      if(this.messages[i].messageID === messageID){
        this.update_flag = true
        this.current_message = this.messages[i].text
        this.chattingService.setMessage(this.current_message);
      }
    }
  }

  onrightClick(event) {
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
  }

  ngOnInit() {
    this.userID = localStorage.getItem('currentUserID')
    this.setupSocketConnection();
  }

  public toggleChat() {
    this.visible = !this.visible
  }
  /**
   * @ send message to other clients
   */
  public sendMessage({ message }) {

    if(this.update_flag === false) {
      let date= new Date().getTime();
      let messageID = this.userID+date;
      let sendMessage = {message: message, date: date,  userID: this.userID, sender: 'user', messageID: messageID}
      this.socket.emit('new-message', sendMessage);
      this.addMessage(sendMessage);
      this.scrollToBottom();
    }
    else{
      for(var i=0; i<this.messages.length; i++){
        if(this.messages[i].messageID === this.update_message_id){
          this.messages[i].text = message
          var update_data={messageID: this.update_message_id, message: message}
          this.socket.emit('update-message',update_data)
          this.update_flag = false;
        }
      }
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

  /**
   * @ delete message of other clients
   */
  public deleteMessage(delete_message_id) {
    for(var i=0;i<this.messages.length; i++){
      if(delete_message_id === this.messages[i].messageID){
        this.messages.splice(i,1);
        // this.socket = io(SOCKET_ENDPOINT);
        this.socket.emit('delete', delete_message_id);
      }
    }
  }
}
