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
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      dispatch(updateUserAvatar(file));
      toast.success("Image upload");
    } else {
      toast.error("Please upload a valid image file.");
    }
  };
  const Xemail = useSelector(selectUser).email;
  const Xgender = useSelector(selectUser).gender;
  const Xname = useSelector(selectUser).name;
  const initialValues = {
    gender: Xgender,
    name: Xname,
    email: Xemail || "",
    outDatePassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  console.log("Settings initialValues", initialValues);
  const validationSchema = Yup.object({
    gender: Yup.string().required("Please select your gender."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    newPassword: Yup.string().min(
      8,
      "Password must be at least 8 characters long."
    ),
    repeatNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Passwords must match."
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { gender, name, email, outDatePassword, newPassword } = values;
    const ii = newPassword && { outDatePassword, newPassword };
    console.log("ZZZZZZZZ - ", ii);
    const dataToSend = {
      gender,
      name,
      email,
      ...(newPassword && { outDatePassword, newPassword }),
    };
    const onSave = () => {
      console.log("onSave");
    };
    dispatch(updateUserProfile(dataToSend))
      .then(() => {
        onSave();
        onClose();
        return toast.success("Profile updated");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        return;
      });
    setSubmitting(false);
  };

  return (
    <Modal title="Setting" classNameModal={styles.modal} onClose={onClose}>
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
                    <label
                      htmlFor="outDatePassword"
                      className={styles.radioButtonWrapper}
                    >
                      Outdated password
                    </label>
                    <Field
                      id="outDatePassword"
                      name="outDatePassword"
                      type="password"
                      placeholder="Enter your current password"
                      className={styles.input}
                    />
                    <ErrorMessage
                      name="outDatePassword"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label
                      htmlFor="newPassword"
                      className={styles.radioButtonWrapper}
                    >
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
                    <label
                      htmlFor="repeatNewPassword"
                      className={styles.radioButtonWrapper}
                    >
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
