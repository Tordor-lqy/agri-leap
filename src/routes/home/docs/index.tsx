import FileManagerPage from '@/components/page/home/docs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/docs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FileManagerPage /> 
}
