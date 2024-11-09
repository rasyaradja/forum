
# Forum API

This repository hosts the code for a forum API deployed on an AWS EC2 instance, with automated CI/CD via GitHub Actions. The backend uses Node.js and Amazon RDS for PostgreSQL for database management, with NGINX as a reverse proxy and rate limiter.
## Project Overview

This API supports forum functionality, including creating and managing threads, posts, and user authentication. The server runs on AWS EC2 Instance, Amazon RDS for PostgreSQL and GitHub Actions to automate testing and deployment.

## Features

- **Forum API** for managing threads and posts
- **User Authentication**: Secure login and registration with JWT-based authentication
- **Rate Limiting**: Configured with NGINX to control request rates
- **SSL Certificates** managed with Certbot for HTTPS
- **Password Hashing** User passwords are securely hashed using bcrypt.
- **CI/CD Pipeline**: Configured using GitHub Actions to streamline deployment
- **Linting and Testing**: Code quality and testing are ensured with ESLint and Jest.


## Setup and Configuration

### Environment Variables

Place the following environment variables in a `.env` file:

```dotenv
# HTTP Server Configuration
HOST=0.0.0.0
PORT=5000

# PostgreSQL Database Configuration
PGHOST=<database_host>
PGUSER=<database_user>
PGDATABASE=<database_name>
PGPASSWORD=<database_password>
PGPORT=5432

# Token Configuration
ACCESS_TOKEN_KEY=<access_token_key>
REFRESH_TOKEN_KEY=<refresh_token_key>
ACCESS_TOKEN_AGE=3000
```

### NGINX Configuration

The provided `nginx.conf` file configures NGINX with:

- **Reverse Proxy**: Forwarding traffic to the server on port 5000.
- **Rate Limiting**: Limits requests to 90 requests per minute for specific endpoints like `/threads`.

### SSL Configuration

Certbot is used to manage SSL certificates. Key files:

- **Certificate**: `/etc/letsencrypt/live/<your-domain>/fullchain.pem`
- **Key**: `/etc/letsencrypt/live/<your-domain>/privkey.pem`

## Deployment Instructions

### Prerequisites

- AWS EC2 instance with NGINX installed running on port 5000
- PostgreSQL database set up on AWS RDS

### Steps

1. **Clone Repository**:
   ```bash
   git clone https://github.com/rasyaradja/forum.git
   cd forum
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```
3. **Configure `.env`** with your environment variables.
4. **Run database migrations**:
   ```bash
   npm run migrate
   ```
5. **Start the application**:
   ```bash
   npm start
   ```
6. **Configure NGINX** using `nginx.conf` and restart the service:
   ```bash
   sudo systemctl restart nginx
   ```

### CI/CD with GitHub Actions

The GitHub Actions workflow automates:

- **Testing**: Runs unit and integration tests.
- **Deployment**: Pushes changes to EC2 upon a successful build.

### API Endpoints
**User Authentication**
- `POST /register`: Register a new user.
- `POST /login`: Authenticate a user and receive a JWT.

**Thread Management**:
- `GET /threads`: Retrieve all forum threads.
- `POST /threads`: Create a new forum thread.
- `GET /threads/:id`: Retrieve a specific thread by ID.
- `PUT /threads/:id`: Update a specific thread by ID.
- `DELETE /threads/:id`: Delete a specific thread by ID.

**Comment System**:
- `POST /threads/:threadId/comments`: Add a comment to a specific thread.
- `DELETE /threads/:threadId/comments/:commentId`: Delete a specific comment.

**Like/Dislike Functionality**:
- `PUT /threads/:threadId/comments/:commentId/likes`: Like or dislike a comment.

### Testing
To run the tests, use the following command:


```bash
npm test
```
To run tests in watch mode:

```bash
npm run test:watch
```

### Linting
To lint the code, run:

```bash
npm run lint
```
## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Open a pull request detailing your changes.

## License

This project is licensed under the MIT License. - see the [LICENSE](LICENSE) file for details.
