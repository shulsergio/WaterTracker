import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  uploadPhoto2,
} from "../../redux/user/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SettingModal.module.css"; // Стилі форми
import { selectUser } from "../../redux/user/selectors.js";
import RadioButton from "../radio-button/RadioButton.jsx";
import Button from "../button/Button.jsx";

const SettingModal = ({ onSave }) => {
  const dispatch = useDispatch();
  const avatarUrl = useSelector((state) => state.user.avatarUrl);
  const email = useSelector(selectUser).email;
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Створення прев'ю для відображення
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      // Відправка файлу на сервер
      dispatch(uploadPhoto2(file));
    }
  };

  const initialValues = {
    gender: "Women",
    name: "",
    email: email || "",
    outdatedPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const validationSchema = Yup.object({
    gender: Yup.string().required("Please select your gender."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    // outdatedPassword: Yup.string().when("newPassword", {
    //   is: (newPassword) => newPassword && newPassword.length > 0,
    //   then: Yup.string().required("Outdated password is required."),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // newPassword: Yup.string().when("outdatedPassword", {
    //   is: (outdatedPassword) => outdatedPassword && outdatedPassword.length > 0,
    //   then: Yup.string().required("New password is required."),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // repeatNewPassword: Yup.string().when("newPassword", {
    //   is: (newPassword) => newPassword && newPassword.length > 0,
    //   then: Yup.string()
    //     .oneOf([Yup.ref("newPassword")], "Passwords must match.")
    //     .required("Please confirm your new password."),
    //   otherwise: Yup.string().notRequired(),
    // }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { gender, name, email, outdatedPassword, newPassword } = values;

    const dataToSend = {
      gender,
      name: name || undefined, // Не відправляємо порожнє ім'я
      email,
      ...(newPassword && {
        outdatedPassword,
        newPassword,
      }),
    };

    dispatch(updateUserProfile(dataToSend))
      .then(() => onSave()) // Якщо все пройшло успішно
      .catch((error) => console.error("Error updating profile:", error));
    setSubmitting(false);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          <img
            src={preview || avatarUrl || "default-avatar.png"}
            alt="Avatar"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
          <p style={{ color: "#007BFF" }}>Upload a photo</p>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Your gender identity</label>
              <RadioButton
                value="Women"
                selectedValue={values.gender}
                onChange={() => setFieldValue("gender", "Women")}
                label="Women"
              />
              <RadioButton
                value="Men"
                selectedValue={values.gender}
                onChange={() => setFieldValue("gender", "Men")}
                label="Men"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Your name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name (optional)"
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} style={{ fontWeight: "bold" }}>
                Password
              </label>
              <div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="outdatedPassword" className={styles.label}>
                    Outdated password
                  </label>
                  <Field
                    id="outdatedPassword"
                    name="outdatedPassword"
                    type="password"
                    placeholder="Enter your current password"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="outdatedPassword"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="newPassword" className={styles.label}>
                    New password
                  </label>
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="repeatNewPassword" className={styles.label}>
                    Repeat new password
                  </label>
                  <Field
                    id="repeatNewPassword"
                    name="repeatNewPassword"
                    type="password"
                    placeholder="Repeat your new password"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="repeatNewPassword"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>

            <Button types="primary" type="submit" className={styles.saveButton}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SettingModal;

// const handleSave = () => {
//   console.log("Profile updated!");
// };

// <SettingModal onSave={handleSave} />
