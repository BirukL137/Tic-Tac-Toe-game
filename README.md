# Tic Tac Toe Game 🎮

A modern, responsive, and accessible implementation of Tic Tac Toe built with **React**, **Context API**, and a professional CSS architecture. This project is based on the [Frontend Mentor Tic Tac Toe challenge](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v).

--- ## Table of contents 

- [Overview](#overview)
  - [The challenge](#the-challenge) 
  - [Screenshot](#screenshot) 
  - [Links](#links) 
- [My process](#my-process) 
  - [Built with](#built-with) 
  - [What I learned](#what-i-learned) 
  - [Continued development](#continued-development) 
  - [Useful resources](#useful-resources) 
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview 

### The challenge 

Users should be able to: 

- Play Tic Tac Toe against another player or the CPU - Choose their symbol (X or O) 
- Select difficulty and mode 
- See the game state update in real time 
- View the score and round results 
- Experience a responsive, accessible UI across devices 

### Screenshot 

![Tic Tac Toe Screenshot](/public/screenshots/screenshot-game.png) 

### Live demo 

👉 [Live Demo on Vercel](https://tic-tac-toe-game-three-ashen.vercel.app/)

---

## ✨ Features

- 🎨 **Design System**: Tokens, base resets, and modular CSS for consistent styling.
- ♿ **Accessibility**: ARIA roles, keyboard navigation, and focus styles.
- 🧠 **Game Logic**: Reducer + Context API for global state management.
- 🤖 **CPU Opponent**: Random, heuristic and minimax algorithms for different difficulty levels.
- 🔄 **Custom Hook**: `useGame` encapsulates game state and logic.
- ✅ **Testing**: Unit tests for CPU logic (`cpu.test.js`) with Vitest.
- 📱 **Responsive**: Works seamlessly across mobile, tablet, and desktop.

---

## My process

## Built with

- **React 19** – functional components + hooks 
- **Context API** – global state management 
- **Custom hooks** – `useGame` for encapsulating game logic 
- **CSS architecture** – tokens, base resets, modular component styles 
- **Vitest** – unit testing (`cpu.test.js`) 
- **Vite** – fast dev build tool
---

### What I learned

- How to structure a REact app with **Context API** and **custom hooks** for clean state management.
- Writing unit tests for CPU logic (heuristic vs minimax) to ensure correctness.
- Building a **design system** with tokens and base styles for consistency.
- Applying **ARIA roles** and accessibility best practices to interactive components.

### How to Run locally

```bash
# Clone the repository
git clone https://github.com/BirukL137/Tic-tac-toe.git

cd Rest-countries-api-with-color-theme-switcher

# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests with:
npm test
```

### Continued development
- Add integration tests for `useGame` and `GameContext`.
- Expand accessibility testing (keyboard navigation, focus management).
- Consider migrating to **TypeScript** for type safety.
- Improve animations and transitions for polished UX.

### Useful resources 

- [Frontend Mentor](https://www.frontendmentor.io) – Challenge source. 
- [React Docs](https://react.dev) – For Context API and hooks. 
- [Vitest](https://vitest.dev/guide/) – For writing unit tests.

## Author

- Frontend Mentor - [@BirukL137](https://www.frontendmentor.io/profile/BirukL137)
- GitHub - [@BirukL137](https://github.com/BirukL137)

## Acknowledgments

Thanks to Frontend Mentor for providing the challenge

---
