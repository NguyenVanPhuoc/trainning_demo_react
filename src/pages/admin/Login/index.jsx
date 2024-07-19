import InputField from "@/components/fields/InputField";
import Button from "@/components/button";
import LoadingDot from "@/components/loading/LoadingDot";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login, reset, setState } from "@/stores/admin/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CryptoUtil from "@/utils/cryptoUtil";
import Constants from "@/config/constants";
import Checkbox from "@/components/checkbox";

function Login() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [typeInput, setTypeInput] = useState("password");
  const { isLoading, messageError } = useSelector((state) => state.adminAuth);

  const loginSchema = yup
    .object({
      email: yup
        .string()
        .trim()
        .email(t("validation:invalid", { label: t("common:field.email") }))
        .test(
          "is-email-valid",
          () => t("validation:invalid", { label: t("common:field.email") }),
          (value) => !value || Constants.REGEX.EMAIL.test(value)
        )
        .required(t("validation:required", { label: t("common:field.email") })),
      password: yup
        .string()
        .required(
          t("validation:required", {
            label: t("common:field.password")
          })
        ),
      remember: yup.string(),
    })
    .required();

  const form = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await dispatch(setState({messageError: null}))
    const { error, payload } = await dispatch(login(data));
    if (error) {
      toast({
        variant: "error",
        title: payload?.message || t("common:error.default"),
      });
      return false;
    }
    toast({
      variant: "success",
      title: t("common:success.login")
    });

    const localData = {
      accessToken: payload?.access_token,
      expiredAt: payload?.expires,
    }

    const encodedData = CryptoUtil.encrypt(
      "secret key",
      JSON.stringify(localData)
    );

    localStorage.setItem("adminAuthenticate", encodedData)
  };

  useEffect(() => {
    if (messageError) {
      toast({
        variant: "error",
        title: messageError || t("common:error.default"),
      });
    }
  }, [messageError]);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const handleChangeTypePassword = (value) => {
    setShowPassword(value);
    value ? setTypeInput("text") : setTypeInput("password");
  };

  return (
    <>
      <div className="translate-y-2/4 flex h-full w-full items-center justify-center px-2 md:mx-0 md-px-0 lg:mb-10 lg:items-center lg:justify-center">
        <div className="w-full max-w-full flex-col items-center xl:max-w-[480px] bg-white p-4 py-8 shadow-lg rounded">
          <h4 className="mb-9 text-4xl font-bold text-navy-700 text-center">
            { t("common:login.title") }
          </h4>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputField 
              type="text"
              name="email"
              placeholder={t("common:login.email_placeholder")}
              form={form}
              variant="auth"
              extra="mb-3"
              id="email"
              classLabel="ml-1.5 font-medium"
              label={t("common:login.email")}
            />
            <InputField 
              type={typeInput}
              name="password"
              placeholder={t("common:login.password_placeholder")}
              form={form}
              variant="auth"
              extra="mb-3"
              classLabel="ml-1.5 font-medium"
              classInputWrapper="relative"
              classInput="pr-10"
              label={t("common:login.password")}
              isShowPassword={showPassword}
              password
              toggleIconPassword={handleChangeTypePassword}
            />
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox name="remember" form={form} />
                <p className="ml-2 text-sm font-medium text-navy-700">
                  {t("common:login.remember")}
                </p>
              </div>
            </div>
            <Button
              classExtra={`linear mt-2 w-full ${isLoading && "bg-gray-400 hover:bg-gray-400 active:bg-gray-400"}`}
              disabled={isLoading}
              type="submit"
              btnDefault
            >
              {isLoading ? <LoadingDot /> : t("common:login.button_admin")}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
