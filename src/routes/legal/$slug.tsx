import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/legal/$slug"!</div>
}
