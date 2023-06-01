package com.javabackend.javabackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.javabackend.javabackend.models.Moments;
import com.javabackend.javabackend.repositories.MongoMmemoryRepositroy;

@Service
public class MemoryServices {
    private MongoMmemoryRepositroy memoryRepo;
    MemoryServices(MongoMmemoryRepositroy memoryRepo){
        this.memoryRepo = memoryRepo;
    }
    @Autowired
    MongoTemplate mongoTemplate ;
    public List<Moments> getAllMemories() {
        return memoryRepo.findAll();
    }
    public void createMoment(Moments moment){
        memoryRepo.save(moment);
    }
    public Moments getMomentById(String Id) {
        return memoryRepo.findById(Id).orElseThrow();
    }
    public void deleteAll() {
         memoryRepo.deleteAll();
    }
    public void deleteById(String id) {
        memoryRepo.deleteById(id);
    }
    public void updateMoment(Moments moment){
       memoryRepo.save(moment);
    }

    public List<Moments> getMomentByTag(String tag) {
        Query query= new Query();
        query.addCriteria(Criteria.where("tag").is(tag));

        return mongoTemplate.find(query, Moments.class);
    }
}
