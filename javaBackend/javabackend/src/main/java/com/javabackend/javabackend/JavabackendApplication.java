package com.javabackend.javabackend;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)

public class JavabackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavabackendApplication.class, args);
	}

}
