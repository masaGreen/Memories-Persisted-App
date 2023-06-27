package com.javabackend.javabackend.controllers;


import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.javabackend.javabackend.models.Moments;

import com.javabackend.javabackend.services.MemoryServices;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MemoriesControllers {
    private   final String FOLDER_STORE = "C:\\Users\\INTEL\\Desktop\\fullstack\\javaBackend\\javabackend\\src\\main\\resources\\static\\";
    @Autowired
    private MemoryServices memoryServices;

    @GetMapping("")
    public List<Moments> getAllMemories(){
      return memoryServices.getAllMemories();
    }
    @GetMapping("/getmoment/{Id}")
    public Moments getMomentById(@PathVariable String Id){
      return memoryServices.getMomentById(Id);
    }
    @GetMapping("/{tag}")
    public List<Moments> getMomentByTag(@RequestParam String tag){
      System.out.println(tag);
      return memoryServices.getMomentByTag(tag);
    }
    

    @DeleteMapping("/deleteAll")
    public void deleteAll(){
       memoryServices.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
       memoryServices.deleteById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateMoment(@RequestBody Moments moment, @PathVariable String id){
      Moments mn = getMomentById(id);
      if( mn == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
      
      
      mn.setCaption(moment.getCaption());
      mn.setDescription(moment.getDescription());
      mn.setTag(moment.getTag());
      mn.setImage(moment.getImage());

      memoryServices.updateMoment(mn);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createMoment(@RequestBody Moments moment){
      
      if(moment.getImage() == null){
        moment.setImage("");
      }
      
    
      memoryServices.createMoment(moment);

    }
    @PostMapping("/imageupload")
    @ResponseStatus(HttpStatus.CREATED)
    public void uploadFile(@RequestPart("uploadFile") MultipartFile file, @RequestPart("name") String imagePrefix) throws IllegalStateException, IOException{
      file.transferTo(new File(FOLDER_STORE+imagePrefix));

    }
}
