import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import SwitchLang from '@/components/tool/switch-lang'
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      {/* <div>Hello "__root"!</div> */}
      <SwitchLang />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  )
}
