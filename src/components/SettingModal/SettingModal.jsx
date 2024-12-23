import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAvatar,
  updateUserProfile,
} from "../../redux/user/operations.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { selectUser } from "../../redux/user/selectors.js";
import { BiShow, BiHide } from "react-icons/bi";
import * as Yup from "yup";
import styles from "./SettingModal.module.css";
import RadioButton from "../radio-button/RadioButton.jsx";
import Button from "../button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import Icon from "../Icon/Icon.jsx";
import toast from "react-hot-toast";

const SettingModal = ({ onClose }) => {
  console.log("------SettingModal ------");

  const XavatarUrl = useSelector(selectUser).avatarUrl;
  const Xemail = useSelector(selectUser).email;
  const Xgender = useSelector(selectUser).gender;
  const Xname = useSelector(selectUser).name;

  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(32, "Name must be at maximum 32 characters"),
    gender: Yup.string().required("Please select your gender"),
    email: Yup.string()
      // .email("Invalid email address")
      .matches(emailRegexp, "Invalid email address")
      .required("Email is required"),
    outDatePassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at maximum 64 characters"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at maximum 64 characters"),
    // .required("New password is required"),
    repeatNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at maximum 64 characters"),
    // .required("Please confirm your new password"),
  });

  const initialValues = {
    gender: Xgender,
    name: Xname,
    email: Xemail || "",
    outDatePassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  console.log("Settings initialValues", initialValues);

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

  const handleSubmit = (values, { setSubmitting }) => {
    const {
      gender,
      name,
      email,
      outDatePassword,
      newPassword,
      repeatNewPassword,
    } = values;

    const ii = newPassword && { outDatePassword, newPassword };
    console.log("ZZZZZZZZ - ", ii);
    if (newPassword !== repeatNewPassword) {
      toast.error("Wrong repeat password");
      return;
    }
    const dataToSend = {
      gender,
      name,
      email,
      ...(newPassword && { outDatePassword, newPassword }),
    };

    const onSave = () => {
      console.log("onSave"); //не знаю чи це потрібно =================================
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

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowPassword((prev) => !prev);
  };
  const toggleNewPasswordVisibility = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowNewPassword((prev) => !prev);
  };
  const toggleRepeatPasswordVisibility = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowRepeatPassword((prev) => !prev);
  };

  const getAvatar = () => {
    if (preview) {
      return <img src={preview} alt="Avatar" className={styles.avatar} />;
    }

    if (XavatarUrl && XavatarUrl !== "null") {
      return (
        <img src={XavatarUrl} alt={name || "User"} className={styles.avatar} />
      );
    }

    if (name && name.length > 0) {
      return (
        <span className={styles.emptyAvatar}>{name[0].toUpperCase()}</span>
      );
    }

    if (Xemail && Xemail.length > 0) {
      return (
        <span className={styles.emptyAvatar}>{Xemail[0].toUpperCase()}</span>
      );
    }

    return <span className={styles.emptyAvatar}>?</span>;
  };

  return (
    <Modal title="Setting" classNameModal={styles.modal} onClose={onClose}>
      <>
        <div className={styles.avatarContainer}>
          <p className={styles.labelYourPhoto}>Your photo</p>
          <div className={styles.avatarAndTextWrapper}>
            <label htmlFor="fileInput" className={styles.avatarLabel}>
              <div className={styles.avatarWrapper}>
                {preview ? (
                  <img src={preview} alt="Preview" className={styles.avatar} />
                ) : (
                  getAvatar()
                )}
              </div>
              <div className={styles.actionsWrapper}>
                {/* Якщо є прев'ю, можна видалити фото */}
                <Icon
                  id="icon-up-arrow"
                  width={16}
                  height={16}
                  className={styles.iconUpArrow}
                />
                <p className={styles.uploadText}>Upload a photo</p>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleFileChange}
                />
              </div>
            </label>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, touched, errors }) => (
            <Form className={styles.form}>
              <div className={styles.dataWrapper}>
                <div className={styles.leftWrapper}>
                  <div className={styles.rightWrapper}>
                    <label className={styles.label}>Your gender identity</label>
                    <div className={styles.radioButtonWrapper}>
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
                  </div>
                  <div className={styles.nameEmailWrapper}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="name" className={styles.label}>
                        Your name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        className={styles.input}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className={styles.errorMessage}
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
                        placeholder="E-mail"
                        className={styles.input}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.rightWrapper}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.fieldGroupPas}>
                    <label
                      htmlFor="outDatePassword"
                      className={styles.fieldGroupPas}
                    >
                      Outdated password
                      <div className={styles.passwordWrapper}>
                        <Field
                          id="outDatePassword"
                          name="outDatePassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className={
                            touched.outDatePassword && errors.outDatePassword
                              ? `${styles.input} ${styles.inputError}`
                              : styles.input
                          }
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className={styles.eyeButton}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? (
                            <BiShow className={styles.eye} />
                          ) : (
                            <BiHide className={styles.eye} />
                          )}
                        </button>
                      </div>
                    </label>
                    <ErrorMessage
                      name="outDatePassword"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.fieldGroupPas}>
                    <label
                      htmlFor="newPassword"
                      className={styles.fieldGroupPas}
                    >
                      New password
                      <div className={styles.passwordWrapper}>
                        <Field
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Password"
                          className={
                            touched.newPassword && errors.newPassword
                              ? `${styles.input} ${styles.inputError}`
                              : styles.input
                          }
                        />
                        <button
                          type="button"
                          onClick={toggleNewPasswordVisibility}
                          className={styles.eyeButton}
                          aria-label="Toggle new password visibility"
                        >
                          {showNewPassword ? (
                            <BiShow className={styles.eye} />
                          ) : (
                            <BiHide className={styles.eye} />
                          )}
                        </button>
                      </div>
                    </label>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.fieldGroupPas}>
                    <label
                      htmlFor="repeatNewPassword"
                      className={styles.fieldGroupPas}
                    >
                      Repeat new password
                      <div className={styles.passwordWrapper}>
                        <Field
                          id="repeatNewPassword"
                          name="repeatNewPassword"
                          type={showRepeatPassword ? "text" : "password"}
                          placeholder="Password"
                          className={
                            touched.repeatNewPassword &&
                            errors.repeatNewPassword
                              ? `${styles.input} ${styles.inputError}`
                              : styles.input
                          }
                        />
                        <button
                          type="button"
                          onClick={toggleRepeatPasswordVisibility}
                          className={styles.eyeButton}
                          aria-label="Toggle repeat new password visibility"
                        >
                          {showRepeatPassword ? (
                            <BiShow className={styles.eye} />
                          ) : (
                            <BiHide className={styles.eye} />
                          )}
                        </button>
                      </div>
                    </label>
                    <ErrorMessage
                      name="repeatNewPassword"
                      component="div"
                      className={styles.errorMessage}
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
