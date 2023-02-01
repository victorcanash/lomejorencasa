import CheckoutAddressesForm from '@components/forms/checkout/CheckoutAddressesForm';

type CheckoutAddressesSectionProps = {
  next: () => void,
};

const CheckoutAddressesSection = (props: CheckoutAddressesSectionProps) => {
  const { next } = props;

  return (
    <CheckoutAddressesForm 
      next={next}
    />
  );
};

export default CheckoutAddressesSection;
