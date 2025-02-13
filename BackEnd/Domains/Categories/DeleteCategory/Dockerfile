# Imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto definido en .env (por defecto 5000)
EXPOSE 5000

# Comando para ejecutar el servidor
CMD ["node", "src/server.js"]
