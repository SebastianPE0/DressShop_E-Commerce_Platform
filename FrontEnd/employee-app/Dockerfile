# Usamos la imagen de Node.js para construir la aplicación
FROM node:20 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el resto de los archivos
COPY . .

# Construimos la aplicación
RUN npm run build

# ---- Producción ----
FROM nginx:alpine

# Copiamos los archivos de la carpeta build generada por Vite al servidor web Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 para el contenedor
EXPOSE 80

# Iniciamos el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
