# Dockerfile simple pour servir du contenu statique
FROM nginx:alpine

# Copier les fichiers statiques
COPY . /usr/share/nginx/html/

# Port
EXPOSE 80

# Nginx démarre automatiquement
