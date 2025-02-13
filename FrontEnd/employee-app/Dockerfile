# ---- Etapa de construcción ----
    FROM node:20 AS build

    WORKDIR /app
    
    # Copiar archivos necesarios y realizar la instalación
    COPY package.json package-lock.json ./
    RUN npm install
    
    # Copiar el resto del código fuente
    COPY . .
    
    # Pasar variables de entorno al build
    ARG REACT_APP_BACKEND_URL_CREATE_CATEGORY
    ARG REACT_APP_BACKEND_URL_READ_CATEGORY
    ARG REACT_APP_BACKEND_URL_DELETE_CATEGORY
    ARG REACT_APP_BACKEND_URL_UPDATE_CATEGORY
    
    ENV REACT_APP_BACKEND_URL_CREATE_CATEGORY=$REACT_APP_BACKEND_URL_CREATE_CATEGORY
    ENV REACT_APP_BACKEND_URL_READ_CATEGORY=$REACT_APP_BACKEND_URL_READ_CATEGORY
    ENV REACT_APP_BACKEND_URL_DELETE_CATEGORY=$REACT_APP_BACKEND_URL_DELETE_CATEGORY
    ENV REACT_APP_BACKEND_URL_UPDATE_CATEGORY=$REACT_APP_BACKEND_URL_UPDATE_CATEGORY
    
    # Construir la aplicación
    RUN npm run build
    
    # ---- Etapa de producción ----
    FROM nginx:alpine
    
    # Copiar los archivos de la build al servidor Nginx
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Exponer el puerto 80 para servir la aplicación
    EXPOSE 80
    
    # Iniciar Nginx en modo foreground
    CMD ["nginx", "-g", "daemon off;"]
    



