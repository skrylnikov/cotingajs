import Cotinga from '../';
import {FactorialInput, FactorialOutput} from './types';

Cotinga.initModule<FactorialInput, FactorialOutput>((data) => {
  const result = data.data.map((x) => {
    let result = 1;
    for (let i = 1; i <= x; i++) {
      result *= i;
    }
    let c = 0;
    for (let i = 0; i <= result; i++) {
      c += i;
    }
    return c;
  });
  return {
    result,
  };
})





