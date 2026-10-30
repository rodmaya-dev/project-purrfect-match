# PurrfectMatch

Find the cat breed that fits your life. PurrfectMatch combines a short four-question quiz with an explorer of cat breeds, powered by [The Cat API](https://thecatapi.com).

> The quiz result is a guide, not a diagnosis. The API describes temperament in free text and does not cover health, allergies or how a cat gets along with children or other pets. Talk to a vet or a breeder before you decide.

## What it does

- **Breed explorer:** browse breeds as cards with a photo, life span, description and origin.
- **Quiz:** four questions (energy, character, size and coat) rank the breeds by how well they match your answers.
- **Saved cats (full stack):** create an account, sign in and keep a private list of saved breeds with an optional note.
- **About the author:** a short page about me and about the project.

## Status

- [x] Stage 0: planning and repository setup
- [x] Stage 1.1: project structure and responsive layout (from 320 px)
- [ ] Stage 1.2: The Cat API integration
- [ ] Stage 2: custom API (TypeScript, MongoDB Atlas, JWT authentication) and saved cats

## Tech stack

**Front end:** React, TypeScript, Vite, React Router, CSS (flexbox and grid), normalize.css

**Data:** The Cat API

**Planned back end:** TypeScript API with MongoDB Atlas and JWT authentication

## Project structure

```
client/
  src/
    components/   React components (App, Header, Main, About, Footer, BreedCard, BreedList)
    config/       Constants
    images/       Images and icons
    styles/       Design tokens (CSS variables)
    types/        Shared TypeScript types
    utils/        Helper functions
    vendor/       Third-party resources (normalize.css, fonts)
```

## Getting started

Requirements: Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/rodmaya-dev/project-purrfect-match.git
cd project-purrfect-match/client
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start the development server            |
| `npm run build` | Type-check and build for production     |
| `npm run lint`  | Run ESLint                              |

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