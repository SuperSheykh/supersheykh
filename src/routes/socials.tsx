import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/socials')({
  component: RouteComponent,
  handle: {
    crumb: () => 'Socials',
  },
})

function RouteComponent() {
  return <div>Hello '/socials'!</div>
}
