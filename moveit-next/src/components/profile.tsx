import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/68074908?s=460&u=3121065e85bf718d3bf0f91f94939e6413694e85&v=4" alt="Vinicius Salgueiro"/>
      <div>
        <strong>Vinicius Salgueiro</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}