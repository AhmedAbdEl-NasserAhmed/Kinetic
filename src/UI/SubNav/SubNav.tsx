import Container from "../Container/Container";
import styles from "./SubNav.module.scss";

interface Props {
  paragraph: string;
  header: string;
}

function SubNav({ ...props }: Props) {
  return (
    <div className={styles["sub-nav"]}>
      <Container>
        <div className={styles["sub-nav__container"]}>
          <div>
            <p className="text-[2rem]">{props.paragraph}</p>
            <h2 className="text-[2.5rem] sm:text-[4.5rem] font-bold">
              {props.header}
            </h2>
          </div>
          <span>&nbsp;</span>
        </div>
      </Container>
    </div>
  );
}

export default SubNav;
