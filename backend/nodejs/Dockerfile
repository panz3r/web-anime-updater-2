FROM node:9

# Set WORKDIR
WORKDIR /app

# Copy every file
COPY . .

# Install dependencies
RUN npm install

# Compile
RUN npm run build

# Expose port -- receive as ENV variable later
EXPOSE 3000

# Start app
CMD ["npm", "run serve"]
