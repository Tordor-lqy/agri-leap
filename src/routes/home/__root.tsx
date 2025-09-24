import ToolSidebar from '@/components/page/home/tool-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/home/__root')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex h-screen'>
    <ToolSidebar />
    <Outlet/>
  </div>
}
