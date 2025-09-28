import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      {/* <div>Hello "__root"!</div> */}

      <div className="select-none">
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools position="top-right" />
      </div>
    </React.Fragment>
  );
}
