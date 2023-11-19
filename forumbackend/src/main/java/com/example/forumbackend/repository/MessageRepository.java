package com.example.forumbackend.repository;

import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByReceiver(ForumUser forumUser);
}
