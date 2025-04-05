import {
  $repricerRouter,
  resetRepricerRouter,
  updateRepricerRouter,
} from "@/model";
import { useUnit } from "effector-react";
import { Sheet } from "react-modal-sheet";

import "./bottom-sheet.scss";
import IconClose from "@/shared/components/icons/IconClose";
import { useEffect } from "react";
import Input from "@/shared/components/input/input";

const BottomSheet = () => {
  const [repricerRouter, updateRouter, resetCalendarValueAction] = useUnit([
    $repricerRouter,
    updateRepricerRouter,
    resetRepricerRouter,
  ]);

  useEffect(() => {
    console.log(repricerRouter);
  }, [repricerRouter]);

  return (
    <Sheet
      className="bottom-sheet"
      onCloseEnd={() => resetRepricerRouter()}
      isOpen={repricerRouter.is_active}
      onClose={() => resetCalendarValueAction()}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header></Sheet.Header>
        <Sheet.Content>
          <div
            onClick={() => resetRepricerRouter()}
            className="bottom-sheet__close-btn"
          >
            <IconClose />
          </div>

          {repricerRouter.current_step === 1 ? (
            <div>
              <h1
                onClick={() =>
                  updateRouter({
                    is_active: true,
                    route_type: "create",
                    current_step: 2,
                  })
                }
              >
                test
              </h1>
              <Input label="Название" required />
            </div>
          ) : (
            <div>
              <h1>Test 2</h1>
              <h1>Test 2</h1>
            </div>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default BottomSheet;
