package com.example.forumbackend.controller;

import com.example.forumbackend.dto.ForumUserResponseDTO;
import com.example.forumbackend.dto.TopicResponseDTO;
import com.example.forumbackend.model.Comment;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import com.example.forumbackend.service.CommentService;
import com.example.forumbackend.service.ForumUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private ForumUserService forumUserService;

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody Map<String, Object> req, @AuthenticationPrincipal ForumUser forumUser ){
        Comment comment = new Comment();
        comment.setAuthor(forumUser);
        comment.setCommentBody((String) req.get("commentReqBody"));
        commentService.addNewComment(comment, Long.valueOf(String.valueOf(req.get("topicReqId"))));

        return ResponseEntity.ok(null);
    }

    @GetMapping("/get-comments-for-topic/{topicId}")
    public ResponseEntity<?> getCommentsForTopic(@PathVariable Long topicId){
        List<Comment> commentList = commentService.getAllByTopic(topicId);

        return ResponseEntity.ok(commentList);
    }

    @PostMapping("/create-reply")
    public ResponseEntity<?> createReply(@RequestBody Map<String, Object> req, @AuthenticationPrincipal ForumUser forumUser ){
        Comment comment = new Comment();
        comment.setAuthor(forumUser);
        comment.setCommentBody((String) req.get("replyReqBody"));
        commentService.addReply(comment, Long.valueOf(String.valueOf(req.get("commentId"))));

        return ResponseEntity.ok(null);
    }

    @GetMapping("/get-comments")
    public ResponseEntity<?> getComments(){
        return ResponseEntity.ok(commentService.getAllCommentsByTopicNotNull());
    }

    @GetMapping("/add-comment-like/{commentId}/{action}")
    public ResponseEntity<?> likeTopic(@AuthenticationPrincipal ForumUser forumUser, @PathVariable Long commentId, @PathVariable String action){
        if(Objects.equals(action, "like"))
            forumUserService.likeComment(forumUser.getId(), commentId);
        else forumUserService.unlikeComment(forumUser.getId(), commentId);

        return ResponseEntity.ok(null);
    }
}
