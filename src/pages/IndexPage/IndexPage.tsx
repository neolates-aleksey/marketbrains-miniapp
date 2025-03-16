import CardDescription from "@/widgets/card-description/card-description";
import Header from "@/widgets/header/header";
import { type FC } from "react";

export const IndexPage: FC = () => {
  return (
    <div className="container">
      <Header />
      <CardDescription />
    </div>
  );
};
