FROM node:9

# Set WORKDIR
WORKDIR /app

# Copy every file
COPY . .

# Install dependencies
RUN npm install

# Expose port -- receive as ENV variable later
EXPOSE 3000

# Start nodemon
CMD ["npm", "start"]
