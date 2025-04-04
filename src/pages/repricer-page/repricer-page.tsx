import RepricerLimits from "@/features/repricer-limits/repricer-limits";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";

import "./repricer-page.scss";

export const RepricerPage = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="repricer-page container">
      <div className="repricer-page__content">
        <p className="repricer-page__title">Репрайсеры</p>
      </div>

      <RepricerLimits maxLimit={10} currentLimit={0} />

      <button onClick={() => setOpen(true)}>Open sheet</button>

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} detent="content-height">
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>12{/* Your sheet content goes here */}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};
