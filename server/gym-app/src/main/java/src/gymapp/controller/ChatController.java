package src.gymapp.controller;

import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import src.gymapp.model.ChatMessage;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendPrivateMessage(ChatMessage message) {
        String receiver = message.getReceiver();
        messagingTemplate.convertAndSendToUser(receiver, "/queue/messages", message);
    }

    @MessageMapping("/chat.addUser")
    public void addUser(ChatMessage message, SimpMessageHeaderAccessor accessor) {
        accessor.getSessionAttributes().put("username", message.getSender());
    }
}
