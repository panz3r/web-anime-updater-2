# Web Anime Updater 2

## NodeJS Backend
This is a NodeJS Backend implementation for Web Anime Updater 2 (WAU2) using ExpressJS

### Setup

#### Dependencies
Install the required dependencies by running

```bash
pnpm install // Preferred method
// or
npm install
// or
yarn
```

#### Configuration
Create a `.env` file with the following content

```cfg
JWT_SECRET=jwt_secret_you_want_to_use

DB_HOST=your_mysql_db_host
DB_PORT=your_mysql_db_port
DB_NAME=your_mysql_db_name
DB_USER=your_mysql_db_user
DB_PASSWORD=your_mysql_db_password

SCRAPERS_INTERVAL=15
```

### Run
Run the backend via the following command

```bash
pnpm start
// or
npm start
// or
yarn start
```

### Docker
> Docker support coming soon...