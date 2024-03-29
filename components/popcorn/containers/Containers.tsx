'use client'

import styles from './Containers.module.scss'
import * as SanityTypes from 'types/SanityItem'
import Link from 'next/link'
import { Container, Group, Title, Text, BackgroundImage, Space } from '@mantine/core'
import urlFor from '@lib/sanity/urlFor'
import { useLocalContext } from '@components/context/LocalContext'

export default function Containers() {
  const { data } = useLocalContext()
  const containers = data.containers
  if (!containers) return null

  return (
    <div className={styles.animation}>
      <Container
        size={'xl'}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: '0',
          opacity: '0.8',
        }}
      >
        {containers.map((container: SanityTypes.Container) => (
          <Container
            key={container._id}
            size={'lg'}
            w={'285px'}
            className={styles.animation}
          >
            <Space h={'lg'} />
            <Link
              href={{
                pathname: `/containers/${container._id}`,
              }}
              style={{ textDecoration: 'none' }}
            >
              <BackgroundImage
                src={container.image ? urlFor(container.image).url() : ''}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: '0.2rem',
                  backgroundColor: 'transparent',
                }}
                h={'150px'}
              >
                <Group
                  align="center"
                  w={'100%'}
                  style={{ justifyContent: 'center' }}
                  className={styles.clickable}
                >
                  <Title
                    align="center"
                    style={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: 'var(--caneWhite)',
                      textShadow: '1px 1px 5px var(--caneBlack)',
                    }}
                  >
                    {`SHOP `}
                  </Title>
                  <Text
                    align="center"
                    style={{
                      fontSize: '2.1rem',
                      fontWeight: 700,
                      color: 'var(--caneWhite)',
                      textShadow: '1px 1px 5px var(--caneBlack)',
                    }}
                    className={styles.activeText}
                  >
                    {`${container.name}` + `s`}
                  </Text>
                </Group>
              </BackgroundImage>
            </Link>
          </Container>
        ))}
      </Container>
    </div>
  )
}
