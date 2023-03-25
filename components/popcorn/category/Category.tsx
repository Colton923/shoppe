import styles from './Category.module.scss'
import type { SizeNames } from 'types/PopcornSizes'
import { useLocalContext } from '../context/LocalContext'

/*
 *
 */

const Category = () => {
  const {} = useLocalContext()

  return <div className={styles.category}></div>
}

export default Category
