import ToolSidebar from '@/components/page/home/tool-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex h-screen w-screen'>
    <ToolSidebar />
    <Outlet />
  </div>
}
