package com.example.forumbackend.service;

import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Message;
import java.util.List;

public interface MessageService {
    List<Message> getMessagesForReceiver(ForumUser forumUser);
    Message createMessage(Message message);
    void readMessage(Long id);
}
