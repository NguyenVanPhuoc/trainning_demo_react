const Constants = {
  BASE_URL: import.meta.env.VITE_API_URL,
  PAGE_SIZE: 10,
  TYPE_IMAGES: ["image/jpeg", "image/jpg", "image/png", "image/gif"],
  DATE: {
    FORMAT_SHOW_DATE: "DD/MM/YYYY",
    FORMAT_SAVE_DATE: "YYYY-MM-DD",
  },
  REGEX: {
    PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,()\][{}<>|]).{8,}$/,
    IS_EMOJI: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
    INTEGER_NUMBER: /^\d+$/,
    DECIMAL_NUMBER: /^\d+(.\d+)?$/,
    EMAIL: /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
  },
  MIN: {
    NAME: 6,
  },
  MAX: {
    NAME: 50,
    COMMON: 50,
    CONTENT: 255,
    EMAIL: 255,
  },
  ADMIN: {
    STATUS: [
      {
        value: 0,
        label: "inactive"
      },
      {
        value: 1,
        label: "active",
      },
    ],
    STATUS_VALUE: { 
      INACTIVE: 0, 
      ACTIVE: 1
    }
  },
};

export default Constants;
