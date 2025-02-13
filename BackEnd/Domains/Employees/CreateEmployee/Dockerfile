# Usa una imagen base con OpenJDK 21
# Usar una imagen ligera de OpenJDK
FROM eclipse-temurin:21-jdk-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app
COPY .env .env

# Copia el Agente de APM Insight y su configuración
COPY apminsight-javaagent.jar /app/apminsight-javaagent.jar
COPY apminsight.conf /app/apminsight.conf
# Copia solo el archivo JAR (asegura que el JAR ya esté generado antes de construir la imagen)
COPY target/*.jar app.jar

# Expone el puerto en el que corre la aplicación (ajústalo según tu configuración)
EXPOSE 8090



# Configura la variable de entorno con la ruta del agente
ENV JAVA_TOOL_OPTIONS="-javaagent:/app/apminsight-javaagent.jar"
# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]