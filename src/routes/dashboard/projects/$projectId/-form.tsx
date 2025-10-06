import { TrpcRouterOutputs } from "@/types";
import { Form, FormItem, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ProjectForm = ({
  project,
}: {
  project: TrpcRouterOutputs["projects"]["get"] | null;
}) => {
  return <div>ProjectForm</div>;
};

export default ProjectForm;
