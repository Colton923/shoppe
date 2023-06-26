import styles from './Containers.module.scss'
import * as SanityTypes from 'types/SanityItem'
import Link from 'next/link'
import { Container, Group, Title, Text, BackgroundImage, Space } from '@mantine/core'
import urlFor from '@lib/sanity/urlFor'
interface ContainerProps {
  containers: SanityTypes.Container[]
}

export default function Containers(props: ContainerProps) {
  const { containers } = { ...props }

  if (!containers.length) {
    return null
  }

  return (
    <Container
      size={'xl'}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '0',
        opacity: '0.95',
      }}
    >
      {containers.map((container: SanityTypes.Container) => (
        <Container key={container._id} size={'lg'} w={'285px'}>
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
  )
}
