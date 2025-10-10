import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/socials/$socialId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/socials/$socialId"!</div>
}
