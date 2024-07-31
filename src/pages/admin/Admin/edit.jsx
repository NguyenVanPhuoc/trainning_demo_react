import React, { useEffect, useCallback, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editAdmin, setState, updateAdmin } from "@/stores/admin/adminSlice";
import { useToast } from "@/components/ui/use-toast";
import FormAdmin from "./includes/FormAdmin";
import ValidationSchema from "./includes/ValidationSchema";
import { isString } from "lodash";
import Constants from "@/config/constants";
import { useTranslation } from "react-i18next";
import Button from "@/components/button";
import { BsChevronLeft } from "react-icons/bs";
import "./style.css";
import moment from "moment";

function Edit() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, messageSuccess, messageError, URL, isLoading } = useSelector(
    (state) => state.admin
  );
  const [defaultDate, setDefaultDate] = useState();
  const [defaultRole, setdefaultRole] = useState(
    admin?.role || Constants.ADMIN.ROLE_VALUE.ADMIN
  );
  
  const formData = useForm({
    resolver: yupResolver(ValidationSchema),
  });
  
  const onFileChange = (fieldName, file) => {
    formData.setValue(fieldName, file);
  };
  
  const handleChangeData = useCallback((type, data) => {
    if (type === "birth_date") {
      setDefaultDate(data);
    } if (type === "role") {
      setdefaultRole(data);
    } 
    formData.setValue(type, data);
  }, []);
  
  const onSubmit = (data) => {
    const newData = Object.fromEntries(
      Object.entries(data)
      .map(([key, value]) => {
        if (key === "birth_date") {
          return [
            key,
            value
            ? moment(value, Constants.DATE.FORMAT_SHOW_DATE).format(Constants.DATE.FORMAT_SAVE_DATE)
            : null,
          ];
        } else if (isString(value) && value.trim() === "") {
          return [key, ""];
        } else {
          return [key, value];
        }
      })
      .filter(Boolean)
    );
    handleChangeData("birth_date", data.birth_date);
    handleChangeData("role", data.role);
    dispatch(updateAdmin({ data: newData, id: params.id }));
  };

  
  useEffect(() => {
    dispatch(editAdmin(params.id)).then((response) => {
      if (response && response.payload) {
        handleChangeData("birth_date", response.payload.birth_date ? moment(response.payload.birth_date).format(Constants.DATE.FORMAT_SHOW_DATE) : null);
        handleChangeData("role", response.payload.role);
      }
    });
    if (messageError) {
      toast({
        variant: "error",
        title: messageError,
      });
    }
    if (messageSuccess) {
      URL && navigate(URL);
      toast({
        variant: "success",
        title: messageSuccess,
      });
    }

    dispatch(setState({ messageError: "" }));
    dispatch(setState({ messageSuccess: "" }));
  }, [messageSuccess, messageError]);

  return (
    <>
      <form
        onSubmit={formData.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <FormAdmin
          formData={formData}
          onFileChange={onFileChange}
          onChangeData={handleChangeData}
          admin={admin}
          oldImage={admin?.avatar}
          defaultDate={defaultDate}
          defaultRole={defaultRole}
          title={t("common:editA")}
        >
          <Link
            to="/admin/users"
            className="px-5 bg-neutral-400 hover:bg-neutral-500 flex flex-row items-center rounded-md py-[12px] gap-2"
          >
            <BsChevronLeft />
            {t("common:button.back")}
          </Link>
          <Button
            name={t("common:button.update")}
            classExtra="bg-green-600 px-5 py-3 btn-button hover:bg-green-700"
            type="submit"
            btnDefault
            disabled={isLoading}
          />
        </FormAdmin>
      </form>
    </>
  );
  }
  
export default Edit;