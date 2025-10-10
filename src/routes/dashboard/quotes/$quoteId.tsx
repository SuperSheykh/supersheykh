import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/quotes/$quoteId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/quotes/$quoteId"!</div>
}
