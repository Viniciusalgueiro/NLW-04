import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallangeContex";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {
    const {level, closeLevelupModal} = useContext(ChallengesContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou o proximo level.</p>
        <button type="button"
        onClick={closeLevelupModal}
        >
            <img src="/icons/close.svg" alt="Close Modal" />
        </button>
      </div>
    </div>
  );
}
