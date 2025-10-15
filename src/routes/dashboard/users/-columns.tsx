import { ColumnDef } from "@tanstack/react-table";
import { user } from "@/db/schema/auth-schema";

type User = typeof user.$inferSelect;

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Key",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
