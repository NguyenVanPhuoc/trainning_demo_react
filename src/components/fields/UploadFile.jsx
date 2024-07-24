import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button";
import Constants from "../../config/constants";

const UploadFile = ({ fieldName, label, onFileChange, nameClass, extra, labelClass, oldImage, contentImageClass }) => {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState(oldImage);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const maxFileSize = 5 * 1024 * 1024;

  useEffect(() => {
    setImagePreview(oldImage);
  }, [oldImage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (Constants.TYPE_IMAGES.includes(file.type) && file.size <= maxFileSize) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          onFileChange(fieldName, file);
          setError(null);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
        onFileChange(fieldName, null);
        if (!Constants.TYPE_IMAGES.includes(file.type)) {
          setError(t("common:upload_file.type"));
        } else if (file.size > maxFileSize) {
          setError(t("common:upload_file.max_size"));
        }
      }
    }
  };

  const handleUploadFile = () => {
    inputRef.current.click();
  }

  return (
    <div className={`${extra}`}>
      <div className={`flex ${labelClass}`}>
        <label className="text-sm text-navy-700 dark:text-white font-bold">{label}</label>
      </div>
      <div className={`w-40 ${contentImageClass ?? ""}`}>
        <Button onClick={handleUploadFile} classExtra={`mt-2 flex items-center justify-center rounded-md bg-sky-600 p-3 text-white ${nameClass}`}>{ t("common:upload_file.title") }</Button>
        <input ref={inputRef} type="file" name={fieldName} onChange={handleImageChange} className="hidden" accept="image/*"/>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-40 h-40 rounded-full" />}
      </div>
    </div>
  );
};

export default UploadFile;
