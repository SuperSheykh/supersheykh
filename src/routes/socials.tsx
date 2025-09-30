import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/socials')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/socials"!</div>
}
