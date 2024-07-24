import * as yup from "yup";
import { t } from "i18next";
import moment from "moment";
import Constants from "@/config/constants";

const ValidationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required(() =>
      t("validation:required", { label: t("common:field.username") })
    )
    .min(Constants.MIN.USERNAME, () =>
      t("validation:min", {
        label: t("common:field.username"),
        limit: Constants.MIN.USERNAME
      })
    )
    .max(Constants.MAX.COMMON, () =>
      t("validation:max", {
        label: t("common:field.username"),
        limit: Constants.MAX.COMMON
      })
    )
    .test(
      "check-invalid-username",
      () =>
        t("validation:invalid", {
          label: t("common:field.username"),
        }),
      (value) => !value || Constants.REGEX.USERNAME.test(value)
    ),
  full_name: yup
    .string()
    .trim()
    .max(Constants.MAX.COMMON, () =>
      t("validation:max", {
        label: t("common:field.full_name"),
        limit: Constants.MAX.COMMON,
      })
    ),
  email: yup
    .string()
    .trim()
    .required(() =>
      t("validation:required", { label: t("common:field.email") })
    )
    .test(
      "is-email-valid",
      () => t("validation:invalid", { label: t("common:field.email") }),
      (value) => !value || Constants.REGEX.EMAIL.test(value)
    )
    .email(() => t("validation:invalid", { label: t("common:field.email") }))
    .max(Constants.MAX.COMMON, () =>
      t("validation:max", {
        label: t("common:field.email"),
        limit: Constants.MAX.COMMON,
      })
    ),
  address: yup.string().max(Constants.MAX.COMMON, () =>
    t("validation:max", {
      label: t("common:field.address"),
      limit: Constants.MAX.COMMON,
    })
  ),
  phone: yup
    .string()
    .test(
      "is-phone-valid",
      () => t("validation:invalid", { label: t("common:field.phone") }),
      (value) => !value || Constants.REGEX.PHONE.test(value)
    )
    .test(
      "is-phone-min",
      () =>
        t("validation:min", {
          label: t("common:field.phone"),
          limit: Constants.MIN.PHONE,
        }),
      (value) => !value || value.length >= Constants.MIN.PHONE
    )
    .test(
      "is-phone-max",
      () =>
        t("validation:max", {
          label: t("common:field.phone"),
          limit: Constants.MAX.PHONE,
        }),
      (value) => !value || value.length <= Constants.MAX.PHONE
    ),
  birth_date: yup
    .string()
    .nullable()
    .test(
      "is-before-current-date",
      () => t("validation:birth_date_invalid", { label: t("common:field.birth_date") }),
      (value) =>
        !value ||
        moment(value, Constants.DATE.FORMAT_SHOW_DATE).isBefore(moment(), "day")
    ),
  status: yup.boolean(),
});

export default ValidationSchema;

