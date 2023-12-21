import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTable } from "@/libs/hooks/useTable";
import { MenuItem } from "@mui/material";
import { SelectBox } from "@/components/shared/inputs";
import { IOfficialMember } from "@/@types/member";

interface Person extends IOfficialMember {
  team_id?: number;
  position_id?: number;
}

const data: Person[] = [
  {
    full_name: "123",
    email: "Kentucky@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    bank_account: "123456789",
  },
  {
    full_name: "123",
    email: "Ohio@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    bank_account: "123456789",
  },
  {
    full_name: "123",
    email: "West Virginia@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    bank_account: "123456789",
  },
  {
    full_name: "123",
    email: "Nebraska@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    bank_account: "123456789",
  },
  {
    full_name: "123",
    email: "Nebraska@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    bank_account: "123456789",
  },
];

const MemberManagementTable = () => {
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
        accessorKey: "birthday",
        header: "Ngày sinh",
        size: 150,
      },
      {
        accessorKey: "phone_number",
        header: "Số điện thoại",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Khu vực sống",
        size: 150,
      },
      {
        accessorKey: "work_place",
        header: "Nơi làm việc",
        size: 150,
      },
      {
        accessorKey: "bank_account",
        header: "Số tài khoản",
        size: 150,
      },
      {
        accessorKey: "team_id",
        header: "Team",
        size: 150,
        Cell(props) {
          return (
            <SelectBox
              options={[
                { label: "Cùng bé trải nghiệm", value: "Cùng bé trải nghiệm" },
                { label: "Yêu cùng bé", value: "Yêu cùng bé" },
              ]}
              value={""}
              onChange={(value) => console.log(value)}
            />
          );
        },
      },
      {
        accessorKey: "position_id",
        header: "Vị trí",
        size: 150,
        Cell(props) {
          return (
            <SelectBox
              options={[
                { label: "Tình nguyện viên", value: "tinh-nguyen-vien" },
                { label: "Thành viên ban tổ chức", value: "ban-to-chuc" },
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
      <MenuItem key="1" onClick={() => console.info("Rời đội", row.original)}>
        Rời đội
      </MenuItem>,
    ],
    positionActionsColumn: "last",
  });

  return <MaterialReactTable table={table} />;
};

export { MemberManagementTable };
