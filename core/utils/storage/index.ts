export const getLocalStorageItem = (key: string): any | boolean => {
  const storedValue = localStorage.getItem(key);
  if(!storedValue){
      return false;
  }else{
      return storedValue;
  }
};

export const setLocalStorageItem = (key: string, value: string): any | boolean => {
  localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key: string): any | boolean => {
  localStorage.removeItem(key);
};
