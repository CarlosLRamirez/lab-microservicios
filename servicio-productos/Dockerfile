# 1. Usamos la misma base ligera de Node.js
FROM node:18-alpine

# 2. Establecemos el directorio de trabajo
WORKDIR /app

# 3. Copiamos el package.json para aprovechar la caché de capas de Docker
COPY package.json .

# 4. Instalamos dependencias
RUN npm install

# 5. Copiamos el archivo de lógica del microservicio
COPY index.js .

# 6. Este servicio está configurado para el puerto 3001
EXPOSE 3001

# 7. Ejecutamos la aplicación
CMD ["node", "index.js"]