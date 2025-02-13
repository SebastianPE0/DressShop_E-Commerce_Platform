# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto 5000 (o el que uses)
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
