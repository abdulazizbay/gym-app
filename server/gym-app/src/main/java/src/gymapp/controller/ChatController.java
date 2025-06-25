    package src.gymapp.controller;

    import lombok.extern.slf4j.Slf4j;
    import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
    import org.springframework.messaging.handler.annotation.MessageMapping;
    import org.springframework.stereotype.Controller;
    import org.springframework.messaging.simp.SimpMessagingTemplate;
    import src.gymapp.model.ChatMessage;
    import java.util.Map;

    import lombok.extern.slf4j.Slf4j;
    import org.springframework.messaging.handler.annotation.MessageMapping;
    import org.springframework.messaging.simp.SimpMessagingTemplate;
    import org.springframework.stereotype.Controller;
    import src.gymapp.model.ChatMessage;

    import lombok.extern.slf4j.Slf4j;
    import org.springframework.messaging.handler.annotation.MessageMapping;
    import org.springframework.messaging.simp.SimpMessagingTemplate;
    import org.springframework.stereotype.Controller;
    import java.util.concurrent.ConcurrentHashMap;

    @Slf4j
    @Controller
    public class ChatController {

        private final SimpMessagingTemplate messagingTemplate;

        private final ConcurrentHashMap<String, String> trainerClientMap = new ConcurrentHashMap<>();

        public ChatController(SimpMessagingTemplate messagingTemplate) {
            this.messagingTemplate = messagingTemplate;
        }

        @MessageMapping("/chat.sendMessage")
        public void sendPrivateMessage(ChatMessage message) {
            log.info("📨 Message from '{}' to '{}': {}", message.getSender(), message.getReceiver(), message.getContent());

            messagingTemplate.convertAndSendToUser(
                    message.getReceiver(),
                    "/queue/messages",
                    message
            );
        }

        @MessageMapping("/chat.addUser")
        public void addUser(ChatMessage message) {
            log.info("✅ User '{}' joined the chat.", message.getSender());

            if (message.getReceiver() == null || message.getReceiver().isEmpty()) {
                log.warn("⚠️ Receiver is null or empty. Skipping notify step.");
                return;
            }

            log.info("🔔 Notifying '{}' that '{}' joined.", message.getReceiver(), message.getSender());

            trainerClientMap.put(message.getReceiver(), message.getSender());

            messagingTemplate.convertAndSendToUser(
                    message.getReceiver(),
                    "/queue/messages",
                    message
            );
        }


        public String getClientForTrainer(String trainerUsername) {
            return trainerClientMap.get(trainerUsername);
        }
    }


