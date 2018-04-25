import Cotinga from "../";
import {FactorialInput, FactorialOutput} from './types';


const factorial = Cotinga.registerModule<FactorialInput, FactorialOutput>('dist/example/factorial');

(async () => {
  console.log('module start')
  const result = await factorial({
    data: [
      13
    ]
  })
  console.log(result);
  console.log('module start')
  const result1 = await factorial({
    data: [
      5
    ]
  })
  console.log(result1);
  console.log('module start')
  const result2 = await factorial({
    data: [
      13
    ]
  })
  console.log(result2);
})()

setInterval(() => console.log('ping'), 500);
