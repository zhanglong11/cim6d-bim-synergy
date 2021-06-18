/**
 * @class 进度条刻度
 */
export default class Ticks {
  /**
   *
   * @typedef { any } TickValue
   */
  /**
   * @callback TickValueChangeMethod
   * @param {TickValue} 初始值
   * @param {amount} 刻度数量
   * @return {TickValue} 计算后结果
   *
   */

  /**
   * @callback TickValueStringifyMethod
   * @param {TickValue} 刻度值
   * @param {string} 刻度值对应字符串
   */

  /**
   *
   * @param {number} count 刻度的数量
   * @param {TickValue} initialValue 刻度起始值
   * @param {TickValueChangeMethod} additionMethod 值增加方法
   * @param {TickValueStringifyMethod=} stringifyMethod 值转化为字符串方法
   */
  constructor(count, initialValue, additionMethod, stringifyMethod = x => x.toString()) {
    /**@member {number} 刻度数量*/
    this.tickCounts = count
    /**@member {TickValue} 刻度初始值*/
    this.initialValue = initialValue
    /**@member {TickValueChangeMethod} 值增加的方法*/
    this._add = additionMethod
    /**@member {TickValueStringifyMethod} */
    this._toString = stringifyMethod
  }

  /**
   *
   * @param {number} number tick数量
   */
  setTickCounts(count) {
    this.tickCounts = count
  }

  /**
   * @return {number} 刻度数量
   */
  getTickCounts() {
    return this.tickCounts
  }

  /**
   * @param {TickValue} 初始值
   */
  setInitialValue(initialValue) {
    this.initialValue = initialValue
  }

  /**
   * 获取位移后刻度值
   * @param {number} offset 刻度偏移量
   * @return {TickValue}
   */
  getValueAt(offset) {
    if (offset < 0 || offset > this.tickCounts - 1)
      throw RangeError('offset can be nor negative of greater than tickscount - 1')
    return this._add(this.initialValue, offset)
  }

  /**
   *
   * @param {TickValueChangeMethod} additionMethod
   */
  setAdditionMethod(additionMethod) {
    this._add = additionMethod
  }

  /**
   *
   * @param {TickValueStringifyMethod} stringifyMethod
   */
  setStringifyMethod(stringifyMethod) {
    this._toString = stringifyMethod
  }

  /**
   * 获取位移后的刻度值对应的字符串
   * @param {number} offset
   * @returns {string}
   */
  getValueStringAt(offset) {
    return this._toString(this._add(this.initialValue, offset))
  }
}
