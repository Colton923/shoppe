import Image from 'next/image'
import styles from '@styles/Home.module.css'
import aiPopcorn1 from '@public/images/aiPopcorn1.png'

import mascot from '@public/images/mascot.png'
import caramel1 from '@public/images/caramel1.png'
import caramel2 from '@public/images/caramel2.png'
import caramel3 from '@public/images/caramel3.png'
import caramel4 from '@public/images/caramel4.png'

export default function Index() {
  return (
    <div className={styles.pageContent}>
      <div className={styles.imageContainer}>
        <Image
          src={aiPopcorn1}
          alt="aiPopcorn1"
          width={2048}
          height={2048}
          className={styles.image}
        />
        <h1 className={styles.caption}>
          <strong>The Kettle Corn</strong> <br />
          Everyones Crunching About
          <input type="button" value="SHOP NOW" className={styles.button} />
        </h1>
      </div>
      <div className={styles.container}>
        <h1 className={styles.captionTwo}>
          <strong>Our Karamel Korn is Killer</strong> <br />
        </h1>
        <div className={styles.caramelContainer}>
          <Image
            src={caramel1}
            alt="caramel1"
            width={1024}
            height={1024}
            className={styles.caramel}
          />
          <Image
            src={caramel2}
            alt="caramel2"
            width={1024}
            height={1024}
            className={styles.caramel}
          />
          <Image
            src={caramel3}
            alt="caramel3"
            width={1024}
            height={1024}
            className={styles.caramel}
          />
          <Image
            src={caramel4}
            alt="caramel4"
            width={1024}
            height={1024}
            className={styles.caramel}
          />
        </div>
        <input
          type="button"
          value="EXPLORE FAVORITES"
          className={styles.buttonTwo}
        />
      </div>
      <div>
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
        <h1>Content</h1>
        <br />
      </div>
    </div>
  )
}
