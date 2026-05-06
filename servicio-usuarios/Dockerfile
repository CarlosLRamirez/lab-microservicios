# 1. Definimos la imagen base: una versión ligera de Node.js sobre Alpine Linux
FROM node:18-alpine

# 2. Creamos y nos movemos a la carpeta /app dentro del contenedor
WORKDIR /app

# 3. Copiamos solo el manifiesto de dependencias primero
# Esto permite que Docker guarde en caché el 'npm install' si no hay cambios aquí
COPY package.json .

# 4. Instalamos las librerías necesarias (Express y CORS)
RUN npm install

# 5. Copiamos el resto del código fuente (index.js) al contenedor
COPY index.js .

# 6. Informamos que el contenedor escuchará en el puerto 3000 (documentación)
EXPOSE 3000

# 7. Comando principal para arrancar el microservicio al iniciar el contenedor
CMD ["node", "index.js"]