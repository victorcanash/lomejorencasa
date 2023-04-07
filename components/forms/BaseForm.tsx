import { useState } from 'react';

import { 
  Formik, 
  Form as FormikForm, 
  FormikProps, 
  FormikHelpers, 
  getIn 
} from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { FormFieldTypes } from '@core/constants/forms';
import type { FormField } from '@core/types/forms';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import type { FormBase, FormButtonsNormal, FormButtonsCheckout } from '@lib/types/forms';
import ConfirmDialog from '@components/dialogs/ConfirmDialog';

const BaseForm = (props: FormBase) => {
  const {
    maxWidth,
    initialValues,
    validationSchema,
    enableReinitialize,
    validateOnMount,
    onChange,
    formFieldGroups,
    formButtons,
    successMsg,
    errorMsg,
    linksItems,
    formikRef,
  } = props;

  const intl = useIntl();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (onChange) {
      onChange(event);
    }
  };

  const formButtonsNormal = () => {
    return formButtons as FormButtonsNormal;
  };

  const formButtonsCheckout = () => {
    return formButtons as FormButtonsCheckout;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    let dirty = false;
    if (initialValues) {
      const keys = Object.keys(initialValues);
      keys.forEach((key) => {
        if (initialValues[key] != values[key]) {
          dirty = true;
          return;
        }
      });
    }
    formButtons?.submit?.onSubmit(values, formikHelpers, dirty);
  };

  const handleDelete = () => {
    if (formButtonsNormal().delete?.confirm?.enabled) {
      handleDialog();
    } else {
      formButtonsNormal().delete?.onClick();
    }
  };

  const onConfirmDelete = () => {
    formButtonsNormal().delete?.onClick();
  };

  const handleCancel = () => {
    formButtonsNormal().cancel?.onClick();
  };

  const handleBack = () => {
    formButtonsCheckout().back?.onClick();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFormField = (props: FormikProps<any>, formField: FormField) => {
    if (formField.type == FormFieldTypes.text || 
        formField.type == FormFieldTypes.password ||
        formField.type == FormFieldTypes.multiline) { 
      return (
        <TextField
          margin="normal"
          required={formField.required}
          fullWidth
          id={formField.name}
          name={formField.name}
          type={formField.type == FormFieldTypes.password ? 'password' : undefined}
          multiline={formField.type == FormFieldTypes.multiline ? true : undefined}
          rows={formField.type == FormFieldTypes.multiline ? 4 : undefined}
          autoComplete={formField?.autoComplete || formField.name}
          label={intl.formatMessage({ id: `forms.${formField.name}` })}
          autoFocus={formField.autoFocus}
          disabled={formField.disabled}
          value={getIn(props.values, formField.name)}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          error={getIn(props.touched, formField.name) && Boolean(getIn(props.errors, formField.name))}
          helperText={getIn(props.touched, formField.name) && getIn(props.errors, formField.name) as string}
        />
      );
    } else if (formField.type == FormFieldTypes.numeric || 
               formField.type == FormFieldTypes.decimal) { 
      return (
        <TextField
          margin="normal"
          required={formField.required}
          fullWidth
          id={formField.name}
          name={formField.name}
          type={formField.type}
          inputProps={{
            min: formField.min || 0,
            max: formField.max,
            inputMode: formField.type,
          }} 
          InputProps={ 
            formField.adornment ? {
              startAdornment: formField.adornment.position == 'start' ? 
                <InputAdornment position="start">{formField.adornment.value}</InputAdornment> 
                : undefined,
              endAdornment: formField.adornment.position == 'end' ? 
                <InputAdornment position="end">{formField.adornment.value}</InputAdornment> 
                : undefined,
            } : undefined}
          autoComplete={formField?.autoComplete || formField.name}
          label={intl.formatMessage({ id: `forms.${formField.name}` })}
          autoFocus={formField.autoFocus}
          disabled={formField.disabled}
          value={getIn(props.values, formField.name)}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          error={getIn(props.touched, formField.name) && Boolean(getIn(props.errors, formField.name))}
          helperText={getIn(props.touched, formField.name) && getIn(props.errors, formField.name) as string}
        />
      );
    } else if (formField.type == FormFieldTypes.checkbox) { 
      return (
        <FormControlLabel
          label={intl.formatMessage({ id: `forms.${formField.name}` })}
          control={
            <Checkbox 
              id={formField.name}
              name={formField.name}
              disabled={formField.disabled}
              checked={getIn(props.values, formField.name)}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          }
        />
      );
    } else if (formField.type == FormFieldTypes.datePicker) {
      return (
        <DatePicker                      
          label={intl.formatMessage({ id: `forms.${formField.name}` })}
          disableFuture
          openTo="year"
          views={['year', 'month', 'day']}
          disabled={formField.disabled}
          value={getIn(props.values, formField.name)}
          onChange={(value) => {
            props.setFieldValue(formField.name, value, true);
          }}
          renderInput={(params) => 
            <TextField 
              {...params}
              margin="normal" 
              required={formField.required}
              fullWidth 
              id={formField.name} 
              name={formField.name}
              autoComplete={formField?.autoComplete || formField.name}
              onBlur={props.handleBlur}               
              error={getIn(props.touched, formField.name) && Boolean(getIn(props.errors, formField.name))}
              helperText={getIn(props.touched, formField.name) && getIn(props.errors, formField.name) as string}                   
            />
          }
        />
      );
    } else if (formField.type == FormFieldTypes.select) {
      return (
        <FormControl
          fullWidth 
          margin="normal"
        >
          <InputLabel id={`${formField.name}-select-label`}>
            <FormattedMessage 
              id={`forms.${formField.name}`}
            />
          </InputLabel>
          <Select
            required={formField.required}
            fullWidth
            id={formField.name}
            name={formField.name}
            labelId={`${formField.name}-select-label`}
            label={intl.formatMessage({ id: `forms.${formField.name}` })}
            disabled={formField.disabled}
            value={getIn(props.values, formField.name)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => { props.handleChange(e); handleChange(e); }}
            onBlur={props.handleBlur}
            error={getIn(props.touched, formField.name) && Boolean(getIn(props.errors, formField.name))}
          >
            { formField.menuItems?.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                <FormattedMessage 
                  id={item.text?.id || item.value.toString()} 
                  defaultMessage={item.value.toString()}
                  values={item.text?.values}
                />
              </MenuItem>
            ))}   
          </Select>
        </FormControl>
      );
    } else if (formField.type == FormFieldTypes.rating) {
      return (
        <>
          <Typography component="legend" mt={1}>
            <FormattedMessage 
              id={`forms.${formField.name}`}
            />
          </Typography>
          <Rating
            id={formField.name}
            name={formField.name}
            disabled={formField.disabled}
            value={getIn(props.values, formField.name)}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: maxWidth ? maxWidth : '500px', 
        margin: 'auto',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={enableReinitialize}
        innerRef={formikRef}
        validateOnMount={validateOnMount}
      >
        { props => (
          <FormikForm
            onChange={handleChange}
            style={{ 
              position: 'relative', 
              width: '100%',
            }}
          >
            <>
              { formFieldGroups && formFieldGroups.length > 0 &&
                <Grid 
                  container 
                  columnSpacing={formFieldGroups.length > 1 ? 5 : undefined}
                  rowSpacing={formFieldGroups.length > 1 ? 1 : undefined}
                >
                  { formFieldGroups.map((group, index) => ( 
                    <Grid
                      key={index} 
                      item 
                      xs={12}
                      //sm={formFieldGroups.length > 1 ? 6 : undefined}
                    >
                      { (group.avatarIcon || group.titleTxt || group.descriptionTxt) &&
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          { group.avatarIcon &&
                            <Avatar 
                              sx={{ 
                                mb: 1,
                                backgroundColor: group.avatarBgColor,
                              }}
                            >
                              { group.avatarIcon }
                            </Avatar>
                          }
                          { group.titleTxt && 
                            <Typography 
                              component={formFieldGroups.length > 1 ? 'h2' : 'h1'}
                              variant="h1" 
                              mb={2}
                              textAlign={group.titleTxt.textAlign}
                            >
                              <FormattedMessage 
                                id={group.titleTxt.id}
                                values={group.titleTxt.values}
                              />
                            </Typography>
                          }
                          { group.descriptionTxt && 
                            <Typography 
                              component={formFieldGroups.length > 1 ? 'h3' : 'h2'}
                              variant="body1" 
                              mb={(group.formFields && group.formFields.length > 0) || group.extraElements ? 1 : 2} 
                              mt={group.titleTxt ? 1 : undefined}
                              textAlign={group.descriptionTxt.textAlign ? group.descriptionTxt.textAlign : undefined}
                            >
                              <FormattedMessage
                                id={group.descriptionTxt.id}
                                values={group.descriptionTxt.values}
                              />
                            </Typography>
                          }
                        </Box>
                      }
                      { group.formFields && group.formFields.length > 0 &&
                        <Box mb={group.formFieldsMb === undefined ? 2 : group.formFieldsMb}>
                          { group.formFields.map((formField) => (
                            <Box key={formField.name}>
                              { getFormField(props, formField) }
                            </Box>
                          ))}
                        </Box>
                      }
                      { group.extraElements &&
                        <Box mb={2}>
                          { group.extraElements }
                        </Box>
                      }
                    </Grid>
                  ))}
                </Grid>
              }

              { (formButtons?.submit || 
                 formButtonsNormal()?.delete || 
                 formButtonsNormal()?.cancel ||
                 formButtonsCheckout()?.back) &&
                <Grid 
                  container
                  spacing={formButtonsCheckout()?.back ? 5 : undefined}
                >
                  { formButtonsCheckout()?.back &&
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                        onClick={handleBack}
                        disabled={formButtonsCheckout().back.disabled}
                      >
                        <FormattedMessage 
                          id={formButtonsCheckout().back.text.id}
                          values={formButtonsCheckout().back.text.values}
                        />
                      </Button>
                    </Grid>
                  }
                  { formButtons?.submit &&
                    <Grid 
                      item 
                      xs={formButtonsCheckout()?.back ? 6 : 12}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                        disabled={formButtons.submit.disabled}
                      >
                        <FormattedMessage 
                          id={formButtons.submit.text.id}
                          values={formButtons.submit.text.values}
                        />
                      </Button>
                    </Grid>
                  }
                  { formButtonsNormal()?.delete &&
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                        onClick={handleDelete}
                        disabled={formButtonsNormal().delete?.disabled}
                      >
                        <FormattedMessage 
                          id={formButtonsNormal().delete?.text.id}
                          values={formButtonsNormal().delete?.text.values}
                        />
                      </Button>
                    </Grid>
                  }
                  { formButtonsNormal()?.cancel &&
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                        onClick={handleCancel}
                        disabled={formButtonsNormal().cancel?.disabled}
                      >
                        <FormattedMessage 
                          id={formButtonsNormal().cancel?.text.id}
                          values={formButtonsNormal().cancel?.text.values}
                        />
                      </Button>
                    </Grid>
                  }
                </Grid>
              }

              { errorMsg &&
                <Alert severity="error" sx={{ mb: 2 }}>{ errorMsg }</Alert>
              }  
              { successMsg &&
                <Alert sx={{ mb: 2 }}>{ successMsg }</Alert>
              }

              { linksItems && linksItems.length > 0 &&
                <Grid 
                  container
                  sx={{
                    justifyContent: 'space-between',
                    flexWrap: 'nowrap',
                  }}
                >
                  { linksItems.map((linkElement, index) => (
                    <Grid item key={index} mb={2}>
                      <Link href={linkElement.path || pages.home.path} variant="body1">
                        <FormattedMessage 
                          id={linkElement.text.id} 
                          values={linkElement.text.values}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>  
              }

              <Box mb={-2} />
            </>
          </FormikForm>
        )}
      </Formik>

      { formButtonsNormal()?.delete?.confirm?.enabled &&
        <ConfirmDialog
          open={openDialog}
          handleDialog={handleDialog}
          onConfirm={onConfirmDelete}
        />
      }
    </Box>
  );
};

export default BaseForm;
