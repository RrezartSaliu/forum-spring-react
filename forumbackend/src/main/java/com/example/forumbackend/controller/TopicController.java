package com.example.forumbackend.controller;

import com.example.forumbackend.dto.ForumUserResponseDTO;
import com.example.forumbackend.dto.TopicResponseDTO;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import com.example.forumbackend.service.ForumUserService;
import com.example.forumbackend.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import java.util.Date;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/topic")
public class TopicController {
    @Autowired
    private TopicService topicService;
    @Autowired
    private ForumUserService forumUserService;

    @PostMapping("/create")
    public ResponseEntity<?> createTopic(@AuthenticationPrincipal ForumUser forumUser, @RequestBody Topic topic){
        Topic topic1 = new Topic();
        topic1.setBody(topic.getBody());
        topic1.setTitle(topic.getTitle());
        topic1.setLikes(0);
        topic1.setCreationDate(new Date());
        topicService.addNewTopic(topic1, forumUser);

        ForumUserResponseDTO forumUserResponse = new ForumUserResponseDTO(
                forumUser.getId(),
                forumUser.getFirstName(),
                forumUser.getLastName(),
                forumUser.getEmailAddress(),
                forumUser.getDateOfBirth(),
                forumUser.getFriends()
        );

        TopicResponseDTO topicResponse = new TopicResponseDTO(
                topic1.getId(),
                topic1.getTitle(),
                topic1.getBody(),
                forumUserResponse,
                0,
                new Date()
        );

        return ResponseEntity.ok(topicResponse);
    }

    @GetMapping("user-topics")
    public ResponseEntity<?> getUserTopics(@AuthenticationPrincipal ForumUser forumUser){
        List<Topic> topicsForUser = topicService.getAllByForumUser(forumUser);
        List<TopicResponseDTO> topicsForUserDTO = new ArrayList<>();
        for (Topic topic: topicsForUser){
            topicsForUserDTO.add(new TopicResponseDTO(
                    topic.getId(),
                    topic.getTitle(),
                    topic.getBody(),
                    new ForumUserResponseDTO(forumUser.getId(),forumUser.getFirstName(), forumUser.getLastName(), forumUser.getEmailAddress(), forumUser.getDateOfBirth(), forumUser.getFriends()),
                    topic.getLikes(),
                    topic.getCreationDate()
            ));
        }

        return ResponseEntity.ok(topicsForUserDTO);
    }

    @GetMapping("/{topicId}")
    public ResponseEntity<?> getTopicDetails(@PathVariable Long topicId, @AuthenticationPrincipal ForumUser forumUser){
        Topic topic = topicService.findById(topicId);
        TopicResponseDTO topicResponseDTO = new TopicResponseDTO(topic.getId(), topic.getTitle(), topic.getBody(),
                new ForumUserResponseDTO(topic.getAuthor().getId(), topic.getAuthor().getFirstName(), topic.getAuthor().getLastName(), topic.getAuthor().getEmailAddress(), topic.getAuthor().getDateOfBirth(), topic.getAuthor().getFriends()),
                topic.getLikes(),topic.getCreationDate()
                );

        return ResponseEntity.ok(topicResponseDTO);
    }

    @PostMapping("/edit-topic")
    public ResponseEntity<?> updateTopic(@AuthenticationPrincipal ForumUser forumUser, @RequestBody Topic topic){
        if(!Objects.equals(forumUser.getId(), topicService.findById(topic.getId()).getAuthor().getId())){
            return ResponseEntity.badRequest().build();
        }
        else{
            topicService.updateTopic(topic.getId(), topic.getTitle(), topic.getBody());
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/add-topic-like/{topicId}/{action}")
    public ResponseEntity<?> likeTopic(@AuthenticationPrincipal ForumUser forumUser, @PathVariable Long topicId, @PathVariable String action){
        if(Objects.equals(action, "like"))
            forumUserService.likeTopic(forumUser.getId(), topicId);
        else forumUserService.unlikeTopic(forumUser.getId(), topicId);

        return ResponseEntity.ok(null);
    }

}
