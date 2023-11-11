package com.example.forumbackend.model.exceptions;

public class InvalidArgumentsException extends RuntimeException{
    public InvalidArgumentsException(){
        super("Invalid Login arguments exception");
    }
}
