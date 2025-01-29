package com.alex.login.web.login_springboot.LoginController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alex.login.web.login_springboot.Dto.LoginDTO;
import com.alex.login.web.login_springboot.Response.LoginResponse;
import com.alex.login.web.login_springboot.Service.ILoginService;


@RestController
@CrossOrigin
@RequestMapping("api/v1/auth")
public class LoginController {

       @Autowired
    private ILoginService loginService;

    @PostMapping(path = "/login2")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO) {
        // Procesa la solicitud de inicio de sesión
        LoginResponse loginResponse = loginService.loginEmployee(loginDTO);

        return ResponseEntity.ok(loginResponse);
    }
}
