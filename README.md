
# NexGenUI

> A fully-featured, responsive AI chat interface built with React, Sass, GSAP and Typescript. Supports streaming responses, multi-sessions, markdown rendering, and persistent chat history (using local storage).

---

## Table of Contents

- [How to Run](#how-to-run)
- [Features](#features)
- [Tech Stack](#tech-stack-and-system-design)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Important Logic Elements](#important-logic-elements)
- [Component Overview](#component-overview)
- [Bonus Features and Accessibility](#bonus-features-and-accessibility)

---

## How to Run

### Prerequisites

- Node.js >= v20.19.5

### Installation & Setup

1) Clone the repo:

```bash
git clone https://github.com/cosminbrn/AI-Interface.git
cd AI-Interface
```

2)Install dependencies

```bash
cd frontend
npm i
```

3)Run local server

```bash
npm run dev
```

4)The app will be available at `http://localhost:5173`.

## Features

### Overall completeness

- Implemented all the requirements given in the task document, plus bonus ones (check the [Bonus Features](#bonus-features-and-accessibility) section for more details)
- Mobile-first responsive design
- Clean, modular codebase with reusable components
- Simulated API interactions with realistic delays and error handling

### Chat UI

- Chat message list, with different designs for user / AI.
- Text input functional
- Scrollable chat history (includes an automatic scrolling down mechanism that takes effect when the user sends & recieves a message)

### Message Handling

- Messages stored and managed via React state
- Timestamps displayed for every message
- Markdown rendering for AI responses, including:
  - `` ` `` Code blocks
  - **Bold** / *italic* formatting
  - Clickable [links](https://example.com)
  - with `react-markdown`
- Typing indicator animation while AI is generating a response

### Streaming Responses

- Simulated delay => AI responses displayed word-by-word

### Chat Persistence

- Full chat history saved to `localStorage`
- History restored automatically on page refresh

### Chat Sessions

- Support for multiple conversations
- Easy switching between sessions by Sidebar
- You can rename chat sessions to your liking

### Message Actions

Each AI message supports:

- Copy to clipboard (fully functional)
- Regenerate response (simulated)
- Like / Dislike

### API Integration

- Sends user messages to a mock AI API
- Displays the AI response in the chat

### Error Handling

- Simulated random errors using the `Math.random()` function
- Empty submissions not allowed
- Timeout feature to prevent spamming from the user

### UI/UX

- Mock [Figma](https://www.figma.com/design/jIxHP4AxvGLOZSusqTYNpN/AI-Interface?m=auto&t=QJ3Bfjs8F4GLLXf3-1)
- Fully responsive layout
- Basic accessibility support

---

## Tech Stack and System Design

Followed [Sass](https://medium.com/@diyorbekjuraev77be-a-master-at-creating-the-7-1-sass-pattern-776fdfb5a3b1) and [TypeScript](https://www.typescriptlang.org/) guidelines (see [project structure](#project-structure)).

- Framework: `React`
- Build Tool: `Vite`
- Language: `Typescript`
- Styling: `Sass`
- Animation: `GSAP`
- Markdown Rendering: `React Markdown`
- Runtime: `Node.js`

---

## Project Structure

### Frontend

```bash
├── src/
│ ├── app/
│ │ └── App.tsx
│ │
│ ├── assets/ # svgs and other images
│ │ └── icons/
│ │
│ ├── components/ # common components
│ │ ├── button/
│ │ ├── dropdown/
│ │ ├── modelMessageContainer/
│ │ └── userMessageContainer/
│ │
│ ├── features/ # pages and different features
│ │ └── page/ # main page
│ │
│ ├── layouts/ # base, commonly used components
│ │ ├── chat/
│ │ ├── header/
│ │ ├── input/
│ │ └── sidebar/
│ │
│ ├── styles/ # sass 7:1 adapted
│ │ ├── abstracts/
│ │ ├── base/
│ │ ├── layouts/
│ │ └── themes/
│ │
│ └── main.tsx 
│
├── .eslintrc.cjs
├── index.html
├── package.json
├── tsconfig.json 
└── vite.config.ts
```

---

### Build for Production

```bash
npm run build
```

---

## Usage

1. Type a message in the input box at the bottom
2. Press Enter or click Send to submit
3. The AI response will stream in word-by-word
4. Predefined messages, has a 25% change to serve network error message
5. Use the sidebar to switch between chat sessions or start a new one
6. Rename a session by clicking its title.
7. Hover an AI message to access Copy, Regenerate, or Like/Dislike actions

---

## Important Logic Elements

- `handleNewChat()`: Creates new chat session with new ID based on the current date.
- `handleSendMessage()`: Handles the creation and addition of the freshly sent user message to the current session. Using `setTimeout()`, we imitate network problems, but also session delays => word-by-word messages from the LLm.
- `handleRenameChat()`: Handles session renaming.

## Component Overview

| Component | Responsibility |
| --- | --- |
| `Button` | Sidebar layout; creates a new chat session |
| `Dropdown` | Header layout; dropdown button that is supposed to change the LLM version |
| `modelMessage` | Component family; together, they create the styling and logic for the LLM messages |
| `userMessage` | Component family; together, they create and style the user given messages |
| `Page` | The powerhouse of this cell, hosts most of the project's logic, see [above](#important-logic-elements) |
| `Chat` | Supports all the messages in the current session; smart styling inspired by the look of Google Gemini interface (message centering) |
| `Header` | Responsive Header; supports LLM simulated version change and sidebar opening |
| `Input` | Input box, doesn't permit empty submissions |
| `Sidebar` | Animated sidebar, interface to previous chat sessions |

## Bonus Features and Accessibility

- Everytime the user sends a message, there's a 25% chance to get a simulated network error message from the LLM. This is implemented using `Math.random()` in the `handleSendMessage()` function in `Page.tsx`.
- Everytime the user re-enters the page, a new chat session is created, with the current date as ID. This is implemented in the `useStartFreshChatOnEntry` hook in `Page.tsx`.
