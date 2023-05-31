package com.javabackend.javabackend.controllers;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.javabackend.javabackend.models.Users;
import com.javabackend.javabackend.services.AuthServices;




@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthControllers {

    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    @Autowired
    private AuthServices userService;
    

    @GetMapping("/test")
    public List<Users> test(){
        return userService.getAllUsers();
    }
    @DeleteMapping("/deleteById/{Id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable String Id) {
        userService.deleteById(Id);
    }

    @DeleteMapping("/deleteAll")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAll(){
        userService.deleteAll();
    }
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Users registerUser(@RequestBody Users user){
        Users checkUserAvailable = userService.checkUserAvailable(user.getUsername());
        if( checkUserAvailable != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already taken");
        }
        userService.registerUser(user);
        
        return user;
    }
    @PostMapping ("/auth")
    public Users authenticateUser(@RequestBody Users user){
        
        
        Users stUser = userService.checkUserAvailable(user.getUsername());
        
        if(stUser == null){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        Boolean isPasswordCorrect = bcrypt.matches(user.getPassword(), stUser.getPassword());
        if(!isPasswordCorrect){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
       
        stUser.setEmail(null);
        stUser.setPassword(null);
        return stUser;
       

    }


}
