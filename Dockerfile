# Stage 1
FROM node:14-alpine as builder

COPY package.json package-lock.json ./

RUN npm install --silent

RUN mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4201

CMD ["npm", "start"]


# RUN mkdir -p /app
# WORKDIR /app
# COPY . .
# RUN npm run build --prod
# RUN npm run ng build -- --output-path=dist --base-href /bo/

# Stage 2
# FROM nginx:1.14.1-alpine
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /ng-app/dist /usr/share/nginx/html/bo
# EXPOSE 4000
# CMD ["nginx", "-g"]