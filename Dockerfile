FROM node:14.15.5-alpine as build
# ติดตั้งเครื่องมือที่ใช้สำหรับการติดตั้ง
RUN apk add --no-cache curl python make g++
# ดาวน์โหลดและติดตั้ง n จาก GitHub
RUN curl -L https://github.com/tj/n/archive/v7.0.0.tar.gz | tar zx \
    && mv n-7.0.0/bin/n /usr/local/bin/n \
    && chmod +x /usr/local/bin/n

# กำหนด ENV ของ Node.js เป็นเวอร์ชันที่เหมาะสม
ENV NODE_VERSION 14.15.5

# ใช้ n เพื่อติดตั้ง Node.js เวอร์ชันที่ต้องการ
#RUN n ${NODE_VERSION}
WORKDIR /usr/src/app
COPY package*.json .eslintrc.js .prettierrc tsconfig*.json ./
COPY .env ./
COPY src ./src
COPY config/default.json ./config/default.json
RUN rm -rf node_modules
RUN npm install --save-dev @types/eslint@latest
RUN npm install
RUN npm run build
EXPOSE 3003
CMD ["npm","start"]