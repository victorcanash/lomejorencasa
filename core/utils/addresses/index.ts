import { CountryOptions } from '@core/constants/addresses';

export const getCountryCode = (countryName: CountryOptions) => {
  const indexOfS = Object.values(CountryOptions).indexOf(countryName as unknown as CountryOptions);
  const key = Object.keys(CountryOptions)[indexOfS] as keyof typeof CountryOptions;
  return key;
};

export const getCountryName = (countryCode: string) => {
  const index = Object.keys(CountryOptions).indexOf(countryCode);
  return index >= 0 ? Object.values(CountryOptions)[index] : '';
};
