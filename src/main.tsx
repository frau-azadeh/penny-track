import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./styles/fonts.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
