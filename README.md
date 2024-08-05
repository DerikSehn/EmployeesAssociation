# Employee Association Management System

This project was my first major undertaking back in 2023 🚀

## Project Overview

Earlier in 2023, I developed a comprehensive dashboard and a landing page for the employee association management system at Unimed Vale do Caí. This pilot project took around 8 months (yeah, right? 😅) to develop from scratch, as it was my first time tackling something of this magnitude.

## System Features

- 🔐 **Permission Control Tools:** Ensuring secure access and management.
- 👤 **Native User Authentication and Authorization:** Implemented on the backend using Java.
- 🌐 **External API Integrations:** For real-time analysis and automatic generation of the member table, reflecting the status of Unimed employees based on data from Sênior and Salux, two major healthtech companies in Brazil.

## Technologies Used

- **Frontend:**
  - React
  - MaterialUI
  - React Hooks (useEffect, useState, useContext, Custom Hooks)

- **Backend:**
  - Java Web Dynamic Project
  - REST
  - Servlet
  - Levenshtein metrics for queries generator
  - Postgres

Fun fact: All other functionalities were implemented natively, surprisingly making this a very light and performant system. ⚡

This project has been a significant milestone in my journey as a strong, resilient developer, and I'm so happy for the experience! 🌟

Nowadays, I can see the difference this creation has made in my knowledge. I can confidently say:

#React #Java #MaterialUI #WebDevelopment #HealthTech #APIs #REST #SoftwareDevelopment #2023 #Postgres #Levenshtein #useEffect #useState #useContext

## Project Structure and Technical Details

The project is organized into several key directories and files, each serving a specific purpose:

- **`dist/`:** Contains the distribution files for deployment, including optimized assets and the main HTML file.
  - **`assets/`:** Stores images and compiled CSS/JS files.

- **`src/`:** The source code for the application.
  - **`assets/`:** Original image assets and icons used in the project.
  - **`components/`:** Reusable React components organized by type (buttons, cards, inputs, lists, etc.).
  - **`programas/`:** Contains the main program logic, including the dashboard and homepage components.
  - **`routes/`:** Defines the application routes for navigation.
  - **`utils/`:** Utility functions and data used throughout the application.

- **`index.html`:** The main HTML file for the application.
- **`index.css`:** Global CSS styles for the application.
- **`jest.config.js` and `jest.setup.ts`:** Configuration files for testing with Jest.
- **`LICENSE`:** The license file for the project.
- **`package.json` and `yarn.lock`:** Project dependencies and lock file.
- **`tsconfig.json` and `tsconfig.node.json`:** TypeScript configuration files.
- **`vite.config.ts`**: Configuration file for Vite, the build tool.

### Key Components and Modules

- **Dashboard Components:**
  - **`CardAFU.tsx, CardContained.tsx, CardEvento.tsx, CardIndicador.tsx, CardInfo.tsx`:** Various card components used to display information.
  - **`PainelInformacoes.tsx`:** Main dashboard panel displaying user information and statistics.

- **Authentication:**
  - **`AuthProvider.tsx`:** Provides authentication context to the application.
  - **`Login.tsx, Signup.tsx, Forgot.tsx`:** Components for user login, signup, and password recovery.

- **API Integration:**
  - **`actions.tsx`:** Defines actions for interacting with external APIs.
  - **`env.tsx`:** Manages environment variables for API endpoints.

- **Utility Functions:**
  - **`currency.tsx, fileUtils.tsx, getObjectName.tsx`:** Various utility functions for handling currency formatting, file operations, and object name retrieval.

## Disclaimer

*Disclaimer: None of the attachments contain confidential data; they are merely examples of the system.*
