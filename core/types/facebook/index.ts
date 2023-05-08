export type FacebookEventContent = {
  id: string,
  quantity: number,
};

export type FacebookEvent = {
  content_category?: string,
  content_type?: string,
  contents?: {
    id: string,
    quantity: number,
  }[],
  content_ids?: string[],
  content_name?: string,
  currency?: string,
  value?: number,
  num_items?: number, // InitiateCheckout
  status?: boolean, // CompleteRegistration
};
