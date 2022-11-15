import ManageUAddressesForm from '@components/forms/user/ManageUAddressesForm';

type CheckoutAddressesSectionProps = {
  next: () => void,
};

const CheckoutAddressesSection = (props: CheckoutAddressesSectionProps) => {
  const { next } = props;

  return (
    <ManageUAddressesForm 
      onSubmitSuccess={next}
    />
  );
};

export default CheckoutAddressesSection;
