package main

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/SebastianPE0/DressShop_E-commerce_Platform/awsgo"
	"github.com/aws/aws-lambda-go/events"
	lambda "github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(EjecutoLambda)
}

func EjecutoLambda(ctx context.Context, event events.CognitoEventUserPoolsPostConfirmation) (events.CognitoEventUserPoolsPostConfirmation, error) {
	awsgo.InicializoAws()
	if !ValidoParametros() {

		fmt.Println("Error en los parámetros. Debe enviar `SecretName`")
		err := errors.New("error en los parámetros, debe enviar SecretName")
		return event, err
	}
}

func ValidoParametros() bool {
	var traeParametro bool
	_, traeParametro = os.LookupEnv("SecretName")
	return traeParametro
}
