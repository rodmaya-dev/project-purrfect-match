# PurrfectMatch

Find the cat breed that fits your life. PurrfectMatch combines a short four-question quiz with an explorer of cat breeds, powered by [The Cat API](https://thecatapi.com).

> The quiz result is a guide, not a diagnosis. The API describes temperament in free text and does not cover health, allergies or how a cat gets along with children or other pets. Talk to a vet or a breeder before you decide.

## What it does

- **Quiz:** four questions (energy, character, size and coat) rank every breed by how well it matches your answers. Any question can be skipped with "No preference". Results show a match percentage on each breed card and load in small groups with a "Show more matches" button.
- **Breed explorer:** browse 100 breeds as cards with a photo, life span, description and origin. Breeds load in groups of 12 with a "Load more" button, and the interface shows loading, error and empty states.
- **Saved cats (full stack):** create an account, sign in and keep a private list of saved breeds with an optional note. The API is ready; the front end connects to it in Stage 2.2.
- **About the author:** a short page about me and about the project.

## Status

- [x] Stage 0: planning and repository setup
- [x] Stage 1.1: project structure and responsive layout (from 320 px)
- [x] Stage 1.2: The Cat API integration, breed explorer and quiz
- [x] Stage 2.1: custom API (TypeScript, Express, MongoDB Atlas, JWT authentication)
- [ ] Stage 2.2: connect the front end to the API, saved cats page and deployment

## Tech stack

**Front end:** React, TypeScript, Vite, React Router, CSS (flexbox and grid), normalize.css

**Data:** The Cat API

**Back end:** Node.js, Express, TypeScript, MongoDB Atlas with Mongoose, JSON Web Tokens, bcryptjs, zod, cors, express-rate-limit

## Project structure

```
package.json      Root scripts to install and run both apps
client/
  src/
    components/   React components (App, Header, Main, About, Footer, Button,
                  BreedCard, BreedList, StatusMessage, Quiz, QuizResults)
    config/       Constants: API settings, UI messages, quiz rules, data cleaning rules
    hooks/        Custom hooks (useBreeds)
    images/       Images and icons
    styles/       Design tokens (CSS variables)
    types/        Shared TypeScript types (raw API data, clean breeds, quiz)
    utils/        API requests, the data cleaning layer and the quiz scoring
    vendor/       Third-party resources (normalize.css, fonts)
server/
  src/
    config/       Constants, environment validation, error messages, database connection
    controllers/  Route handlers (auth, users, saved cats)
    errors/       HTTP error classes
    middlewares/  Authorization, rate limiter and centralized error handling
    models/       Mongoose models (User, SavedCat)
    routes/       One router per resource, connected from routes/index.ts
    schemas/      zod schemas that validate request bodies
    types/        Express type extensions
    utils/        Token helpers, body parsing and the authenticated user helper
    app.ts        Express application
    server.ts     Entry point
```

## Getting started

Requirements: Node.js 20.19+ or 22.12+, a free API key from [The Cat API](https://thecatapi.com) and a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster for the API.

```bash
git clone https://github.com/rodmaya-dev/project-purrfect-match.git
cd project-purrfect-match
npm install
npm run install:all
```

`npm install` installs the root tools and `npm run install:all` installs the dependencies of `client` and `server`.

### Environment variables

Copy the example files and fill them in:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

On Windows PowerShell use `Copy-Item client/.env.example client/.env` and `Copy-Item server/.env.example server/.env`.

**`client/.env`**

| Variable           | Description          |
| ------------------ | -------------------- |
| `VITE_CAT_API_KEY` | Your The Cat API key |

Vite exposes `VITE_` variables to the browser, so the key is visible in the built app. Use a free key, never one from an account you care about.

**`server/.env`**

| Variable        | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `PORT`          | Port of the API (default `3001`)                                            |
| `NODE_ENV`      | `development` or `production` (default `development`)                       |
| `MONGODB_URI`   | MongoDB Atlas connection string, including the database name                |
| `JWT_SECRET`    | Secret used to sign tokens, at least 32 characters                          |
| `CLIENT_ORIGIN` | Origin of the front end allowed by CORS, for example `http://localhost:5173` |

You can generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

In development the API resolves the Atlas address with Google DNS (8.8.8.8 and 8.8.4.4), because some networks block the SRV lookup. The `.env` files are not versioned.

### Run it

From the root, start the API and the front end together:

```bash
npm run dev
```

The front end opens at `http://localhost:5173` and the API listens on `http://localhost:3001`. You can also run each part on its own with `npm run dev:client` and `npm run dev:server`.

### Scripts

Root:

| Command               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `npm run install:all` | Install the dependencies of `client` and `server`    |
| `npm run dev`         | Start the front end and the API together             |
| `npm run dev:client`  | Start only the front end                             |
| `npm run dev:server`  | Start only the API                                   |
| `npm run build`       | Build the front end and the API                      |
| `npm run lint`        | Run ESLint in both apps                              |
| `npm start`           | Start the compiled API (run `npm run build` first)   |

Inside `client` and `server`:

| Command         | `client`                            | `server`                             |
| --------------- | ----------------------------------- | ------------------------------------ |
| `npm run dev`   | Start the development server        | Start the API with reload on change  |
| `npm run build` | Type-check and build for production | Compile TypeScript to `dist/`        |
| `npm start`     |                                     | Run the compiled API                 |
| `npm run lint`  | Run ESLint                          | Run ESLint                           |

## API

All errors have the same shape: `{ "message": "..." }`. Protected routes need the header `Authorization: Bearer <token>`, where the token comes from `POST /signin`.

| Method   | Route             | Auth   | Description                                                              |
| -------- | ----------------- | ------ | ------------------------------------------------------------------------ |
| `GET`    | `/health`         | Public | Status of the server. It does not use the database or the token          |
| `POST`   | `/signup`         | Public | Create an account. Body: `email`, `password` (8 to 72 characters), `name` (2 to 30). Returns `201` with `_id`, `email` and `name` |
| `POST`   | `/signin`         | Public | Sign in. Body: `email`, `password`. Returns `{ "token": "..." }`         |
| `GET`    | `/users/me`       | Token  | Profile of the signed-in person: `_id`, `email` and `name`               |
| `GET`    | `/saved-cats`     | Token  | Saved cats of the signed-in person, newest first                         |
| `POST`   | `/saved-cats`     | Token  | Save a breed. Body: `breedId`, `breedName`, optional `imageUrl` (http or https) and optional `note` (up to 500 characters). Returns `201` |
| `DELETE` | `/saved-cats/:id` | Token  | Delete one of your saved cats                                            |

| Status | When                                                                                  |
| ------ | ------------------------------------------------------------------------------------- |
| `400`  | The body, the id or the JSON is not valid                                             |
| `401`  | The token is missing or not valid, or the credentials are wrong                       |
| `403`  | You try to delete a saved cat that belongs to someone else                            |
| `404`  | The saved cat, the user or the route does not exist                                   |
| `409`  | The email is already registered, or the breed is already in your saved cats           |
| `429`  | More than 10 requests in 15 minutes to `/signup` and `/signin` from the same address  |
| `500`  | Unexpected error. The response never includes the stack trace or the database error   |

### Security notes

- Passwords are stored as bcrypt hashes and no response returns them.
- Tokens expire after 7 days and carry only the id of the person.
- Every query on saved cats is filtered by the owner taken from the token, and deleting someone else's record is rejected.
- CORS only allows the origin set in `CLIENT_ORIGIN`.
- Request bodies are validated before the database is touched.

## Data

The Cat API returns 107 breeds. The app does not use the raw response: a cleaning layer (`utils/catApiCleaner.ts`) removes 7 breeds with corrupted data, converts life span and weight to numeric ranges, groups coat types and filters out values that are not temperaments. The result is 100 usable breeds. The rules live in `config/breedCleaning.ts`.

## How the quiz works

Each answered question gives a breed 1 point if it matches. The match percentage is the points earned divided by the questions answered, so skipped questions count neither for nor against a breed. Ties are sorted alphabetically, and every breed with at least one match is listed.

| Question  | Options                                | A breed matches when...                                      |
| --------- | -------------------------------------- | ------------------------------------------------------------ |
| Energy    | High / Low                             | its temperament includes an energy keyword (Active, Calm...) |
| Character | Sociable / Independent                 | its temperament includes Social, Friendly / Independent, Reserved |
| Size      | Small / Medium / Large                 | the midpoint of its weight is under 5 kg / 5 to 6 kg / 6 kg or more |
| Coat      | Short / Long / Hairless                | its coat type includes the chosen one                        |

The API gives temperament as free text, so a breed without any of the keywords does not score on that question. Affectionate, Intelligent and Playful appear in about two thirds of the breeds and do not tell them apart, so they are not used. The rules live in `config/quiz.ts` and the scoring in `utils/quizScoring.ts`.

## Deployment

- Front end: _coming soon_
- API: _coming soon_

## Credits

- Breed data and photos: [The Cat API](https://thecatapi.com)
- Interface design based on the TripleTen final project UI kit
- Font: [Inter](https://rsms.me/inter/)
- Reset: [normalize.css](https://necolas.github.io/normalize.css/)

## Author

Rodrigo Maya

- [GitHub](https://github.com/rodmaya-dev)
- [LinkedIn](https://www.linkedin.com/in/rod-maya/)
- [Personal website](https://rodmaya-dev.github.io/)