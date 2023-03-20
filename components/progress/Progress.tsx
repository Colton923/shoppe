import styles from './Progress.module.scss'

interface ProgressProps {
  stage: number
}

const Progress = (props: ProgressProps) => {
  const { stage } = props

  return (
    <div className={styles.progress}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressStage}
          style={{ width: `${(stage / 3) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default Progress
