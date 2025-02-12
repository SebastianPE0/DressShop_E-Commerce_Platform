# Usa una imagen base con OpenJDK 21
FROM eclipse-temurin:21-jdk-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app
COPY .env .env
# Copia solo el archivo JAR (asegura que el JAR ya esté generado antes de construir la imagen)
COPY target/*.jar app.jar

# Expone el puerto en el que corre la aplicación (ajústalo según tu configuración)
EXPOSE 8093

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]





