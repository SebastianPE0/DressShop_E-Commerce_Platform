package bd

import (
	"os"

	"github.com/SebastianPE0/DressShop_E-commerce-Platform/models"
	"github.com/SebastianPE0/DressShop_E-commerce-Platform/secretm"
)

var SecretModel models.SecretRDSJson
var err error

func ReadSecret() error {
	SecretModel, err = secretm.GetSecret(os.Getenv("SecretName"))
	return err
}
