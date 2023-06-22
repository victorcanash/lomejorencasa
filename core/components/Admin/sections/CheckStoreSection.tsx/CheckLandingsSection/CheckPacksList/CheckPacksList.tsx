import { Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';

import Button from '@core/components/inputs/Button';

import type { Landing } from '@core/types/products';

type CheckPacksListProps = {
  landing: Landing,
};

const CheckPacksList = (props: CheckPacksListProps) => {
  const {
    landing,
  } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          <FormattedMessage id="admin.productCategoryGroups" />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          startIcon={<CreateIcon />}
          onClick={() => onClickCreateBtn(true)}
        >
          <FormattedMessage
            id="admin.createCategoryBtn"
          />
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default CheckPacksList;
