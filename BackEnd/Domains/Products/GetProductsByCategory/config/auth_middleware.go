package config

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/lestrrat-go/jwx/jwk"
)

const cognitoRegion = "us-east-1"
const cognitoUserPoolID = "us-east-1_JudMXeuR1"

var cognitoJWKsURL = fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json", cognitoRegion, cognitoUserPoolID)

// Middleware de autenticación22
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
			c.Abort()
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		token, err := validateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token", "details": err.Error()})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("user", claims["sub"])
		}

		c.Next()
	}
}

// Validación del token
func validateToken(tokenString string) (*jwt.Token, error) {
	jwks, err := jwk.Fetch(context.Background(), cognitoJWKsURL)
	if err != nil {
		return nil, err
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		keyID, ok := token.Header["kid"].(string)
		if !ok {
			return nil, errors.New("no kid found in token header")
		}

		key, found := jwks.LookupKeyID(keyID)
		if !found {
			return nil, errors.New("public key not found")
		}

		var pubKey interface{}
		if err := key.Raw(&pubKey); err != nil {
			return nil, err
		}

		return pubKey, nil
	})

	return token, err
}
