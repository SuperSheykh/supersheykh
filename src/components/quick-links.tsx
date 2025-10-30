import { useQuery } from "@tanstack/react-query"
import { getAllPolicies } from "actions/policies"
import { Button } from "@/components/ui/button"
import { useTrans } from "@/hooks/use-trans"
import { Link } from "@tanstack/react-router"

const QuickLinks = () => {
  const t = useTrans()
  const { data: policies, } = useQuery({
    queryKey: ['policies'],
    queryFn: getAllPolicies
  })

  if (policies)
    return (
      <div className="flex items-center gap-2">
        {policies.map((policy) => (
          <Button key={policy.id} asChild size="icon" variant="link" className="text-background hover:text-accent">
            <Link to={'/legal/$slug'} params={{ slug: policy.slug }} className="flex items-center gap-2">
              {t(policy.title, policy.titleFr)}
            </Link>
          </Button>
        ))}
      </div>
    )
}

export default QuickLinks
