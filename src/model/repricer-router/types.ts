type TRepricerRouterType = "create" | "edit" | "history";

export interface IRepricerRouter {
  is_active: boolean;
  current_step: number;
  route_type?: TRepricerRouterType;
  repricerId?: string;
}
