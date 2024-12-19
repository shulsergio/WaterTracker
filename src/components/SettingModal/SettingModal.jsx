import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAvatar,
  updateUserProfile,
  // uploadPhoto2,
} from "../../redux/user/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SettingModal.module.css"; // Стилі форми
import { selectUser } from "../../redux/user/selectors.js";
import RadioButton from "../radio-button/RadioButton.jsx";
import Button from "../button/Button.jsx";
import Modal from "../Modal/Modal.jsx";

const SettingModal = ({ onClose }) => {
  console.log("------SettingModal ------");
  const dispatch = useDispatch();
  const avatarUrl = useSelector((state) => state.user.avatarUrl);
  const email = useSelector(selectUser).email;
  const name = useSelector(selectUser).name;
  const gender = useSelector(selectUser).gender;
  const [preview, setPreview] = useState(null);
  console.log("==== avatarUrl", avatarUrl);
  console.log("==== email", email);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Створення прев'ю для відображення
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      // Відправка файлу на сервер
      dispatch(updateUserAvatar(file));
    }
  };

  const initialValues = {
    gender: gender,
    name: name,
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
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { gender, name, email, outdatedPassword, newPassword } = values;

    const dataToSend = {
      gender: gender,
      name: name, // нужна проверка JOI
      email: email,
      password: newPassword === "" ? null : newPassword,
    };
    console.log("=== dataToSend", dataToSend);

    dispatch(updateUserProfile(dataToSend))
      .then(() => onSave()) // Якщо все пройшло успішно
      .catch((error) => console.error("Error updating profile:", error));
    setSubmitting(false);
  };

  return (
    <Modal title="Setting" onClose={onClose}>
      <>
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
                  value="Woman"
                  selectedValue={values.gender}
                  onChange={() => setFieldValue("gender", "Woman")}
                  label="Woman"
                />
                <RadioButton
                  value="Man"
                  selectedValue={values.gender}
                  onChange={() => setFieldValue("gender", "Man")}
                  label="Man"
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

              <Button type="primary" className={styles.saveButton}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  );
};
export default SettingModal;
