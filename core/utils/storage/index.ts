import { Storages } from '@core/constants/storage'

export const getStorageItem = (type: Storages, key: string) => {
  const storage = type === Storages.local ? localStorage : sessionStorage
  const storedValue = storage.getItem(key)
  return storedValue
}

export const setStorageItem = (type: Storages, key: string, value: string) => {
  const storage = type === Storages.local ? localStorage : sessionStorage
  storage.setItem(key, value)
}

export const removeStorageItem = (type: Storages, key: string) => {
  const storage = type === Storages.local ? localStorage : sessionStorage
  storage.removeItem(key)
}
