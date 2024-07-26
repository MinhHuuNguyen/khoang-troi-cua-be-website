import { useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTable } from "@/libs/hooks/useTable";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { ModalConfirm } from "@/components/shared/modals";
import { ACTIONS } from "@/utils/constants";
import { useDisclosure } from "@/libs/hooks/useDisclosure";
import { ActionType } from "@/@types/common";
import ToastSuccess from "@/components/shared/toasts/ToastSuccess";
import { EllipsisCell } from "@/components/shared/table";
import { INews } from "@/@types/news";
import newsData from "@/utils/data/json/news.json";
import internalEmails from "@/utils/data/json/internal-email.json";

const NewsTable = () => {
  const columns = useMemo<MRT_ColumnDef<INews>[]>(() => [
    {
      accessorKey: "title",
      header: "Tiêu đề",
      size: 200,
      Cell: (props) => <EllipsisCell {...props} />,
    },
    {
      accessorKey: "description",
      header: "Mô tả",
      size: 200,
      Cell: (props) => <EllipsisCell {...props} />,
    },
    {
      accessorKey: "time",
      header: "Thời gian",
      size: 200,
      Cell: (props) => <EllipsisCell {...props} />,
    },
    {
      accessorKey: "author",
      header: "Tác giả",
      size: 200,
      Cell: (props) => <EllipsisCell {...props} />,
    },
  ], []);

  const [opened, { open, close }] = useDisclosure();
  const [openedDetail, { open: openDetail, close: closeDetail }] = useDisclosure();
  const [openToast, setOpenToast] = useState(false);
  const [rowSelected, setRowSelected] = useState<INews>();
  const [action, setAction] = useState<ActionType>();

  const handleOpenModal = (person: INews, action?: ActionType) => {
    action ? open() : openDetail();
    setRowSelected(person);
    setAction(action);
  };

  const handleConfirm = () => {
    setOpenToast(true);
    closeDetail();
    close();
  };

  const table = useTable({
    columns,
    data: newsData.map((news) => ({
      ...news,
      team: [news.team], // Convert 'team' property to an array of strings
    })),
    enableRowActions: true,
    renderTopToolbar: () => <div />,
    renderBottomToolbar: () => <div />,
    renderRowActions: ({ row }) => (
      <div className="flex items-center justify-center min-w-">
        <Tooltip title="Chia sẻ bài viết">
          <IconButton onClick={() => handleOpenModal(row.original)}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
    positionActionsColumn: "last",
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ToastSuccess
        open={openToast}
        onClose={() => setOpenToast(false)}
        heading="Xác nhận thành công"
        content={`${[action as ActionType]}`}
      />
      <ModalConfirm
        title={`Thông báo xác nhận`}
        open={opened}
        onClose={close}
        content={`${[action as ActionType]}`}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export { NewsTable };