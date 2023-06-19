import { SyntheticEvent, useState, Fragment } from 'react';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAdminContext } from '@core/contexts/AdminContext';
import CategoryDetail from '@core/components/Admin/details/CategoryDetail';

type CheckStoreSectionProps = {
  getCategoryDetails: (slug: string) => Promise<void>,
};

const CheckStoreSection = (props: CheckStoreSectionProps) => {
  const {
    getCategoryDetails,
  } = props;

  const {
    categoryGroups,
    categoriesWithoutGroup,
  } = useAdminContext();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) =>
    (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      <Accordion expanded={expanded === 'categoryGroups'} onChange={handleChange('categoryGroups')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>
            Product Category Groups
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          { categoryGroups.map((checkCategoryGroup) => (
            <Fragment key={checkCategoryGroup.categoryGroup.id}>
              <CategoryDetail
                key={checkCategoryGroup.categoryGroup.id}
                category={checkCategoryGroup.categoryGroup}
                created={true}
              />
            </Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'categoryGroups'} onChange={handleChange('categoryGroups')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>
            Product Categories Without Group
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          { categoriesWithoutGroup.map((checkCategory) => (
            <Fragment key={checkCategory.category.id}>
              <CategoryDetail
                key={checkCategory.category.id}
                category={checkCategory.category}
                created={true}
              />
            </Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckStoreSection;
