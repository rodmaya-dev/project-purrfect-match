# PurrfectMatch

Find the cat breed that fits your life. PurrfectMatch combines a short four-question quiz with an explorer of cat breeds, powered by [The Cat API](https://thecatapi.com).

> The quiz result is a guide, not a diagnosis. The API describes temperament in free text and does not cover health, allergies or how a cat gets along with children or other pets. Talk to a vet or a breeder before you decide.

## What it does

- **Breed explorer:** browse 100 breeds as cards with a photo, life span, description and origin. Breeds load in groups of 12 with a "Load more" button, and the interface shows loading, error and empty states.
- **Quiz (in progress):** four questions (energy, character, size and coat) will rank the breeds by how well they match your answers.
- **Saved cats (full stack, planned):** create an account, sign in and keep a private list of saved breeds with an optional note.
- **About the author:** a short page about me and about the project.

## Status

- [x] Stage 0: planning and repository setup
- [x] Stage 1.1: project structure and responsive layout (from 320 px)
- [x] Stage 1.2: The Cat API integration (breed explorer)
- [ ] Stage 1.2: quiz
- [ ] Stage 2: custom API (TypeScript, MongoDB Atlas, JWT authentication) and saved cats

## Tech stack

**Front end:** React, TypeScript, Vite, React Router, CSS (flexbox and grid), normalize.css

**Data:** The Cat API

**Planned back end:** TypeScript API with MongoDB Atlas and JWT authentication

## Project structure

```
client/
  src/
    components/   React components (App, Header, Main, About, Footer,
                  BreedCard, BreedList, StatusMessage)
    config/       Constants: API settings, UI messages, data cleaning rules
    hooks/        Custom hooks (useBreeds)
    images/       Images and icons
    styles/       Design tokens (CSS variables)
    types/        Shared TypeScript types (raw API data and clean breeds)
    utils/        API requests and the data cleaning layer
    vendor/       Third-party resources (normalize.css, fonts)
```

## Getting started

Requirements: Node.js 20.19+ or 22.12+ and a free API key from [The Cat API](https://thecatapi.com).

```bash
git clone https://github.com/rodmaya-dev/project-purrfect-match.git
cd project-purrfect-match/client
npm install
```

### Environment variables

Copy the example file and add your key:

```bash
cp .env.example .env
```

On Windows PowerShell use `Copy-Item .env.example .env`. Then edit `client/.env`:

| Variable            | Description                |
| ------------------- | -------------------------- |
| `VITE_CAT_API_KEY`  | Your The Cat API key       |

Vite exposes `VITE_` variables to the browser, so the key is visible in the built app. Use a free key, never one from an account you care about. The `.env` file is not versioned.

### Run it

```bash
npm run dev
```

The app opens at `http://localhost:5173`.

### Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start the development server            |
| `npm run build` | Type-check and build for production     |
| `npm run lint`  | Run ESLint                              |

## Data

The Cat API returns 107 breeds. The app does not use the raw response: a cleaning layer (`utils/catApiCleaner.ts`) removes 7 breeds with corrupted data, converts life span and weight to numeric ranges, groups coat types and filters out values that are not temperaments. The result is 100 usable breeds. The rules live in `config/breedCleaning.ts`.

## Deployment

Live demo: _coming soon_.

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