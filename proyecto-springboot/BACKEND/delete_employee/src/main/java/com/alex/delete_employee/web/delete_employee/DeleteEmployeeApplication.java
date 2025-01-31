package com.alex.delete_employee.web.delete_employee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class DeleteEmployeeApplication {

	public static void main(String[] args) {
		    // Cargar variables de entorno desde el archivo .env
			Dotenv dotenv = Dotenv.load();
			System.setProperty("DB_URL", dotenv.get("DB_URL"));
			System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
			System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		SpringApplication.run(DeleteEmployeeApplication.class, args);
	}

}
