import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/delete-my-data')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Delete my data</div>
}
