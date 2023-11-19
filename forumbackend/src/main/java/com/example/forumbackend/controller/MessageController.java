package com.example.forumbackend.controller;


import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Message;
import com.example.forumbackend.service.ForumUserService;
import com.example.forumbackend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Date;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private ForumUserService forumUserService;

    @GetMapping("/get-messages")
    private ResponseEntity<?> getMessages (@AuthenticationPrincipal ForumUser forumUser){
        List<Message> messages = messageService.getMessagesForReceiver(forumUser);

        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send-message")
    public ResponseEntity<?> createMessage(@RequestBody Map<String, Object> req, @AuthenticationPrincipal ForumUser forumUser){
        Long receiverId = Long.valueOf(String.valueOf(req.get("receiverId")));
        String message = (String) req.get("message");
        String link = (String) req.get("topicLink");
        Message messageToSave = new Message(link, message);
        messageToSave.setDate(new Date());
        messageToSave.setSender(forumUser);
        messageToSave.setReceiver(forumUserService.findById(receiverId));
        messageService.createMessage(messageToSave);

        return ResponseEntity.ok(null);
    }
}
