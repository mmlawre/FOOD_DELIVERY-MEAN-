import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { ChatConfigComponent } from './chat-config/chat-config.component';
import { ContextMenuComponent } from './context-menu/context-menu.component'

@NgModule({
  imports: [CommonModule],
  declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent, ContextMenuComponent],
  exports: [ChatWidgetComponent, ChatConfigComponent],
  entryComponents: [ChatWidgetComponent, ChatConfigComponent],
})
export class ChatModule {}
