package com.example.forumbackend.service.Impl;


import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Message;
import com.example.forumbackend.repository.MessageRepository;
import com.example.forumbackend.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Message> getMessagesForReceiver(ForumUser forumUser) {
        return messageRepository.findAllByReceiver(forumUser);
    }

    @Override
    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public void readMessage(Long id) {
        Message message = messageRepository.findById(id).orElseThrow();
        message.setRead(true);
        messageRepository.save(message);
    }
}
