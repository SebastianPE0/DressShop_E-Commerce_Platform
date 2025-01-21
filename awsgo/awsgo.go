awsgo.go
	package awsgo
	import{
		“context”
		“go get github.com/aws/aws-sdk-go-v2/aws”
		“go get github.com/aws/aws-sdk-go-v2/config”
	}
Var Ctx context.Context
Var Cfg aws.Config.
Var err error

Func InicializoAWS{
	Ctx = context.TODO()
	Cfg, err = config.LoadDefaultConfig(Ctx, config.WithDefaultRegion(“us-east-1”))

	If err !) nil{
		panic(“Error al cargar la configuración .aws/config “+err.Error())
	}
}
go get github.com/aws/aws-lambda-go/lamda
go get github.com/aws/aws-lambda-go/events
go get github.com/aws/aws-sdk-go-v2/aws
go get github.com/aws/aws-sdk-go-v2/config
