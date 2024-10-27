FROM node:20-alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build

RUN chown -R nonroot:nonroot /app

USER nonroot

EXPOSE 8080

CMD ["npm", "run", "preview"]
