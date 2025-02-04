# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos esenciales primero
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que correrá GraphQL Gateway
EXPOSE 80

# Comando para iniciar el servicio
CMD ["node", "src/server.js"]
