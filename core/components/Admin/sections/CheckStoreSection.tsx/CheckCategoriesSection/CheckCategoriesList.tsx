import { Fragment } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';

import type { CheckCategory, CheckCategoryGroup } from '@core/types/admin';
import { useAdminContext } from '@core/contexts/AdminContext';
import Button from '@core/components/inputs/Button';
import CheckCategoryDetail from './CheckCategoryDetail';

type CheckCategoriesListProps = {
  onClickSelectBtn: (checkCategory: CheckCategory) => void,
  onClickCreateBtn: (isGroup: boolean, groupId?: number) => void,
  onClickUpdateBtn: (checkCategory: CheckCategory | CheckCategoryGroup) => void,
};

const  CheckCategoriesList = (props: CheckCategoriesListProps) => {
  const {
    onClickSelectBtn,
    onClickCreateBtn,
    onClickUpdateBtn,
  } = props;

  const {
    checkCategoryGroups,
    checkCategoriesWithoutGroup,
  } = useAdminContext();

  const intl = useIntl();

  return (
    <>
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
          { checkCategoryGroups.map((checkCategoryGroup) => (
            <Fragment key={checkCategoryGroup.categoryGroup.id}>
              <CheckCategoryDetail
                checkCategory={checkCategoryGroup}
                onClickSelectBtn={onClickSelectBtn}
                onClickUpdateBtn={onClickUpdateBtn}
              />
              <Typography component="div" variant="body1">
                {`${intl.formatMessage({ id: 'forms.categories' })}:`}
              </Typography>
              <Box ml={2}>
                <Button
                  startIcon={<CreateIcon />}
                  onClick={() => onClickCreateBtn(false, checkCategoryGroup.categoryGroup.id)}
                >
                  <FormattedMessage
                    id="admin.createCategoryBtn"
                  />
                </Button>
                { checkCategoryGroup.checkCategories.map((checkCategory) => (
                  <Fragment key={checkCategory.category.id}>
                    <CheckCategoryDetail
                      checkCategory={checkCategory}
                      onClickSelectBtn={onClickSelectBtn}
                      onClickUpdateBtn={onClickUpdateBtn}
                    />
                  </Fragment>
                ))}
              </Box>
            </Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>
            <FormattedMessage id="admin.productCategoriesWithoutGroup" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            startIcon={<CreateIcon />}
            onClick={() => onClickCreateBtn(false)}
          >
            <FormattedMessage
              id="admin.createCategoryBtn"
            />
          </Button>
          { checkCategoriesWithoutGroup.map((checkCategory) => (
            <Fragment key={checkCategory.category.id}>
              <CheckCategoryDetail
                checkCategory={checkCategory}
                onClickSelectBtn={onClickSelectBtn}
                onClickUpdateBtn={onClickUpdateBtn}
              />
            </Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CheckCategoriesList;
