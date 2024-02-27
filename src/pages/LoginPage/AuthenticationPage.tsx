import styles from "./AuthenticationPage.module.scss";
import { useState } from "react";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";

const LoginPage: React.FC = () => {
  const [switchForms, setSwitchForms] = useState(false);

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-page__forms-container"]}>
        {switchForms ? (
          <SignUpForm handleSwitchForms={setSwitchForms} />
        ) : (
          <LoginForm handleSwitchForms={setSwitchForms} />
        )}
      </div>
      <div className={styles["login-page__background"]}>
        <span className={styles["login-page__overlay"]}>&nbsp;</span>
      </div>
    </div>
  );
};

export default LoginPage;
