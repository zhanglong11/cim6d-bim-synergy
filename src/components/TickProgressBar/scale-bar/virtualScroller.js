export default class VirtualScroller {
  /**
   * @typedef {Object} Size 大小
   * @prop {number} width 宽度
   * @prop {number} height 高度
   */
  /**
   * @param {Size} containerSize
   * @param {Size} contentSize
   */
  constructor(containerSize, contentSize) {
    /**@member {Size} 容器大小*/
    this.containerSize = containerSize
    /**@member {Size} 内容大小*/
    this.contentSize = contentSize

    /**
     * @private
     * @member {number} 最大垂直滚动距离
     */
    this._maxScrollTop = this.calcMaxScrollTop()

    /**
     * @private
     * @member {number} 最大水平滚动距离
     */
    this._maxScrollLeft = this.calcMaxScrollLeft()

    /**
     * @private
     * @member {number} scrollLeft
     */
    this._scrollLeft = 0

    /**
     * @private
     * @member {number} scrollTop
     * */
    this._scrollTop = 0
  }

  /**
   * 是否存在水平滚动条
   * @return {boolean}
   */
  hasHorizontalScrollBar() {
    return this.containerSize.width && this.contentSize.width && this.containerSize.width < this.contentSize.width
  }

  /**
   * 是否存在垂直滚动条
   * @return {boolean}
   */
  hasVertivalScrollBar() {
    return this.containerSize.height && this.contentSize.height && this.containerSize.height < this.contentSize.height
  }
  /**
   * 计算最大垂直滚动距离
   * @private
   * @return {number} 最大垂直滚动距离
   */
  calcMaxScrollTop() {
    if (!this.hasVertivalScrollBar()) return 0
    return this.contentSize.height - this.containerSize.height
  }

  /**
   * 计算最大水平滚动距离
   * @private
   * @return {number} 最大水平滚动距离
   */
  calcMaxScrollLeft() {
    if (!this.hasHorizontalScrollBar()) return 0
    return this.contentSize.width - this.containerSize.width
  }

  /**
   * 水平滚动
   * @param {number} amount 滚动距离
   * @return {number} 当前ScrollLeft
   */
  scrollHorizontal(amount) {
    if (this._scrollLeft + amount >= this._maxScrollLeft) {
      this._scrollLeft = this._maxScrollLeft
    } else if (this._scrollLeft + amount <= 0) {
      this._scrollLeft = 0
    } else {
      this._scrollLeft += amount
    }

    return this._scrollLeft
  }

  /**
   * 垂直滚动
   * @param {number} amount 滚动距离
   * @return {number} 当前scrollTop
   */
  scrollVertival(amount) {
    if (this._scrollTop + amount >= this._maxScrollTop) {
      this._scrollTop = this._maxScrollTop
    } else if (this._scrollTop + amount <= 0) {
      this._scrollTop = 0
    } else {
      this._scrollTop += amount
    }

    return this._scrollTop
  }

  /**
   * 设置内容大小
   * @param {Size} size 内容大小
   */
  resizeContent(size) {
    this.contentSize = Object.assign({}, this.contentSize, size)
    this._maxScrollLeft = this.calcMaxScrollLeft()
    this._maxScrollTop = this.calcMaxScrollTop()
    if (this._scrollLeft > this._maxScrollLeft) this._scrollLeft = this._maxScrollLeft
    if (this._scrollTop > this._maxScrollTop) this._scrollTop = this._maxScrollTop
  }

  /**
   * 设置容器大小
   * @param {Size} size 容器大小
   */
  resizeContainer(size) {
    this.containerSize = Object.assign({}, this.containerSize, size)
    this._maxScrollLeft = this.calcMaxScrollLeft()
    this._maxScrollTop = this.calcMaxScrollTop()
    if (this._scrollLeft > this._maxScrollLeft) this._scrollLeft = this._maxScrollLeft
    if (this._scrollTop > this._maxScrollTop) this._scrollTop = this._maxScrollTop
  }

  /**
   * @member {number} scrollLeft
   */
  get scrollLeft() {
    return this._scrollLeft
  }

  /**
   * @member {number} scrollTop
   */
  get scrollTop() {
    return this._scrollTop
  }
}
