export interface FacebookEventContent {
  id: string
  quantity: number
}

export interface FacebookEvent {
  content_category?: string
  content_type?: string
  contents?: Array<{
    id: string
    quantity: number
  }>
  content_ids?: string[]
  content_name?: string
  currency?: string
  value?: number
  num_items?: number // InitiateCheckout
  status?: boolean // CompleteRegistration
}
