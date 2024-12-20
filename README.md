# 🤖
# Virtual Agent Management API

## Description
Backend API built with **NestJS** to manage virtual agents. This application allows users to create, delete, update, list, and retrieve virtual agents that have been trained. 

The application is structured into four main modules:
- **Agents**: Manage virtual agents.
- **Auth**: Handle user authentication and authorization.
- **Chat**: Interact with virtual agents through a chat interface.
- **Prompt**: Manage prompts for training and interactions.

### Features
- **CRUD Operations**: Create, Read, Update, and Delete virtual agents.
- **Authentication Middleware**: Secure the API with an authentication layer.
- **Modular Architecture**: Easily extendable and maintainable codebase.
- **SQLite Database**: Lightweight and portable database solution.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ArielBrdah/agentai-webservices.git
   cd agentai-webservices
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the application:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the environment variables in `.env` as needed.

---

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run start
```

### Testing
```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e
```

---

## API Endpoints

### Agents Module
- **POST** `/agents`: Create a new agent.
- **GET** `/agents`: List all agents.
- **GET** `/agents/:id`: Retrieve a specific agent by ID.
- **PUT** `/agents/:id`: Update an agent.
- **DELETE** `/agents/:id`: Delete an agent.

### Auth Module
- **POST** `/auth/login`: Log in and receive a token.
- **POST** `/auth/verifyToken`: Check token validity.

### Chat Module
- **POST** `/chats`: Create instanciation of the chat session.

### Prompt Module
- **POST** `/prompts`: Retrieve openai response from guest request.
- **GET** `/prompts/:agentid`:Retrieve a specific prompt by ID.
- **GET** `/prompts/:chatid`: Retrieve a specific prompt by ID.


---

## Middleware

### Authentication Middleware
The **Auth Middleware** ensures that only authenticated users can access protected routes. It validates the user's token before granting access.

---

## Database

The application uses **SQLite** as its database. Migrations and schema definitions are managed via the NestJS framework.
---

## License

This project is licensed under the [MIT License](LICENSE).
