package main 
import(
	“context”
	“github.com/SebastianPE0/DressShop_E-commerce_Platform/awsgo”
	“github.com/SebastianPE0/DressShop_E-commerce_Platform/models”
	“github.com/aws/aws-lambda-go/events”
	Lambda “github.com/aws/aws-lambda-go/lambda”
)
Func main(){
	lambda.Start(EjecutoLambda)
}
Func EjecutoLambda(ctx context.Context, evento events.CognitoEventUserPools.PostConfirmation)(events.CognitoEventUserPoolsPostConfirmation, error){awsgo.InicializoAws()
	if ¡ ValidoParametros(){
		fmt.PrintLn(“Error en los parámetros. Debe enviar `SecretName`”)
		err:= errors.New(“error en los parámetros, debe enviar SecretName”)
		return even, err
	}
}
Func ValidoParametros() bool{
	Var traeParametro bool
	_, traeParametro = os.LookupEnv(“SecretName”)
	return traeParametro
}
