import styles from "./PillShape.module.scss";

interface Props {
  leftSideDesign: string;
  RightSideDesign: string;
  leftSideContent: React.ReactNode;
  RightSideContent: React.ReactNode;
  onClick?: () => void;
}

function PillShape({
  leftSideDesign,
  RightSideDesign,
  leftSideContent,
  RightSideContent,
  onClick,
}: Props) {
  return (
    <div onClick={onClick} className={styles["pill-shape"]}>
      <span className={leftSideDesign}>{leftSideContent}</span>
      <span className={RightSideDesign}>{RightSideContent}</span>
    </div>
  );
}

export default PillShape;
