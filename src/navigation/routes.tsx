import type { JSX, ReactNode } from "react";

import { DescriptionPage, RepricerPage } from "@/pages/index";

interface Route {
  path: string;
  Component: ReactNode;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: "description", Component: <DescriptionPage /> },
  { path: "/", Component: <RepricerPage /> },
];
