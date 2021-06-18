/**
 * @class 刻度轴
 */
export default class Axis {
  /**
   *
   * @param {number} length 轴长度
   */
  constructor(length) {
    /**@member {number} */
    this.length = length
  }

  /**
   *
   * @param {number} length 轴长度
   */
  setAxisLength(length) {
    this.length = length
  }
}
