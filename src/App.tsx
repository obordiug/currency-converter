import React from 'react';
import './App.scss';

import { Converter } from './Converter';
import { getRateEUR, getRateUSD } from './api/api';

interface State {
  eurRate: number | null,
  usdRate: number | null,
  date: string,
  hasLoadingError: boolean;
  error: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    eurRate: null,
    usdRate: null,
    date: '',
    hasLoadingError: false,
    error: '',
  };

  componentDidMount() {
    getRateEUR()
      .then(rate => {
        this.setState({
          eurRate: +rate[0].rate.toFixed(2),
          date: rate[0].exchangedate,
          hasLoadingError: false,
          error: '',
        });
      })
      .catch(() => {
        this.setState({ hasLoadingError: true, error: 'an error occurred when loading rates' });
      });

    getRateUSD()
      .then(rate => {
        this.setState({
          usdRate: +rate[0].rate.toFixed(2),
          hasLoadingError: false,
          error: '',
        });
      })
      .catch(() => {
        this.setState({ hasLoadingError: true, error: 'an error occurred when loading rates' });
      });
  }

  render() {
    const {
      eurRate, usdRate, date, hasLoadingError, error,
    } = this.state;

    return (
      <div className="App">
        <div className="App__header">
          <div className="logo"></div>
          <div className="rate">
            {hasLoadingError
              ? (
                <div>{error}</div>
              )
              : (
                <>
                  <div>
                    EUR:
                    {' '}
                    {eurRate}
                  </div>
                  <div>
                    USD:
                    {' '}
                    {usdRate}
                  </div>
                </>
              )}
          </div>
        </div>

        <div className="App__content">
          {(eurRate && usdRate) && (
            <Converter
              eurRate={eurRate}
              usdRate={usdRate}
              date={date}
            />
          )}
        </div>

      </div>
    );
  }
}

export default App;
