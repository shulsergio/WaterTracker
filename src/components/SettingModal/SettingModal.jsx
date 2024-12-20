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
import Icon from "../Icon/Icon.jsx";

const SettingModal = ({ onClose }) => {
  console.log("------SettingModal ------");
  const dispatch = useDispatch();
  const avatarUrl = useSelector(selectUser).avatarUrl;
  const email = useSelector(selectUser).email;
  const gender = useSelector(selectUser).gender;

  const name = useSelector(selectUser).name;
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
      gender,
      name: name || undefined, // Не відправляємо порожнє ім'я
      email,
      ...(newPassword && {
        outdatedPassword,
        newPassword,
      }),
    };
    const onSave = () => {
      console.log("onSave");
    };
    dispatch(updateUserProfile(dataToSend))
      .then(() => onSave()) // Якщо все пройшло успішно
      .catch((error) => console.error("Error updating profile:", error));
    setSubmitting(false);
  };

  // const handleRemovePhoto = () => {
  //   event.stopPropagation();
  //   setPreview(null); // Скидаємо прев'ю зображення
  // };

  const getAvatar = () => {
    // if (avatarUrl && avatarUrl !== "null") {
    //   return (
    //     <img src={avatarUrl} alt={name || "User"} className={styles.avatar} />
    //   );
    // }

    // const letter =
    //   (name && name[0].toUpperCase()) ||
    //   (email && email[0].toUpperCase()) ||
    //   "?";

    // return <span className={styles.emptyAvatar}>{letter}</span>;
    if (preview) {
      return <img src={preview} alt="Avatar" className={styles.avatar} />;
    }

    // Якщо немає прев'ю, відображаємо ініціал або емейл користувача
    if (avatarUrl && avatarUrl !== "null") {
      return (
        <img src={avatarUrl} alt={name || "User"} className={styles.avatar} />
      );
    }

    if (name && name.length > 0) {
      return (
        <span className={styles.emptyAvatar}>{name[0].toUpperCase()}</span>
      );
    }

    if (email && email.length > 0) {
      return (
        <span className={styles.emptyAvatar}>{email[0].toUpperCase()}</span>
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
            {/* <div className={styles.actionsWrapper}>
              {preview && (
                <>
                  <Icon
                    id="icon-delete"
                    width={16}
                    height={16}
                    className={styles.iconDelete}
                  />
                  <button
                    type="button"
                    className={styles.removePhotoButton}
                    onClick={handleRemovePhoto}
                  >
                    Remove photo
                  </button>
                </>
              )}
            </div> */}
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={styles.form}>
              <div className={styles.dataWrapper}>
                <div className={styles.leftWrapper}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Your gender identity</label>
                    <div className={styles.radioButtonWrapper}>
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
                </div>

                <div className={styles.rightWrapper}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.fieldGroup}>
                    <label
                      htmlFor="outdatedPassword"
                      className={styles.radioButtonWrapper}
                    >
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
