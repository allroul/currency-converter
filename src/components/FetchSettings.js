let myHeaders = new Headers();
myHeaders.append('apikey', 'qbYJYyUnKOcTAhPBH0dNG5Ufkbkoofri');
export const requestUrl = 'https://api.apilayer.com/exchangerates_data/latest';

export const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};
