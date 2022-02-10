import React from 'react';
import './Converter.scss';

interface State {
  valueFrom: string,
  valueTo: string,
  rateFrom: string,
  rateTo: string,
}

type Props = {
  eurRate: number,
  usdRate: number,
  date: string,
};

export class Converter extends React.Component<Props, State> {
  state = {
    valueFrom: '',
    valueTo: '',
    rateFrom: 'UAH',
    rateTo: 'UAH',
  };

  exchangeRates = (
    rate1: string, rate2: string, value: string, rateEur:number, rateUsd: number,
  ) => {
    let result;

    if (rate1 === rate2) {
      result = +value * 1;
    } else if (rate1 === 'UAH' && rate2 !== 'UAH') {
      result = rate2 === 'USD' ? +value / rateUsd : +value / rateEur;
    } else if (rate1 === 'USD' && rate2 !== 'USD') {
      result = rate2 === 'UAH' ? +value * rateUsd : +value * (rateUsd / rateEur);
    } else if (rate1 === 'EUR' && rate2 !== 'EUR') {
      result = rate2 === 'UAH' ? +value * rateEur : +value * (rateEur / rateUsd);
    }

    return result;
  };

  handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ valueFrom: event.target.value });
    this.setState((state) => ({
      valueTo: state.valueFrom
        ? String(this.exchangeRates(
          state.rateFrom, state.rateTo, state.valueFrom, this.props.eurRate, this.props.usdRate,
        )?.toFixed(2))
        : '',
    }));
  };

  handleChangeSelectFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      rateFrom: event.target.value,
    });
    this.setState((state) => ({
      valueTo: state.valueFrom
        ? String(this.exchangeRates(
          state.rateFrom, state.rateTo, state.valueFrom, this.props.eurRate, this.props.usdRate,
        )?.toFixed(2))
        : '',
    }));
  };

  handleChangeSelectTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      rateTo: event.target.value,
    });
    this.setState((state) => ({
      valueTo: state.valueFrom
        ? String(this.exchangeRates(
          state.rateFrom, state.rateTo, state.valueFrom, this.props.eurRate, this.props.usdRate,
        )?.toFixed(2))
        : '',
    }));
  };

  render() {
    const {
      valueFrom, valueTo, rateFrom, rateTo,
    } = this.state;

    return (
      <div className="converter">
        <input
          type="number"
          min="0"
          name="valueFrom"
          className="converter__input"
          placeholder="Amount"
          value={valueFrom}
          onChange={this.handelChange}
        />

        <select
          name="ratesName"
          className="converter__select"
          value={rateFrom}
          onChange={this.handleChangeSelectFrom}
        >
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <input
          type="number"
          name="valueTo"
          className="converter__input converter__input--readonly"
          value={valueTo}
          readOnly
        />

        <select
          name="ratesName"
          className="converter__select"
          value={rateTo}
          onChange={this.handleChangeSelectTo}
        >
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <div className="converter__text">
          At the rate of the NBU on
          {' '}
          {this.props.date}
        </div>
      </div>
    );
  }
}
