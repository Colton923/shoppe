type ShippingProps = {
  zip: string
}

const apiUrl = 'https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML='

const ShippingCalculator = async (props: ShippingProps) => {
  const { zip } = props
  const xmlData = `
  <RateV4Request USERID="${process.env.NEXT_PUBLIC_USPS_USER_ID}">
    <Revision>2</Revision>
    <Package ID="1ST">
      <Service>ONLINE</Service>
      <ZipOrigination>81052</ZipOrigination>
      <ZipDestination>${zip}</ZipDestination>
      <Pounds>2</Pounds>
      <Ounces>0</Ounces>
      <Container>VARIABLE</Container>
      <Machinable>true</Machinable>
    </Package>
  </RateV4Request>
`

  // Make the fetch request
  try {
    const response = await fetch(apiUrl + encodeURIComponent(xmlData))
    const data = await response.text()

    // Process the response data
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(data, 'text/xml')
    const rates = xmlDoc.getElementsByTagName('Rate')

    // Extract and log the rates
    let rateForService = 0

    for (let i = 0; i < rates.length; i++) {
      const rate = rates[i].textContent
      const service =
        rates[i].parentElement?.getElementsByTagName('MailService')?.[0]?.textContent
      if (
        service ===
          'Priority Mail&lt;sup&gt;&#174;&lt;/sup&gt; Medium Flat Rate Box' &&
        rate
      ) {
        rateForService = parseFloat(rate)
        break
      }
    }
    if (rateForService === 0) {
      return 0
    } else {
      return rateForService
    }
  } catch (error) {
    console.error('Error:', error)
    return 0
  }
}

export default ShippingCalculator
