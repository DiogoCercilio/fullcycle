##### API
FROM node:16 as APISBUILD
WORKDIR /src/app
COPY ./api/package*.json .
RUN npm install
COPY ./api .
RUN npx prisma generate 
RUN npx prisma migrate dev 
RUN npm run seed 
RUN npm run build
CMD ["npm", "start"]

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

##### Front
FROM node:18-alpine as PRODUCTION_IMAGE_BUILD
WORKDIR /
COPY ./front .
RUN npm install -g typescript
RUN npm install
RUN npm run build

FROM nginx:1.21.0-alpine as PRODUCTION_IMAGE
ENV NODE_ENV production
COPY --from=PRODUCTION_IMAGE_BUILD ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
