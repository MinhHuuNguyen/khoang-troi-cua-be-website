import {
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_VI } from "material-react-table/locales/vi";

interface Props<T extends MRT_RowData> extends MRT_TableOptions<T> {
  columns: MRT_ColumnDef<T, any>[];
  data: T[];
}

export const useTable = <T extends MRT_RowData>({
  columns,
  data,
  ...props
}: Props<T>) => {
  const table = useMaterialReactTable({
    columns,
    data,
    localization: MRT_Localization_VI,
    enableDensityToggle: false,
    enableFilters: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    ...props,
  });

  return table;
};
