import { useUnit } from "effector-react";
import { updateRepricerRouter } from "@/model";

import Button from "@/shared/components/button/button";
import IconPlus from "@/shared/components/icons/IconPlus";
import IconDiagonalArrow from "@/shared/components/icons/IconDiagonalArrow";

import "./repricer-limits.scss";

type Props = {
  currentLimit: number;
  maxLimit: number;
};

const RepricerLimits = (props: Props) => {
  const updateRouter = useUnit(updateRepricerRouter);

  return (
    <div className="repricer-limits">
      <div className="repricer-limits__container">
        <div className="repricer-limits__left-part">
          <Button size="m" iconRight={<IconDiagonalArrow />} />
          <p className="repricer-limits__text">
            Лимиты: {props.currentLimit} / {props.maxLimit}
          </p>
        </div>

        <Button
          onClick={() =>
            updateRouter({
              route_type: "create",
              is_active: true,
              current_step: 1,
            })
          }
          size="m"
          label="Создать"
          iconRight={<IconPlus />}
        />
      </div>
    </div>
  );
};

export default RepricerLimits;
