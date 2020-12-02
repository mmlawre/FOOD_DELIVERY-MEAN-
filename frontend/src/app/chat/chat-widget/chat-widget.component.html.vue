<template>
  <div>
    <div class="wrapper {{theme}}">
      <br />
      <div class="chat-box" *ngif="visible" [@fadeinout]="visible">
        <div class="chat-box-header" style="height: 40px;">
          <!-- <div class="">
        <div class="operator-status">
          {{operator.status}}
          <span class="operator-status-online">●</span>
          <button class="chat-button-header" (click)="toggleChat()">✕</button>
        </div>
        <chat-avatar [image]="operator.avatar"></chat-avatar>
        <h3 class="operator-name">
          {{operator.name}}
        </h3>
      </div> -->
        </div>
        <div class="chat-box-main">
          <div class="chat-message-bottom" #bottom=""></div>
          <ng-container *ngfor="let message of messages">
            <div
              class="chat-message"
              [class.chat-message-received]="message.type === 'received'"
              [@fadein]=""
              [class.chat-message-sent]="message.type === 'sent'"
            >
              <div>
                <chat-avatar
                  [image]="message.from.avatar"
                  class="chat-message-from-avatar"
                ></chat-avatar>
                <div
                  class="chat-message-from-avatar-user"
                  style="color:#999999;margin:5px; font-size:12px;"
                >
                  {{ message.from.name }}
                </div>

                <!-- <div class="chat-message-text" (contextmenu)="onrightClick($event)"> -->
                <div class="chat-message-text">
                  {{ message.text }}
                </div>
                <div class="update-delete">
                  <p (click)="deleteMessage(message.messageID)">Delete</p>
                  <hr style="margin:0;" />
                  <p (click)="updateMessage(message.messageID)">Update</p>
                </div>
              </div>
              <div class="chat-message-date">
                {{message.date | date: 'short'}}
              </div>
            </div>
            <!-- <div *ngIf="contextmenu">
          <app-context-menu [x]="contextmenuX" [y]="contextmenuY"></app-context-menu>
        </div> -->
          </ng-container>
        </div>
        <div class="chat-box-footer">
          <chat-input
            (send)="sendMessage($event)"
            [update_message]="current_message"
            (dismiss)="toggleChat()"
            [focus]="focus"
          ></chat-input>
        </div>
      </div>
      <button class="chat-button" (click)="toggleChat()">
        <span [@fadein]="" *ngif="visible">✕</span>
        <span [@fadein]="" *ngif="!visible">?</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
