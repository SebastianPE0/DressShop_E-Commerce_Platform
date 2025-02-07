# Usa una imagen base con OpenJDK 21
FROM eclipse-temurin:21-jdk-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

COPY .env .env
COPY target/*.jar app.jar

# Expone el puerto en el que corre la aplicación (ajústalo según tu configuración)
EXPOSE 8094

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
