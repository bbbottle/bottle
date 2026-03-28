import { API_ENDPOINT } from '@/constants/routes';
import { FontType } from '@/types/font';
import { getStableDeviceId } from './fingerprints';

type Fetcher = (resource: string, init?: any) => Promise<any>;

export const floatNumberToPercentageString = (num: number): string => {
  return `${num * 100}%`;
};

export const baseFetcher = async (resource: string, init: RequestInit = {}) => {
  const headers = new Headers(init.headers || {});
  const fp = await getStableDeviceId();
  headers.set('X-Device-Fingerprint', fp.id);
  return fetch(resource, {
    ...init,
    headers,
    mode: 'cors',
  }).then(res => {
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return res.json();
  });
};

export const withBBApi =
  (fetcher: Fetcher) =>
  (apiEndPoint: string): Fetcher =>
  async (resource: string, init: RequestInit = {}) =>
    fetcher(`${apiEndPoint}/${resource}`, { ...init, mode: 'cors' });

export const cfApiFetcher = withBBApi(baseFetcher)(API_ENDPOINT);

export const changeFont = (type: FontType) => {
  const rootDiv = document.getElementById('root');
  if (rootDiv == null) {
    return;
  }

  if (rootDiv.classList.contains(type)) {
    return;
  }

  // remove all font type class
  for (const fontType in FontType) {
    rootDiv.classList.remove(fontType);
  }

  rootDiv.classList.add(type);

  // save font type to local storage
  localStorage.setItem('font', type);
};
