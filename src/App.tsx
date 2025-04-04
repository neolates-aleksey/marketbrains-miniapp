import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { routes } from "@/navigation/routes.tsx";
import "@/shared/styles/index.scss";

export function App() {
  return (
    <AppRoot>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} element={route.Component} path={route.path} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppRoot>
  );
}
