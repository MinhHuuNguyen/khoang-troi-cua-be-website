import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTable } from "@/libs/hooks/useTable";

type Person = {
  full_name: string;
  email: string;
};

const data: Person[] = [
  {
    full_name: "123",
    email: "Kentucky@gmail.com",
  },
  {
    full_name: "123",
    email: "Ohio@gmail.com",
  },
  {
    full_name: "123",
    email: "West Virginia@gmail.com",
  },
  {
    full_name: "123",
    email: "Nebraska@gmail.com",
  },
  {
    full_name: "123",
    email: "Nebraska@gmail.com",
  },
];

const MemberListTable = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: "Họ và tên",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

export { MemberListTable };
