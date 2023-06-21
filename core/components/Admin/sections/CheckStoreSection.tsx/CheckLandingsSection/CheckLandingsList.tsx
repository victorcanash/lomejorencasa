import { Fragment } from 'react';

import type { Landing } from '@core/types/products';
import CheckLandingDetail from './CheckLandingDetail';

type CheckLandingsListProps = {
  landings: Landing[],
  onClickUpdateBtn: (landing: Landing) => void,
};

const CheckLandingsList = (props: CheckLandingsListProps) => {
  const {
    landings,
    onClickUpdateBtn,
  } = props;

  return (
    <>
      { landings.map((landing) => (
        <Fragment key={landing.id}>
          <CheckLandingDetail
            landing={landing}
            onClickUpdateBtn={onClickUpdateBtn}
          />
        </Fragment>
      ))}
    </>
  );
};

export default CheckLandingsList;
