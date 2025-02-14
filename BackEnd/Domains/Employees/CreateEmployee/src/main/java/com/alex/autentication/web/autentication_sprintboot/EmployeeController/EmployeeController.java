package com.alex.autentication.web.autentication_sprintboot.EmployeeController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.alex.autentication.web.autentication_sprintboot.Dto.EmployeeDTO;
import com.alex.autentication.web.autentication_sprintboot.Dto.LoginDTO;
import com.alex.autentication.web.autentication_sprintboot.Service.EmployeeService;
import com.alex.autentication.web.autentication_sprintboot.response.LoginResponse;


@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://3.214.134.68"
})

@RequestMapping("api/v1/employee")

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(path="/add")
    public ResponseEntity<?> saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            String id = employeeService.addEmployee(employeeDTO);
            return ResponseEntity.ok().body(new SuccessResponse("Empleado creado con éxito", id));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ErrorResponse("Error al crear empleado", e.getMessage()));
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO) {
        try {
            LoginResponse loginResponse = employeeService.loginEmployee(loginDTO);
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ErrorResponse("Error en login", e.getMessage()));
        }
    }

    // Endpoint para manejar solicitudes OPTIONS (Evita errores CORS)
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }
}

// Clase para respuestas de éxito
class SuccessResponse {
    private String message;
    private String details;

    public SuccessResponse(String message, String details) {
        this.message = message;
        this.details = details;
    }

    public String getMessage() { return message; }
    public String getDetails() { return details; }
}

// Clase para manejar respuestas de error
class ErrorResponse {
    private String error;
    private String message;

    public ErrorResponse(String error, String message) {
        this.error = error;
        this.message = message;
    }

    public String getError() { return error; }
    public String getMessage() { return message; }
}