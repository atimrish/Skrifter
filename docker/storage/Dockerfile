FROM node:alpine

EXPOSE 8000
WORKDIR /srv

RUN apk add --no-cache poppler-utils

CMD ["npm", "i"]
CMD ["node", "index.js"]