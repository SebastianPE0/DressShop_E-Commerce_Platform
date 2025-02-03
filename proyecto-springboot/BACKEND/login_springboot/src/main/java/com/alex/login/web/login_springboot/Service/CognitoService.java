package com.alex.login.web.login_springboot.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import java.util.Base64;



@Service
public class CognitoService {
    private final String userPoolId;
    private final String clientId;
    private final String clientSecret;
    private final CognitoIdentityProviderClient cognitoClient;

    public CognitoService(
            @Value("${aws.cognito.user-pool-id}") String userPoolId,
            @Value("${aws.cognito.client-id}") String clientId,
            @Value("${aws.cognito.client-secret}") String clientSecret,
            CognitoIdentityProviderClient cognitoClient) {
        this.userPoolId = userPoolId;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.cognitoClient = cognitoClient;
    }

    // Registro de usuario con manejo de errores
    public String signUp(String email, String password) {
        try {
            SignUpRequest request = SignUpRequest.builder()
                    .clientId(clientId)
                    .username(email)
                    .password(password)
                    .userAttributes(
                            AttributeType.builder().name("email").value(email).build()
                    )
                    .secretHash(calculateSecretHash(email)) // Agregar SECRET_HASH al registro
                    .build();

            cognitoClient.signUp(request);
            return "Usuario registrado correctamente!";
        } catch (CognitoIdentityProviderException e) {
            System.err.println("Error en el registro: " + e.awsErrorDetails().errorMessage());
            throw new RuntimeException("Error en el registro: " + e.awsErrorDetails().errorMessage());
        }
    }

    // Autenticación de usuario con SECRET_HASH y manejo de errores
    public String login(String email, String password) {
        try {
            InitiateAuthRequest request = InitiateAuthRequest.builder()
                    .clientId(clientId)
                    .authFlow(AuthFlowType.USER_PASSWORD_AUTH)
                    .authParameters(Map.of(
                            "USERNAME", email,
                            "PASSWORD", password,
                            "SECRET_HASH", calculateSecretHash(email)  // Se agrega el SECRET_HASH
                    ))
                    .build();

            InitiateAuthResponse response = cognitoClient.initiateAuth(request);
            return response.authenticationResult().idToken();
        } catch (CognitoIdentityProviderException e) {
            throw new RuntimeException("Error en autenticación Cognito: " + e.awsErrorDetails().errorMessage());
        }
    }

    // Método para calcular el SECRET_HASH
    private String calculateSecretHash(String username) {
        try {
            String message = username + clientId;
            SecretKeySpec signingKey = new SecretKeySpec(clientSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Error al calcular SECRET_HASH", e);
        }
    }
}
