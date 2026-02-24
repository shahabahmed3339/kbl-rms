# kbl-rms

Lightweight Risk Management System (RMS) — fullstack MERN-style app with a React client and an Express/MongoDB server.

## Contents
- `client/` — React frontend created with Create React App
- `server/` — Express backend, uses Mongoose for MongoDB models and Passport/JWT for auth
- `models/`, `routes/`, `config/` — server-side models, HTTP routes, and configuration

## Prerequisites
- Node.js (v16+ recommended)
- npm (bundled with Node) or yarn
- MongoDB (local or connection URI)

## Environment
Create an environment file (e.g., `.env`) for the server with at least:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JSON Web Token secret
- `PORT` — optional server port (default 5000)

Adjust names/values to match server configuration in `server/` if different.

## Setup
From the project root:

Install server dependencies (root `package.json` contains server deps):

```bash
npm install
```

Install client dependencies:

```bash
npm run client-install
```

## Development
Run server and client concurrently (hot-reload for both):

```bash
npm run dev
```

Alternatively run them separately:

```bash
# Start server (uses nodemon if you use the server script)
npm run server

# Start client
npm run client
```

To run the production build of the client and serve with the server:

```bash
# build client
cd client
npm run build
# then start server from project root
cd ..
npm start
```

## Tests
Client tests use CRA test scripts:

```bash
cd client
npm test
```

## Notes
- Server `package.json` includes dependencies such as `express`, `mongoose`, `passport`, and `jsonwebtoken`.
- Client is built with `react-scripts` and includes common libraries (Redux, React Router, Bootstrap, charting libs).
- For any environment-specific configuration, check `server/config/` and other config files in `server/`.

## Project Structure (high level)
- `client/` — React source in `src/`
- `server/` — Express entry `server.js`, `routes/`, `models/`, `config/`
- `applications/`, `cert/`, `images/`, and other supporting folders in the repo root

## Contributing
- Fork, create a branch, add tests/changes, submit a PR.

## License
MIT-style (see `server/package.json` license field)

---
Generated on Feb 24, 2026
