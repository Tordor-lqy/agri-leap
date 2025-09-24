import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Button>
      <Link to="/home/chat">
        跳转
      </Link>
    </Button>

  </div>
}
