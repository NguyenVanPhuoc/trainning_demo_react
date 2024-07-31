import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/button";
import InputField from "@/components/fields/InputField";
import Table from "@/components/tables";
import { FaPlus } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { listDepartment, setState } from "@/stores/admin/departmentSlice";

const Department = () => {
  const { t } = useTranslation();

  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const resultState = useSelector((state) => state.department);
  const { isLoading } = useSelector((state) => state.department);
  const [departments, setDepartments] = useState([]);

  const columnsDataCheck = [ "id", "title", "email", "phone", "user_id"];


  const onSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value ? `\\${e.target.keyword.value.trim()}` : "";
    dispatch(listDepartment({ keyword }));
  };

  useEffect(() => {
    dispatch(listDepartment());
  }, []);

  useEffect(() => {
    if (resultState.departments) {
      setDepartments(resultState.departments)
    }
    if (resultState.messageSuccess) {
      toast({
        variant: "success",
        title: resultState.messageSuccess,
      });

      dispatch(setState({messageSuccess: ""}));
    }
  }, [resultState.departments, resultState.messageSuccess]);

  const TableElement = () => {
    return (
      <Table
        isLoading={isLoading}
        columnLangPage="department"
        columns={columnsDataCheck}
        data={departments.map((item) => {
          return {
            ...item,
            user_id: item.user_id
          };
        })}
        onEdit={(id) => {
          navigateTo(`/admin/departments/edit/${id}`);
        }}
      />
    );
  };

  return (
    <>
      <Button
        classExtra="p-5 h-10 rounded text-sm"
        onClick={() => {
          navigateTo("/admin/departments/create");
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

export default Department;
