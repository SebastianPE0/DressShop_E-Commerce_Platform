# Usa una imagen base con OpenJDK 21
FROM eclipse-temurin:21-jdk-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app
COPY .env .env

# Copia el Agente de APM Insight y su configuración
COPY apminsight-javaagent.jar /app/apminsight-javaagent.jar
COPY apminsight.conf /app/apminsight.conf
# Copia el archivo JAR del microservicio al contenedor
COPY target/*.jar /app/app.jar

# Expone el puerto en el que corre la aplicación (ajústalo según tu configuración)
EXPOSE 8091

# Configura la variable de entorno con la ruta del agente
ENV JAVA_TOOL_OPTIONS="-javaagent:/app/apminsight-javaagent.jar"
# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]