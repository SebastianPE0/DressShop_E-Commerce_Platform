# Imagen base
FROM node:18

# Configurar directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Exponer el puerto
EXPOSE 4000

# Comando de inicio
CMD ["node", "server.js"]