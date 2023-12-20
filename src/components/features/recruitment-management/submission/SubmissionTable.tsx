import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTable } from "@/libs/hooks/useTable";
import { Button, MenuItem, Tooltip, Typography } from "@mui/material";
import { DatetimePicker, SelectBox } from "@/components/shared/inputs";
import TestOptions from "@/utils/data/json/test.json";
import { IMember } from "@/@types/member";
import { ellipsisText } from "@/utils/common";
import { COLORS } from "@/utils/constants";

interface Person extends IMember {
  date_time?: string;
  test_id?: number;
}

const data: Person[] = [
  {
    full_name: "123",
    email: "Kentucky@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    has_social_activities: "Đã từng",
    memories: "Làm việc nhóm tốt",
    position: "Thành viên",
    hope_to_receive:
      "Kinh nghiệm, kiến thức và trải nghiệm Kinh nghiệm, kiến thức và trải nghiệm Kinh nghiệm, kiến thức và trải nghiệm Kinh nghiệm, kiến thức và trải nghiệm Kinh nghiệm, kiến thức và trải nghiệm",
  },
  {
    full_name: "123",
    email: "Ohio@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    has_social_activities: "Chưa từng",
    memories: "Làm việc nhóm tốt",
    position: "Thành viên",
    hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
  },
  {
    full_name: "123",
    email: "West Virginia@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    has_social_activities: "Đã từng",
    memories: "Làm việc nhóm tốt",
    position: "Thành viên",
    hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
  },
  {
    full_name: "123",
    email: "Nebraska@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    has_social_activities: "Chưa từng",
    memories: "Làm việc nhóm tốt",
    position: "Thành viên",
    hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
  },
  {
    full_name: "123",
    email: "Nebraska@gmail.com",
    birthday: "27/02/2001",
    phone_number: "0334455667",
    address: "144 Xuan Thuy",
    work_place: "144 Xuan Thuy",
    has_social_activities: "Chưa từng",
    memories: "Làm việc nhóm tốt",
    position: "Thành viên",
    hope_to_receive: "Kinh nghiệm, kiến thức và trải nghiệm",
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
        accessorKey: "has_social_activities",
        header: "Đã từng tham gia hoạt động xã hội",
        size: 200,
      },
      {
        accessorKey: "memories",
        header: "Kỷ niệm đáng nhớ khi tham gia hoạt động xã hội",
        size: 200,
        Cell({ row }) {
          return (
            <Tooltip title={row.original.memories}>
              <Typography
                sx={{
                  ...ellipsisText(2),
                  fontSize: "14px",
                }}
              >
                {row.original.memories}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "position",
        header: "Vị trí mong muốn trong KTCB",
        size: 150,
      },
      {
        accessorKey: "hope_to_receive",
        header: "Điều mong muốn nhận khi tham gia KTCB",
        size: 200,
        Cell({ row }) {
          return (
            <Tooltip title={row.original.hope_to_receive}>
              <Typography
                sx={{
                  ...ellipsisText(2),
                  fontSize: "14px",
                }}
              >
                {row.original.hope_to_receive}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "date_time",
        header: "Ngày giờ phỏng vấn",
        size: 150,
        Cell(props) {
          return <DatetimePicker onChange={(e) => console.log(e)} />;
        },
      },
      {
        accessorKey: "test_id",
        header: "Bài test",
        size: 150,
        Cell(props) {
          return (
            <SelectBox
              options={TestOptions}
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
    renderRowActions: ({ row }) => (
      <div className="flex items-center justify-center min-w-">
        <button
          className={`flex items-center justify-center w-8 h-8 mr-2 text-white bg-green-700 rounded-full hover:bg-green-600`}
        >
          V
        </button>
        <button
          className={`flex items-center justify-center w-8 h-8 mr-2 text-white bg-red-700 rounded-full hover:bg-red-600`}
        >
          X
        </button>
      </div>
    ),
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
