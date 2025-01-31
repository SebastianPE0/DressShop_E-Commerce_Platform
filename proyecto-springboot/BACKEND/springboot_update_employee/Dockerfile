# Usa una imagen base con OpenJDK 21
FROM eclipse-temurin:21-jdk-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo JAR del microservicio al contenedor
COPY target/springboot_update_employee-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto en el que corre la aplicación (ajústalo según tu configuración)
EXPOSE 8092

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
