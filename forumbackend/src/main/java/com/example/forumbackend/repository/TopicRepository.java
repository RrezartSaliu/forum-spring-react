package com.example.forumbackend.repository;

import com.example.forumbackend.model.Category;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long>{
    List<Topic> getAllByAuthor (ForumUser forumUser);
    List<Topic> getAllByCategory (Category category);
    List<Topic> getAllByCategoryOrderByLikes (Category category);
    List<Topic> getAllByCategoryOrderByCreationDate (Category category);
    Page<Topic> findAllByAuthorOrderByCreationDateDesc (ForumUser forumUser, Pageable pageable);
}
