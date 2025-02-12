package config

import (
	"log"

	"github.com/joho/godotenv"
)

// hola
// LoadEnv carga las variables de entorno desde un archivo .env
func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No se pudo cargar el archivo .env, asegurate de configurarlo correctamente")
	}
}
