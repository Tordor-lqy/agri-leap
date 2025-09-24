import ChatPage from '@/components/page/home/chat'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ChatPage />
}
