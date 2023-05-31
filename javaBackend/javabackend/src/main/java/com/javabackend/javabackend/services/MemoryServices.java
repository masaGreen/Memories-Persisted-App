package com.javabackend.javabackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.javabackend.javabackend.models.Moments;
import com.javabackend.javabackend.repositories.MongoMmemoryRepositroy;

@Service
public class MemoryServices {
    private MongoMmemoryRepositroy memoryRepo;
    MemoryServices(MongoMmemoryRepositroy memoryRepo){
        this.memoryRepo = memoryRepo;
    }
    public List<Moments> getAllMemories() {
        return memoryRepo.findAll();
    }

}
