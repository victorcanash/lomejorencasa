export const consentGTMEvents = (consent: boolean) => {
  const value = consent ? 'granted' : 'denied'
  gtag('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    wait_for_update: 2000
  })
}

export const sendPageViewGTMEvent = (url: string) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}
