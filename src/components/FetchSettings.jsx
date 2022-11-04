let myHeaders = new Headers();
myHeaders.append('apikey', 'bk7zknZiHr6OKyMwK213PV55EjRovC8j');
export const requestUrl = 'https://api.apilayer.com/exchangerates_data/latest';

export const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};
