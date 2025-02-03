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
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequestMapping("api/v1/employee")

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @PostMapping(path="/add")
    public String saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        String id = employeeService.addEmployee(employeeDTO);
        
        return id;
    }
    /*@GetMapping("/getByEmail/{email}")
    public ResponseEntity<EmployeeDTO> getEmployeeByEmail(@PathVariable String email) {
        EmployeeDTO employee = employeeService.getEmployeeByEmail(email);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/

    
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO) {
        //TODO: process POST request
        LoginResponse loginResponse = employeeService.loginEmployee(loginDTO);
        
        return ResponseEntity.ok(loginResponse);
    }
       // Endpoint para manejar solicitudes OPTIONS (Evita errores CORS)
       @RequestMapping(method = RequestMethod.OPTIONS)
       public ResponseEntity<?> handleOptions() {
           return ResponseEntity.ok().build();
       }



}
