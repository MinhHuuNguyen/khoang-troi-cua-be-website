import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTable } from "@/libs/hooks/useTable";
import { MenuItem, Tooltip } from "@mui/material";

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

const InterviewTable = () => {
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
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="1"
        onClick={() => console.info("Xác nhận phỏng vấn", row.original)}
      >
        Xác nhận phỏng vấn
      </MenuItem>,
      <MenuItem key="2" onClick={() => console.info("Duyệt", row.original)}>
        Duyệt
      </MenuItem>,
      <MenuItem
        key="3"
        onClick={() => console.info(" Không duyệt", row.original)}
      >
        Không duyệt
      </MenuItem>,
      <MenuItem
        key="4"
        onClick={() => console.info(" Không phỏng vấn", row.original)}
      >
        Không phỏng vấn
      </MenuItem>,
    ],
    positionActionsColumn: "last",
  });

  return <MaterialReactTable table={table} />;
};

export { InterviewTable };
