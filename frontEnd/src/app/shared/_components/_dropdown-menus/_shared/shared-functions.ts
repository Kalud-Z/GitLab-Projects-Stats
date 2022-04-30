import { localStorageFilterType } from './shared-types';


export function updateLocalStorage(type: localStorageFilterType, value: any) {
  localStorage.setItem(type, JSON.stringify(value));
}


export function fetchFromLocalStorage(type: localStorageFilterType) : any {
  return JSON.parse(localStorage.getItem(type));
}
