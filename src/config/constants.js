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
    EMAIL: /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
    USERNAME: /^[a-z_]+$/,
    IS_EMOJI: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
    PHONE: /^\d+$/
  },
  MIN: {
    USERNAME: 6,
    PHONE: 10,
  },
  MAX: {
    USERNAME: 50,
    PHONE: 12,
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
    },
    OPTION_ROLE: [
      { 
        value: 1, 
        label: "Quản trị viên",
        name: "admin" 
      },
      { 
        value: 2, 
        label: "Ban giám đốc",
        name: "manager" 
      },
      { 
        value: 3, 
        label: "Trưởng khoa",
        name: "dean" 
      },
      { 
        value: 4, 
        label: "Nhân viên khoa phòng",
        name: "nvkp"
      },
      { 
        value: 5, 
        label: "Trưởng khoa vật tư",
        name: "tkvt" 
      },
      { 
        value: 6, 
        label: "Nhân viên vật tư",
        name: "nvvt" 
      },
    ],
    ROLE_VALUE: { 
      ADMIN: 1, 
      MANAGER: 2,
      DEAN: 3,
      NVKP: 4,
      TKVT: 5,
      NVVT: 6,
    },
  },
};

export default Constants;
