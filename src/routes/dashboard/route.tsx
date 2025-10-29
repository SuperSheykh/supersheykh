import { createFileRoute } from '@tanstack/react-router'
import { Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user
      // || context.auth.user.role !== 'admin'
    )
      throw redirect({ to: '/login', search: { type: 'signin', redirectTo: '/dashboard' } })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
