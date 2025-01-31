package com.alex.read_employee.web.read_employee_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ReadEmployeeWebApplication {

	public static void main(String[] args) {
			Dotenv dotenv = Dotenv.load();
			System.setProperty("DB_URL", dotenv.get("DB_URL"));
			System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
			System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		SpringApplication.run(ReadEmployeeWebApplication.class, args);
	}

}
