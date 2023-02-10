import { ContactTypes } from '@core/constants/contact';

export const getContactTypeCode = (contactName: ContactTypes) => {
  const indexOfS = Object.values(ContactTypes).indexOf(contactName as unknown as ContactTypes);
  const key = Object.keys(ContactTypes)[indexOfS] as keyof typeof ContactTypes;
  return key;
};

export const getContactTypeName = (contactCode: string) => {
  const index = Object.keys(ContactTypes).indexOf(contactCode);
  return index >= 0 ? Object.values(ContactTypes)[index] : '';
};
