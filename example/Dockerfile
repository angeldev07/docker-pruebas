FROM node:20.12.2-alpine AS build

# Creo qeu directorio de trabajo
WORKDIR /app

# copio el package.json de las dependencias
COPY package*.json .

# instalo las dependencias 
RUN npm install 

# copio los archivos
COPY . .

RUN npm run build --prod

# Desplegamos nginx
FROM nginx

COPY  --from=build /app/dist/example/browser /usr/share/nginx/html
COPY  --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
