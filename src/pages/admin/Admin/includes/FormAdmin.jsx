import React, { useEffect, useState } from "react";
import InputField from "@/components/fields/InputField";
import Switch from "@/components/switch";
import UploadFile from "@/components/fields/UploadFile";
import Date from "@/components/datePicker";
import { useTranslation } from "react-i18next";
import Constants from "@/config/constants";
import "./../style.css";
import SelectBox from "@/components/selectBox";

const FormAdmin = ({
  formData,
  onFileChange,
  onChangeData,
  admin,
  oldImage,
  defaultDate,
  defaultRole,
  title,
  children,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    formData.setValue("username", admin?.username || "");
    formData.setValue("full_name", admin?.full_name || "");
    formData.setValue("email", admin?.email || "");
    formData.setValue("address", admin?.address || "");
    formData.setValue("phone", admin?.phone || "");
    formData.setValue("status", admin?.status || false);
  }, [admin, formData]);

  const [isSwitchChecked, setIsSwitchChecked] = useState(
    admin?.status === Constants.ADMIN.STATUS_VALUE.ACTIVE
  );

  useEffect(() => {
    setIsSwitchChecked(admin?.status === Constants.ADMIN.STATUS_VALUE.ACTIVE);
  }, [admin]);

  const handleSwitchChange = (event) => {
    const checked = event.target.checked;
    setIsSwitchChecked(checked);
  };

  return (
    <>
      <div className="bg-white overflow-hidden rounded-xl">
        <div className="flex p-5 bg-neutral-700">
          <h2 className="text-white text-lg font-bold ml-5">{title}</h2>
        </div>
        <div className="p-10 flex flex-col lg:gap-5">
          <div className="columns-2">
            <InputField
              extra="item-form"
              labelClass="w-label"
              required
              label={t("common:field.username")}
              placeholder={t("common:field.username_placeholder")}
              id="username"
              name="username"
              type="text"
              form={formData}
            />
            <InputField
              extra="item-form"
              labelClass="w-label"
              label={t("common:field.full_name")}
              placeholder={t("common:field.full_name_placeholder")}
              id="full_name"
              name="full_name"
              type="text"
              form={formData}
            />
          </div>
          <InputField
            extra="item-form"
            labelClass="w-label"
            required
            label={t("common:field.email")}
            placeholder={t("common:field.email_placeholder")}
            id="email"
            type="text"
            name="email"
            form={formData}
          />
          <InputField
            extra="item-form"
            labelClass="w-label"
            label={t("common:field.address")}
            placeholder={t("common:field.address_placeholder")}
            id="address"
            type="text"
            name="address"
            form={formData}
          />
          <div className="columns-2">
            <InputField
              extra="item-form"
              labelClass="w-label"
              placeholder={t("common:field.phone_placeholder")}
              label={t("common:field.phone")}
              id="phone"
              type="text"
              name="phone"
              form={formData}
            />
            <Date
              onChangeDate={onChangeData}
              name="birth_date"
              label={t("common:field.birth_date")}
              labelClass="w-label"
              placeholder={Constants.DATE.FORMAT_SHOW_DATE}
              extra="item-form"
              form={formData}
              classDate="custom-date"
              format={Constants.DATE.FORMAT_SHOW_DATE}
              value={defaultDate ?? null}
            />
          </div>
          <SelectBox
            label={t("common:field.role")}
            labelClass="w-label"
            name="role"
            placeholder={t("common:field.choose_role")}
            classNameExtra="item-form"
            options={Constants.ADMIN.OPTION_ROLE}
            onChangeSelect={onChangeData}
            form={formData}
            value={defaultRole ?? Constants.ADMIN.STATUS_VALUE.ACTIVE}
          />
          <UploadFile
            extra="item-form"
            fieldName="avatar"
            onFileChange={onFileChange}
            nameClass="btn-upload"
            oldImage={oldImage}
            contentImageClass="flex flex-col-reverse gap-5"
            label={t("common:field.avatar")}
          />
          <div className="item-form item-status">
            <div className="flex w-label">
              <label htmlFor="status" className="text-sm text-navy-700 dark:text-white font-bold mb-2">
                {t("common:status")}
              </label>
            </div>
            <Switch
              name="status"
              id="status"
              form={formData}
              checked={isSwitchChecked}
              onChange={handleSwitchChange}
            />
          </div>
          <div className="flex justify-center flex-wrap gap-5 pt-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAdmin;

