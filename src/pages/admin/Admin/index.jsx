import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "@/config/constants";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/button";
import InputField from "@/components/fields/InputField";
import SelectBox from "@/components/selectBox";

import Table from "@/components/tables";
import { FaPlus } from "react-icons/fa";

import { toast } from "@/components/ui/use-toast";
import { list, deleteAdmin, setState } from "@/stores/admin/adminSlice";

const Admins = () => {
  const { t } = useTranslation();

  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const resultState = useSelector((state) => state.admin);
  const { isLoading } = useSelector((state) => state.admin);
  const [admins, setAdmins] = useState([]);
  const [status, setStatus] = useState(null);

  const columnsDataCheck = [ "id", "full_name", "email", "address", "status"];


  const onSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value ? `\\${e.target.keyword.value.trim()}` : "";

    dispatch(list({ keyword, status }));
  };

  useEffect(() => {
    dispatch(list());
  }, []);

  useEffect(() => {
    if (resultState.admins) {
      setAdmins(resultState.admins)
    }
    if (resultState.messageSuccess) {
      toast({
        variant: "success",
        title: resultState.messageSuccess,
      });

      dispatch(setState({messageSuccess: ""}));
    }
  }, [resultState.admins, resultState.messageSuccess]);

  const deleteItem = (id) => {
    const choice = window.confirm(
      t("common:delete.confirm")
    );
    if (choice) {
      dispatch(deleteAdmin(id)).then(() => {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
      });
    }
  }

  const TableElement = () => {
    return (
      <Table
        isLoading={isLoading}
        columnLangPage="admin"
        columns={columnsDataCheck}
        data={admins.map((item) => {
          return {
            ...item,
            status: Constants.ADMIN.STATUS[item.status]
              ? t(`common:${Constants.ADMIN.STATUS[item.status]["label"]}`)
              : "",
          };
        })}
        onEdit={(id) => {
          navigateTo(`/admin/users/edit/${id}`);
        }}
        onDelete={(id) => {
          deleteItem(id);
        }}
      />
    );
  };

  return (
    <>
      <Button
        classExtra="p-5 h-10 rounded text-sm"
        onClick={() => {
          navigateTo("/admin/users/create");
        }}
        btnDefault
      >
        {t("common:button.create")} <FaPlus className="ml-2" />
      </Button>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <div
          className="!z-5 relative flex flex-col rounded-xl bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 
          dark:text-white dark:shadow-none w-full overflow-auto p-4"
        >
          <form
            onSubmit={onSubmit}
            className="overflow-x-auto sm:flex gap-5 items-center md:justify-end  flex-wrap whitespace-nowrap"
          >
            <InputField
              type="text"
              name="keyword"
              classInput="!h-10 !mt-0"
              extra="sm:flex gap-2 items-center"
              placeholder={t("common:enter_keyword")}
              id="keyword"
              classLabel="font-bold"
              label={t("common:keyword")}
            />
            <SelectBox
              classNameExtra="sm:flex gap-2 items-center mt-3 sm:mt-0"
              label={t("common:status")}
              classLabel="font-bold"
              classInput="!h-10 !mt-0 sm:w-44"
              name="status"
              placeholder={t("common:choose_status")}
              onChangeSelect={(name, value) => setStatus(value)}
              options={Constants.ADMIN.STATUS.map((item) => {
                return { ...item, label: t(`common:${item.label}`) };
              })}
            />
            <Button
              type="submit"
              classExtra="p-5 h-10 rounded mt-3 sm:mt-0 text-sm"
              btnDefault
              disabled={isLoading}
            >
              {t("common:search")}
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <TableElement />
      </div>
    </>
  );
};

export default Admins;
