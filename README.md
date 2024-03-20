# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


ABOUT THE APP

The app is a collection of tools that help the user be productive and provides quick information, while showing all in a pleasant UI.

The core of the app are the different tabs that show the different tools that we provide, which are:

* Tasks:

Uses state, event handlers (onClick, onChange) and local storage custom hook to add new tasks, save them on local storage and delete them

* Weather:

Calls a weather API through a custom hook to get information about the weather based on location or input from the user

* Calendar:

Uses a 3rd-party calendar library with customization controls, that allow us to create task components depending on the date picked. Uses local storage custom hook as well.

* Unit converter:

Uses custom JS for unit conversion and actions in useReducer hook 


Other components and functionality in the app include:

* App container:

The app container is the squared area below the navbar and contains the outlet component that is connected to the router library, rendering our different page components.

* Dark mode/ light mode:

We use useContext to wrap the entire app and provide the state of isDarkMode (true or false) to all components. We manipulate CSS classes for dark/light mode based on the state of isDarkMode. Activates through button on navbar.

* Background image:

We can choose to show the background image by theme (dark or lightmode version) or by time of day (image changes by the current hour of day). We change the setting in the upper left corner where the setting menu is located.

* Footer:

Shows an inspirational quote on reload and reveals the author on hover above the quote. We use event handlers to make it possible (onMouseOver, onMouseLeave).  Clicking on the icon next to the author will show a new quote

* Mobile:

The site has been designed for mobile use as well



