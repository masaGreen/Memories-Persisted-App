package com.javabackend.javabackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javabackend.javabackend.models.Moments;

import com.javabackend.javabackend.services.MemoryServices;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class MemoriesControllers {
    @Autowired
    private MemoryServices memoryServices;

    @GetMapping("/")
    public List<Moments> getAllMemories(){
      return memoryServices.getAllMemories();
    }
}
