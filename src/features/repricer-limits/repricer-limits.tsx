import Button from "@/shared/components/button/button";
import IconPlus from "@/shared/components/icons/IconPlus";
import IconDiagonalArrow from "@/shared/components/icons/IconDiagonalArrow";

import "./repricer-limits.scss";

type Props = {
  currentLimit: number;
  maxLimit: number;
};

const RepricerLimits = (props: Props) => {
  return (
    <div className="repricer-limits">
      <div className="repricer-limits__container">
        <div className="repricer-limits__left-part">
          <Button size="m" iconRight={<IconDiagonalArrow />} />
          <p className="repricer-limits__text">
            Лимиты: {props.currentLimit} / {props.maxLimit}
          </p>
        </div>

        <Button size="m" label="Создать" iconRight={<IconPlus />} />
      </div>
    </div>
  );
};

export default RepricerLimits;
