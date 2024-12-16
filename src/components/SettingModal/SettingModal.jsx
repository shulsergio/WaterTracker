import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./SettingModal.module.css";
import * as Yup from "yup";
import axios from "axios";
import Button from "../button/Button.jsx";
import RadioButton from "../radio-button/RadioButton.jsx";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectPhotoUrl,
  selectStatus,
} from "../../redux/user/selectors.js";
import { uploadPhoto } from "../../redux/user/operations.js";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SettingModal = ({ userData, onCloseModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const initialValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    gender: userData?.gender || "Women",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    photo: userData?.photo || "https://via.placeholder.com/150", // Default placeholder
  };

  const photoUrl = useSelector(selectPhotoUrl);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Зберігаємо вибраний файл
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadPhoto(file)); // Відправляємо файл на сервер
    }
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const updatedData = {
        name: values.name,
        email: values.email,
        gender: values.gender,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      await axios.patch("http://localhost:3000/user/avatar", updatedData);
      onCloseModal();
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Failed to update user data.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal">
        <h1>Upload Photo</h1>
        <div>
          {photoUrl ? (
            <img src={photoUrl} alt="User Avatar" width="150" />
          ) : (
            <p>No photo uploaded</p>
          )}
        </div>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleUpload} disabled={status === "loading"}>
          {status === "loading" ? "Uploading..." : "Upload Photo"}
        </button>
        {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={onCloseModal}>Close</button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, errors, touched }) => (
          <Form className={css.form}>
            {/* Photo Section */}
            <div className="photo-section">
              <div className="photo-circle">
                {values.photo ? (
                  <img
                    src={values.photo}
                    alt="User Avatar"
                    className="user-photo"
                  />
                ) : (
                  <div className="photo-placeholder">No Photo</div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={() => handleFileChange()}
              />
            </div>
            {/* Gender Section */}

            <RadioButton
              value="Women"
              selectedValue={values.gender}
              onChange={(value) => setFieldValue("gender", value)}
              label="Women"
            />
            <RadioButton
              value="Men"
              selectedValue={values.gender}
              onChange={(value) => setFieldValue("gender", value)}
              label="Men"
            />
            {/* Name Section */}
            <div>
              <label className={css.label}>
                Your Name
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className={css.input}
                />
              </label>
              <ErrorMessage
                name="name"
                component="div"
                className={css.errorMessage}
              />
            </div>
            {/* Email Section */}
            <div>
              <label className={css.label}>
                Email
                <Field
                  type="email"
                  name="email"
                  className={`${css.input} ${
                    touched.email && errors.email ? css.inputError : ""
                  }`}
                  placeholder="Enter your email"
                />
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className={css.errorMessage}
              />
            </div>
            {/* Password Section */}
            <div>
              <label className={css.label}>
                Current Password
                <div>
                  <Field
                    type="password"
                    name="currentPassword"
                    className={
                      touched.password && errors.password
                        ? `${css.input} ${css.inputError}`
                        : css.input
                    }
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={css.eyeButton}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <BiShow className={css.eye} />
                    ) : (
                      <BiHide className={css.eye} />
                    )}
                  </button>
                </div>
              </label>
              <ErrorMessage
                name="currentPassword"
                component="div"
                className={css.errorMessage}
              />

              <label className={css.label}>
                New Password
                <div className={css.passwordWrapper}>
                  <Field
                    type="password"
                    name="newPassword"
                    className={
                      touched.password && errors.password
                        ? `${css.input} ${css.inputError}`
                        : css.input
                    }
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={css.eyeButton}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <BiShow className={css.eye} />
                    ) : (
                      <BiHide className={css.eye} />
                    )}
                  </button>
                </div>
              </label>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error-message"
              />

              <label className={css.label}>
                Confirm New Password
                <div className={css.passwordWrapper}>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={
                      touched.password && errors.password
                        ? `${css.input} ${css.inputError}`
                        : css.input
                    }
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={css.eyeButton}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <BiShow className={css.eye} />
                    ) : (
                      <BiHide className={css.eye} />
                    )}
                  </button>
                </div>
              </label>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.errorMessage}
              />
            </div>
            {/* Error Message */}
            <ErrorMessage
              name="general"
              component="p"
              className={css.errorMessage}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className={css.saveButton}
              disabled={isSubmitting}
            >
              Save
            </Button>
            {/* <button type="submit" disabled={isSubmitting}>
              Save
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SettingModal;
