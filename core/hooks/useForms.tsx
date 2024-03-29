import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { FormFieldTypes } from '@core/constants/forms';
import { CountryOptions } from '@core/constants/addresses';
import type { FormField } from '@core/types/forms';
import { getCountryName } from '@core/utils/addresses';
import { subtractYears } from '@core/utils/dates';

const useForms = () => {
  const intl = useIntl();

  const initForms = () => {
    Yup.setLocale({
      mixed: {
        default: intl.formatMessage({ id: 'forms.errors.default' }),
        required: intl.formatMessage({ id: 'forms.errors.required' }),
      },
      string: {
        min: ({ min }) => (intl.formatMessage({ id: 'forms.errors.minString' }, { min })),
        max: ({ max }) => (intl.formatMessage({ id: 'forms.errors.maxString' }, { max })),
        email: intl.formatMessage({ id: 'forms.errors.email' }),
      },
      number: {
        min: ({ min }) => (intl.formatMessage({ id: 'forms.errors.minNumber' }, { min })),
        max: ({ max }) => (intl.formatMessage({ id: 'forms.errors.maxNumber' }, { max })),
      },
    });
  };

  // Custom fields validation and init values

  const userFieldsValidation = {
    email: Yup
      .string()
      .email()
      .required(),
    password: Yup
      .string()
      .min(8)
      .required(),
    confirm: (passwordKey: string) => {
      return Yup
        .string()
        .when(passwordKey, {
          is: (value: string) => (value && value.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref(passwordKey)],
            intl.formatMessage({ id: 'forms.errors.confirmPassword' }),
          ),
        })
        .required('You must confirm your password');
    },
    firstName: Yup
      .string()
      .min(2)
      .max(50)
      .required(),
    lastName: Yup
      .string()
      .min(2)
      .max(50)
      .required(),
    birthday: Yup
      .date()
      .max(
        subtractYears(14), 
        intl.formatMessage(
          { id: 'forms.errors.maxBirthday' }, 
          { minYears: 14 }
        )
      )
      .nullable()
      .required(),
    getEmails: Yup
      .boolean(),
    remember: Yup
      .boolean(),
    tlf: Yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
      ),
    comments: Yup
      .string()
      .min(1)
      .required(),
    acceptPolicy: Yup
      .boolean(),
  };

  const userFieldsInitValues = { 
    email: '',
    password: '',
    confirm: '',
    firstName: '',
    lastName: '',
    birthday: dayjs(subtractYears(18)),
    getEmails: true,
    remember: true,
    tlf: '',
    comments: '',
    acceptPolicy: false,
  };

  const contactFieldsValidation = {
    type: Yup
      .string()
      .min(3)
      .required(),
  };

  const addressFieldsValidation = {
    firstName: userFieldsValidation.firstName,
    lastName: userFieldsValidation.lastName,
    addressLine1: Yup
      .string()
      .min(3)
      .max(95)
      .required(),
    addressLine2: Yup
      .string()
      .min(3)
      .max(95),
    postalCode: Yup
      .string()
      .min(5)
      .max(7)
      .required(),
    locality: Yup
      .string()
      .min(3)
      .max(35)
      .required(),
    country: Yup
      .string()
      .min(3)
      .max(35)
      .required(),
  };

  const addressFieldsInitValues = { 
    firstName: userFieldsInitValues.firstName,
    lastName: userFieldsInitValues.lastName,
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    locality: '',
    country: getCountryName(Object.keys(CountryOptions)[0]),
  };

  const orderFieldsValidation = {
    id: Yup
      .number()
      .min(0)
      .required(),
    bigbuyId: Yup
      .string()
      .min(1),
    userId: Yup
      .number()
      .min(0),
    guestUserEmail: Yup
      .string()
      .min(1),
    paypalTransactionId: Yup
      .string()
      .min(1)
      .required(),
    notes: Yup
      .string(),
    currency: Yup
      .string(),
  };

  const orderFieldsInitValues = {
    id: 0,
    bigbuyId: '',
    userId: 0,
    guestUserEmail: '',
    paypalTransactionId: '',
    notes: '',
    currency: 'EUR',
  };

  const orderProductFieldsValidation = {
    quantity: Yup
      .number()
      .min(1)
      .required(),
    inventoryId: Yup
      .number()
      .min(0)
      .required(),
  };

  const orderProductFieldsInitValues = {
    quantity: 1,
    inventoryId: -1,
    packId: -1,
  };

  const couponFieldsInitValues = {
    couponCode: '',
  };

  const reviewFieldsValidation = {
    rating: Yup
      .string()
      .required(),
    title: Yup
      .string()
      .min(3)
      .max(35),
    description: Yup
      .string()
      .min(3)
      .required(),
    publicName: Yup
      .string()
      .min(3)
      .max(101)
      .required(), 
  };

  const reviewFieldsInitValues = {
    rating: 5,
    title: '',
    description: '',
    publicName: '',
  };

  const localizedTextsFieldsValidation = {
    en: Yup
      .string()
      .min(1)
      .required(),
    es: Yup
      .string()
      .min(1)
      .required(),
  };

  const localizedTextsFieldsInitValues = {
    en: '',
    es: '',
  };

  const emailsFieldsValidation = {
    emailType: Yup
      .string()
      .min(3)
      .required(),
    locale: Yup
      .string()
      .min(2)
      .max(5)
      .required(),
  };

  const emailsFieldsInitValues = {
    locale: 'es', // intl.defaultLocale,
  };

  const categoryFieldsValidation = {
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
    slug: Yup
      .string()
      .min(1)
      .required(),
    image: Yup
      .string()
      .min(1)
  };

  const categoryFieldsInitValues = {
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
    slug: '',
    image: '',
  };

  const landingFieldsValidation = {
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
    slug: Yup
      .string()
      .min(1)
      .required(),
  };

  const landingFieldsInitValues = {
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
    slug: '',
  };

  const productFieldsValidation = {
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
  };

  const productFieldsInitValues = {
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
  };

  const inventoryFieldsValidation = {
    sku: Yup
      .string()
      .required(),
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
    price: Yup
      .number()
      .min(0)
      .required(),
    quantity: Yup
      .number()
      .min(0)
      .required(),
    image: Yup
      .string()
      .min(1),
    metaId: Yup
      .string()
      .min(1),
  };

  const inventoryFieldsInitValues = {
    sku: '',
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
    price: 0,
    quantity: 0,
    image: '',
    metaId: '',
  };

  const discountFieldsValidation = {
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
    discountPercent: Yup
      .number()
      .min(0.1)
      .required(),
    active: Yup
      .boolean()
  };

  const discountFieldsInitValues = {
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
    discountPercent: 0.1,
    active: false,
  };

  const packFieldsValidation = {
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
    price: Yup
      .number()
      .min(0)
      .required(),
    image: Yup
      .string()
      .min(1),
    metaId: Yup
      .string()
      .min(1),
  };

  const packFieldsInitValues = {
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
    price: 0,
    image: '',
    metaId: '',
  };

  const packInventoryFieldsValidation = {
    id: Yup
      .number()
      .min(0)
      .required(),
  };

  const packInventoryFieldsInitValues = {
    id: 0,
  };

  // Custom forms validation

  const loginFormValidation = Yup.object().shape({
    email: userFieldsValidation.email,
    password: userFieldsValidation.password,
    remember: userFieldsValidation.remember,
  });
  
  const registerFormValidation = Yup.object().shape({
    email: userFieldsValidation.email,
    password: userFieldsValidation.password,
    confirm: userFieldsValidation.confirm('password'),
    firstName: userFieldsValidation.firstName,
    lastName: userFieldsValidation.lastName,
    birthday: userFieldsValidation.birthday,
    getEmails: userFieldsValidation.getEmails,
  });
  
  const sendEmailFormValidation = Yup.object().shape({
    email: userFieldsValidation.email,
  });
  
  const updateEmailFormValidation = Yup.object().shape({
    password: userFieldsValidation.password,
    newEmail: userFieldsValidation.email,
  });
  
  const resetPasswordFormValidation = Yup.object().shape({
    newPassword: userFieldsValidation.password,
    newConfirm: userFieldsValidation.confirm('newPassword'),
  });

  const updateUserFormValidation = Yup.object().shape({
    firstName: userFieldsValidation.firstName,
    lastName: userFieldsValidation.lastName,
    birthday: userFieldsValidation.birthday,
    getEmails: userFieldsValidation.getEmails,
  });

  const checkoutContactFormValidation = Yup.object().shape({
    shipping: Yup.object().shape(addressFieldsValidation),
    billing: Yup.object().when('sameAsShipping', {
      is: (sameAsShipping: boolean) => !sameAsShipping,
      then: Yup.object().shape(addressFieldsValidation),
    }),
    sameAsShipping: Yup
      .boolean(),
    checkoutEmail: userFieldsValidation.email,
    notes: orderFieldsValidation.notes,
  });

  const couponFormValidation = Yup.object().shape({
    couponCode: Yup
      .string()
      .required(),
  });

  const productReviewFormValidation = Yup.object().shape({
    rating: reviewFieldsValidation.rating,
    title: reviewFieldsValidation.title,
    description: reviewFieldsValidation.description,
    email: userFieldsValidation.email,
    publicName: reviewFieldsValidation.publicName,
  });

  const userContactFormValidation = Yup.object().shape({
    firstName: userFieldsValidation.firstName,
    email: userFieldsValidation.email,
    comments: userFieldsValidation.comments,
    acceptPolicy: userFieldsValidation.acceptPolicy,
  });

  const userResolutionFormValidation = Yup.object().shape({
    type: contactFieldsValidation.type,
    email: userFieldsValidation.email,
    firstName: userFieldsValidation.firstName,
    orderId: orderFieldsValidation.bigbuyId,
    comments: userFieldsValidation.comments,
  });

  const getOrderFormValidation = Yup.object().shape({
    orderId: orderFieldsValidation.bigbuyId,
    guestUserEmail: orderFieldsValidation.guestUserEmail,
  });

  const createFailedOrderFormValidation = Yup.object().shape({
    locale: emailsFieldsValidation.locale,
    paypalTransactionId: orderFieldsValidation.paypalTransactionId,
    currency: orderFieldsValidation.currency,
    checkoutEmail: userFieldsValidation.email,
    notes: orderFieldsValidation.notes,
    shipping: Yup.object().shape(addressFieldsValidation),
  });
  
  const createFailedOrderProductFormValidation = Yup.object().shape({
    quantity: orderProductFieldsValidation.quantity,
    inventoryId: orderProductFieldsValidation.inventoryId,
  });

  const sendOrderEmailFormValidation = Yup.object().shape({
    bigbuyId: orderFieldsValidation.bigbuyId,
    locale: emailsFieldsValidation.locale,
    emailType: emailsFieldsValidation.emailType,
  });
  
  const sendFailedOrderEmailFormValidation = Yup.object().shape({
    orderId: orderFieldsValidation.id,
    locale: emailsFieldsValidation.locale,
    currency: orderFieldsValidation.currency,
  });

  const manageCategoryFormValidation = Yup.object().shape({
    name: categoryFieldsValidation.name,
    description: categoryFieldsValidation.description,
    slug: categoryFieldsValidation.slug,
    image: categoryFieldsValidation.image,
  });

  const manageLandingFormValidation = Yup.object().shape({
    name: landingFieldsValidation.name,
    description: landingFieldsValidation.description,
    slug: landingFieldsValidation.slug,
  });

  const manageProductFormValidation = Yup.object().shape({
    name: productFieldsValidation.name,
    description: productFieldsValidation.description,
  });

  const manageInventoryFormValidation = Yup.object().shape({
    sku: inventoryFieldsValidation.sku,
    name: inventoryFieldsValidation.name,
    description: productFieldsValidation.description,
    price: inventoryFieldsValidation.price,
    quantity: inventoryFieldsValidation.quantity,
    image: packFieldsValidation.image,
    metaId: packFieldsValidation.metaId,
  });

  const manageDiscountFormValidation = Yup.object().shape({
    name: discountFieldsValidation.name,
    description: discountFieldsValidation.description,
    discountPercent: discountFieldsValidation.discountPercent,
    active: discountFieldsValidation.active,
  });

  const managePackFormValidation = Yup.object().shape({
    name: packFieldsValidation.name,
    description: packFieldsValidation.description,
    price: packFieldsValidation.price,
    image: packFieldsValidation.image,
    metaId: packFieldsValidation.metaId,
  });

  const managePackInventoryFormValidation = Yup.object().shape({
    id: packInventoryFieldsValidation.id,
  });

  // Custom form fields

  const addressFormFields = (name: string, autoFocus?: boolean) => {
    return [
      {
        name: `${name}.firstName`,
        type: FormFieldTypes.text,
        required: true,
        autoFocus: autoFocus,
        autoComplete: 'firstName',
      },
      {
        name: `${name}.lastName`,
        type: FormFieldTypes.text,
        required: true,
        autoComplete: 'lastName',
      },
      {
        name: `${name}.addressLine1`,
        type: FormFieldTypes.text,
        required: true,
        autoComplete: 'addressLine1',
      },
      {
        name: `${name}.addressLine2`,
        type: FormFieldTypes.text,
        autoComplete: 'addressLine2',
      },
      {
        name: `${name}.postalCode`,
        type: FormFieldTypes.text,
        required: true,
        autoComplete: 'postalCode',
      },
      {
        name: `${name}.locality`,
        type: FormFieldTypes.text,
        required: true,
        autoComplete: 'city',
      },
      {
        name: `${name}.country`,
        type: FormFieldTypes.select,
        required: true,
        menuItems: Object.keys(CountryOptions).map((countryKey) => {
          return {
            text: {
              id: countryKey,
            },
            value: getCountryName(countryKey),
          };
        }),
      },
    ] as FormField[];
  };

  return {
    initForms,
    
    userFieldsInitValues,
    addressFieldsInitValues,
    orderFieldsInitValues,
    orderProductFieldsInitValues,
    couponFieldsInitValues,
    reviewFieldsInitValues,
    emailsFieldsInitValues,
    categoryFieldsInitValues,
    landingFieldsInitValues,
    productFieldsInitValues,
    inventoryFieldsInitValues,
    discountFieldsInitValues,
    packFieldsInitValues,
    packInventoryFieldsInitValues,

    loginFormValidation,
    registerFormValidation,
    sendEmailFormValidation,
    updateEmailFormValidation,
    resetPasswordFormValidation,
    updateUserFormValidation,
    userContactFormValidation,
    userResolutionFormValidation,
    checkoutContactFormValidation,
    couponFormValidation,
    productReviewFormValidation,
    getOrderFormValidation,
    createFailedOrderFormValidation,
    createFailedOrderProductFormValidation,
    sendOrderEmailFormValidation,
    sendFailedOrderEmailFormValidation,
    manageCategoryFormValidation,
    manageLandingFormValidation,
    manageProductFormValidation,
    manageInventoryFormValidation,
    manageDiscountFormValidation,
    managePackFormValidation,
    managePackInventoryFormValidation,

    addressFormFields,
  }
};

export default useForms;
