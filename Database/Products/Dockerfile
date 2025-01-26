FROM mongo:latest

# Copiar el script de inicialización y los datos iniciales a la imagen
COPY init-mongo.sh /docker-entrypoint-initdb.d/init-mongo.sh
COPY products.json /docker-entrypoint-initdb.d/products.json

# Establecer permisos de ejecución para el script
RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh
