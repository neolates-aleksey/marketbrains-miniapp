import RepricerLimits from "@/features/repricer-limits/repricer-limits";
import BottomSheet from "@/features/bottom-sheet/bottom-sheet";

import "./repricer-page.scss";

export const RepricerPage = () => {
  return (
    <div className="repricer-page container">
      <div className="repricer-page__content">
        <p className="repricer-page__title">Репрайсеры</p>
      </div>

      <RepricerLimits maxLimit={10} currentLimit={0} />

      <BottomSheet />
    </div>
  );
};
