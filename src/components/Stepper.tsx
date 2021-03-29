import React from 'react';
import { Steps, Step } from 'react-step-builder';
import OrderConfirmStep from './OrderConfirmStep';
import PaymentConfirmStep from './PaymentResultStep';
import PaymentMethodStep from './PaymentMethodStep';

const Navigation = (props: any) => {
  return (
    <div className="stepper-navigation">
      {Number(props.current)!==props.size && <button onClick={props.next}>Next</button>}
    </div>
  );
};

const Stepper = () => {

  const config = {
    navigation: {
        component: Navigation,
        location: "after",
    }
  };
  return (
    <Steps config={config}>
      <Step component={OrderConfirmStep}></Step>
      <Step component={PaymentMethodStep}></Step>
      <Step component={PaymentConfirmStep}></Step>
    </Steps>
  )
}

export default Stepper;