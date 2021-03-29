export interface PaymentCard {
  cardNumber: string,
  cvv: string,
  expDate: string,
  name: string,
  type: string
}

export interface PaymentCardActions {
  type: string,
  payload: PaymentCard
}