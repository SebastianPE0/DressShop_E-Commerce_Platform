package com.alex.autentication.web.autentication_sprintboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class AutenticationSprintbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutenticationSprintbootApplication.class, args);
	}

}
