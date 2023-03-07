import styles from './ActiveProduct.module.css'
import type { StripeProduct } from 'types/stripe/StripeProduct'

interface ActiveProductProps {
  activeProduct: StripeProduct | undefined
}

const ActiveProduct = (props: ActiveProductProps) => {
  const { activeProduct } = props
  return (
    <div>
      {activeProduct?.metadata?.retailPrice ? (
        <div>
          <h1>Retail Product Found</h1>
          <h1>{activeProduct.name}</h1>
          <h1>
            ${(parseInt(activeProduct.metadata?.retailPrice) / 100).toFixed(2)}{' '}
          </h1>
        </div>
      ) : (
        <h2>No Retail Product Found</h2>
      )}
    </div>
  )
}

export default ActiveProduct
