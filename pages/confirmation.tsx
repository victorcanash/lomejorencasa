import type { NextPage } from 'next';

import Container from '@mui/material/Container';

import { PageTypes } from '@core/constants/navigation';

import { ActivationProps, getActivationProps } from '@lib/server/activation';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
// import ActivationForm from '@components/forms/auth/ActivationForm';

const Confirmation: NextPage<ActivationProps> = (props) => {
  const { successMsg, errorMsg } = props;

  const page = usePage();

  return (
    <>
      <PageHeader
        pageType={PageTypes.link}
        metas={{
          titleId: 'confirmation.metas.title',
          descriptionId: 'confirmation.metas.description',
        }}
      />

      <Container>
        {/*<ActivationForm 
          successMsg={successMsg}
          errorMsg={errorMsg}
        />*/}
      </Container>
    </>
  );
};

export default Confirmation;

export const getServerSideProps = getActivationProps;
