# 1. Para el frontend usamos Nginx, un servidor web de alto rendimiento y bajo consumo
FROM nginx:alpine

# 2. Copiamos nuestro archivo HTML al directorio donde Nginx busca contenido para servir
# Reemplazamos el archivo por defecto de Nginx por el nuestro
COPY index.html /usr/share/nginx/html/index.html

# 3. Nginx por defecto corre en el puerto 80 (el estándar para tráfico web HTTP)
EXPOSE 80

# Nota: Nginx arranca automáticamente al iniciar el contenedor, 
# por lo que no es estrictamente necesario poner un CMD aquí.