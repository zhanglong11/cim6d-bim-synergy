export default function(value, mantissa = 4) {
  return value && _.isNumber(value - 0) ? _.ceil(value - 0, mantissa) : 0
}
