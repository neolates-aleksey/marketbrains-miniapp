import { createEvent, createStore } from "effector";
import { IRepricerRouter } from "./types";

const initialState: IRepricerRouter = {
  is_active: false,
  current_step: 1,
};

const updateRepricerRouter = createEvent<IRepricerRouter>();

const resetRepricerRouter = createEvent();

const $repricerRouter = createStore<IRepricerRouter>(initialState)
  .on(updateRepricerRouter, (_, payload) => payload)
  .on(resetRepricerRouter, () => initialState);

export { updateRepricerRouter, resetRepricerRouter, $repricerRouter };
