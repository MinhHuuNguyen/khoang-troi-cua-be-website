import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTable } from "@/libs/hooks/useTable";
import { MenuItem } from "@mui/material";
import { DatetimePicker, SelectBox } from "@/components/shared/inputs";

type Person = {
  full_name: string;
  email: string;
} & {
  date_time?: string;
  test_id?: number;
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
const SubmissionTable = () => {
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
      {
        accessorKey: "date_time",
        header: "Chọn ngày giờ",
        size: 150,
        Cell(props) {
          return <DatetimePicker onChange={(e) => console.log(e)} />;
        },
      },
      {
        accessorKey: "test_id",
        header: "Chọn bài test",
        size: 150,
        Cell(props) {
          return (
            <SelectBox
              options={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
              ]}
              value={""}
              onChange={(value) => console.log(value)}
            />
          );
        },
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="1" onClick={() => console.info("Duyệt", row.original)}>
        Duyệt
      </MenuItem>,
      <MenuItem
        key="2"
        onClick={() => console.info(" Không duyệt", row.original)}
      >
        Không duyệt
      </MenuItem>,
    ],
    positionActionsColumn: "last",
  });

  return <MaterialReactTable table={table} />;
};

export { SubmissionTable };
