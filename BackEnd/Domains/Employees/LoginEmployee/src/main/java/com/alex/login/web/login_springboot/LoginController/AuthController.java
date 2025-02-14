package com.alex.login.web.login_springboot.LoginController;

import com.alex.login.web.login_springboot.Service.CognitoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://3.214.134.68"
})
public class AuthController {
    private final CognitoService cognitoService;

    public AuthController(CognitoService cognitoService) {
        this.cognitoService = cognitoService;
    }
    //hello
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignupRequest request) {
        try {
            String result = cognitoService.signUp(request.getEmail(), request.getPassword());
            return ResponseEntity.ok().body(new SuccessResponse("Usuario registrado con éxito", result));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ErrorResponse("Error en el registro", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = cognitoService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok().body(new AuthResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ErrorResponse("Credenciales incorrectas", e.getMessage()));
        }
    }
}

// Clase para manejar la solicitud de login
class LoginRequest {
    private String email;
    private String password;

    public String getEmail() { return email; }
    public String getPassword() { return password; }
}

// Clase para manejar la solicitud de signup
class SignupRequest {
    private String email;
    private String password;

    public String getEmail() { return email; }
    public String getPassword() { return password; }
}

// Clase para la respuesta de autenticación con token
class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() { return token; }
}

// Clase para respuestas exitosas (ejemplo: registro de usuario)
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

// Clase para manejar respuestas de error con detalles
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
