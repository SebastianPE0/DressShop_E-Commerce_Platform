package com.alex.login.web.login_springboot.Config;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;

public class CognitoLogoutHandler extends SimpleUrlLogoutSuccessHandler {
    /**
     * The domain of yours user pools.
     */
    private String domain = "https://us-east-1judmxeur1.auth.us-east-1.amazoncognito.com";

    /**
     * An allowed callback URL.
     */
    private String logoutRedirectUrl = "<logout uri>";

    /**
     * The ID of your User Pool Client.
     */
    private String userPoolClientId = "92oh9nmejo0d5a5ga51il8u3o";

    /**
     * Here, we must implement the new logout URL request. We define what URL to send our request to, and set out client_id and logout_uri parameters.
     */
    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        return UriComponentsBuilder
                .fromUri(URI.create(domain + "/logout"))
                .queryParam("client_id", userPoolClientId)
                .queryParam("logout_uri", logoutRedirectUrl)
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUriString();
    }
}
