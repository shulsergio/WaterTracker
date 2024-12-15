import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./SettingModal.module.css";
import * as Yup from "yup";
import axios from "axios";
import Button from "../button/Button.jsx";
import RadioButton from "../radio-button/RadioButton.jsx";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SettingModal = ({ userData, onCloseModal }) => {
  const initialValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    gender: userData?.gender || "Women",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    photo: userData?.photo || "https://via.placeholder.com/150", // Default placeholder
  };

  const handlePhotoUpload = async (e, setFieldValue, setErrors) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await axios.get(
          "http://localhost:3000/user/avatar",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setFieldValue("photo", response.data.avatarUrl);
      } catch (error) {
        console.log(error);

        setErrors({ general: "Failed to upload photo. Please try again." });
      }
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          setFieldValue,
          setErrors,
          values,
          errors,
          touched,
        }) => (
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
                onChange={(e) => handlePhotoUpload(e, setFieldValue, setErrors)}
              />
            </div>
            {/* Gender Section */}

            <RadioButton
              value="Women"
              selectedValue="Women"
              onChange=""
              label="Women"
            />
            <RadioButton
              value="Man"
              selectedValue="Women"
              onChange=""
              label="Man"
            />
            {/* Name Section */}
            <div>
              <label className={css.label}>
                Your Name
                <Field type="text" name="name" placeholder="Enter your name" />
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
                <Field type="password" name="currentPassword" />
              </label>
              <ErrorMessage
                name="currentPassword"
                component="div"
                className={css.errorMessage}
              />

              <label className={css.label}>
                New Password
                <Field type="password" name="newPassword" />
              </label>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error-message"
              />

              <label className={css.label}>
                Confirm New Password
                <Field type="password" name="confirmPassword" />
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
