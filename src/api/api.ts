const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const getRate = (): Promise<Rate[]> => {
  return fetch(`${BASE_URL}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error());
      }

      return response.json();
    });
};

export const getRateEUR = () => {
  return getRate()
    .then(rates => rates.filter(rate => rate.cc === 'EUR'));
};

export const getRateUSD = () => {
  return getRate()
    .then(rates => rates.filter(rate => rate.cc === 'USD'));
};
