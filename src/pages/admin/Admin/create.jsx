import React, { useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdmin, setState } from "@/stores/admin/adminSlice";
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

function Create() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messageSuccess, messageError, URL, isLoading } = useSelector(
    (state) => state.admin
  );
  const { t } = useTranslation();

  const formData = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const onFileChange = (fieldName, file) => {
    formData.setValue(fieldName, file);
  };

  const handleChangeData = useCallback((type, data) => {
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
    dispatch(createAdmin(newData));
  };

  useEffect(() => {
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
          title={t("common:createA")}
        >
          <Link
            to="/admin/users"
            className="px-5 bg-neutral-400 hover:bg-neutral-500 flex flex-row items-center rounded-md py-[12px] gap-2"
          >
            <BsChevronLeft />
            {t("common:button.back")}
          </Link>
          <Button
            name={t("common:button.create")}
            classExtra="bg-green-600 px-5 py-3 btn-button hover:bg-sky-700"
            type="submit"
            btnDefault
            disabled={isLoading}
          />
        </FormAdmin>
      </form>
    </>
  );
  }
  
export default Create;