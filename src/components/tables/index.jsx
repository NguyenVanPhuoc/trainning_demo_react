/* eslint-disable */
import { useMemo, useState } from "react";
import Card from "@/components/card";
import Checkbox from "@/components/checkbox";
import { MdCreate, MdDelete } from "react-icons/md";
import Pagination from "../pagination";
import Constants from "@/config/constants";
import { useTranslation } from "react-i18next";
import { RiArchive2Line } from "react-icons/ri";

const Table = (props) => {
  const {
    columns,
    columnLangPage,
    data,
    itemsSelected,
    checkbox,
    componentActionExtra,
    onEdit,
    onDelete,
    isLoading = false,
  } = props;
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  // Pagination table
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * Constants.PAGE_SIZE;
    const lastPageIndex = firstPageIndex + Constants.PAGE_SIZE;

    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const handleSelectAll = (e) => {
    const updateSelected = e.target.checked ? data : [];
    setSelected(updateSelected);
    itemsSelected && itemsSelected(updateSelected);
  };

  const handleSelected = (e, item) => {
    const updateSelected = e.target.checked
      ? [...selected, item]
      : selected.filter((selectedItem) => selectedItem.id !== item.id);
    setSelected(updateSelected);
    itemsSelected && itemsSelected(updateSelected);
  };

  return (
    <div className="relative">
      <Card extra="w-full overflow-auto p-4">
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[1280px] mb-[24px] text-gray-500">
            <thead className="uppercase">
              <tr>
                {checkbox && (
                  <th className="w-3 border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                    <Checkbox
                      onChange={(e) => handleSelectAll(e)}
                      checked={data.length === selected.length}
                    />
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {t(`table:header.${columnLangPage}.${column}`)}
                    </div>
                  </th>
                ))}
                <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700 lg:w-40">
                  <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs uppercase">
                    {t("table:common.action")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                currentTableData.map((row, index) => {
                  return (
                    <tr key={index}>
                      {checkbox && (
                        <td>
                          <Checkbox
                            onChange={(e) => handleSelected(e, row)}
                            checked={selected.includes(row)}
                          />
                        </td>
                      )}
                      <td
                        key={index}
                        className="py-4 pr-8 sm:text-[14px] break-words"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {(currentPage - 1) * Constants.PAGE_SIZE +
                              index +
                              1}
                          </p>
                        </div>
                      </td>
                      {columns
                        .filter((item) => item != "id")
                        .map((column, keyColumn) => (
                          <td
                            key={keyColumn}
                            className="py-4 pr-8 sm:text-[14px] break-words"
                          >
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                {row[column]}
                              </p>
                            </div>
                          </td>
                        ))}
                      <td className="pt-[10px] pb-[8px] flex items-center gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row["id"])}
                            className="w-9 h-9 bg-sky-700 text-white flex justify-center items-center rounded-[5px] text-[20px]"
                          >
                            <MdCreate />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row["id"])}
                            className="w-9 h-9 bg-red-700 text-white flex justify-center items-center rounded-[5px] text-[20px]"
                          >
                            <MdDelete />
                          </button>
                        )}
                        {componentActionExtra}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-4 pr-8 sm:text-[14px] break-words"
                  >
                    <div className="grid justify-center">
                      <div className="flex justify-center">
                        <RiArchive2Line className="text-3xl" />
                      </div>
                      <p className="text-md mt-1">{t("common:no_data")}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-full flex justify-center items-center mt-10 mb-10">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={Constants.PAGE_SIZE}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </Card>
      {isLoading && (
        <div className="flex absolute top-0 w-full h-full justify-center items-center bg-white/50 rounded-xl">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Table;
