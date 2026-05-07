
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build


FROM node:22-alpine
WORKDIR /app


COPY backend/package*.json ./backend/
RUN cd backend && npm install


COPY backend/ ./backend/


COPY --from=frontend-build /app/frontend/dist ./frontend/dist


EXPOSE 4000


WORKDIR /app/backend
CMD ["npm", "start"]