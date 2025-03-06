import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { routes } from "@/navigation/routes.tsx";
import "@/shared/styles/index.scss";

export function App() {
  return (
    <AppRoot>
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}
