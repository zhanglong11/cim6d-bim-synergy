import { AxisRenderer, TicksRenderer, CursorRenderer, CUROSR_RENDER_START_Y, PADDING_HORIZONTAL } from './renderers'
import VirtualScroller from './virtualScroller'
import { toCanvasCoord } from './helper'

export default class MainRenderer {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    const canvas = ctx.canvas
    this.context = ctx
    this.axisRenderer = new AxisRenderer(ctx)
    this.ticksRenderer = new TicksRenderer(ctx, 0, 0, x => x + 1)
    this.cursorRender = new CursorRenderer(ctx)
    this.scroller = new VirtualScroller(
      { width: ctx.canvas.width, height: ctx.canvas.height },
      { width: 0, height: ctx.canvas.height }
    )
    this._curTickIndex = 0
    Object.defineProperty(this, 'curTickIndex', {
      get() {
        return this._curTickIndex
      },
      set(val) {
        var oldValue = this._curTickIndex
        this._curTickIndex = val
        if (this.onTickChange) {
          if (oldValue != val && !this._dragCursor) {
            this.onTickChange(val, this.ticksRenderer.getValueFromIndex(val))
          }
        }
        this.render()
      }
    })

    this._isMouseDown = false
    this._isMouseOnCursor = false
    this._dragCursor = false
    this._beforeDraggingIndex = 0
    this._lastX = 0

    this._accDistance = 0

    canvas.addEventListener('mousedown', this._handleMouseDown)
    canvas.addEventListener('mouseup', this._handleMouseUp)
    canvas.addEventListener('mousemove', this._handleMouseMove)
    canvas.addEventListener('mouseout', this._hadnleMouseOut)
    canvas.addEventListener('click', this._handleClick)
    canvas.addEventListener('wheel', this._handleWheel)
  }

  /**
   * @private
   * @method
   * @param {MouseEvent} evt
   */
  _handleMouseDown = evt => {
    let { x } = toCanvasCoord(evt.target, evt.pageX, evt.pageY)
    this._lastX = x
    this._beforeDraggingIndex = this._curTickIndex
    this._isMouseDown = true
    if (this._isMouseOnCursor) this._dragCursor = true
  }

  /**
   * @private
   * @method
   * @param {MouseEvent} evt
   */
  _handleMouseUp = () => {
    this._isMouseDown = false
    if (this._dragCursor && this._beforeDraggingIndex != this.curTickIndex) {
      if (this.onTickChange) {
        this.onTickChange(this.curTickIndex, this.ticksRenderer.getValueFromIndex(this.curTickIndex))
      }
    }
    this._dragCursor = false
    this._accDistance = 0
  }

  /**
   * @private
   * @method
   * @param {MouseEvent} evt
   */
  _hadnleMouseOut = () => {
    this._isMouseOnCursor = false
    if (this._dragCursor && this._beforeDraggingIndex != this.curTickIndex) {
      if (this.onTickChange) {
        this.onTickChange(this.curTickIndex, this.ticksRenderer.getValueFromIndex(this.curTickIndex))
      }
    }
    this._dragCursor = false
    this.cursorRender.isHover = false
    this._isMouseDown = false
    this.render()
  }

  /**
   * @private
   * @method
   * @param {MouseEvent} evt;
   */
  _handleClick = evt => {
    let { x, y } = toCanvasCoord(evt.target, evt.pageX, evt.pageY)
    if (this.axisRenderer.isPointOnAxis(this.scroller.scrollLeft, x, y)) {
      const index = this.ticksRenderer.getIndexFromOffset(this._toAixsPos(x))
      this.curTickIndex = index
      this.render()
    }
  }

  /**
   * @private
   * @method
   * @param {MouseEvent} evt
   */
  _handleWheel = evt => {
    if (this._isMouseDown) return
    if (evt.deltaY > 0) {
      this.scrollHorizontal(50)
    } else if (evt.deltaY < 0) {
      this.scrollHorizontal(-50)
    }
    this._isMouseOnCursor = false
    this.cursorRender.isHover = false
  }

  /**
   * @private
   * @method
   * @param {MouseEvent} evt
   */
  _handleMouseMove = evt => {
    let { x: curX, y: curY } = toCanvasCoord(evt.target, evt.pageX, evt.pageY)
    const beforeOnCursor = this._isMouseOnCursor
    const beforeOnAxis = this.axisRenderer.isHover

    if (this._dragCursor) {
      evt.preventDefault()
      this._isMouseOnCursor = this._dragCursor
      let diffX = curX - this._lastX
      this._accDistance += diffX
      this._calcCursorIndexByMoveDistance()
    } else {
      this._isMouseOnCursor = this.cursorRender.isHover = this.cursorRender.isPointOnCursor(curX, curY)
      this.axisRenderer.isHover = this.axisRenderer.isPointOnAxis(this.scroller.scrollLeft, curX, curY)
    }

    if (this._isMouseDown && !this._dragCursor) {
      evt.preventDefault()
      this.scrollHorizontal(this._lastX - curX)
    }

    this._lastX = curX

    if (beforeOnCursor !== this._isMouseOnCursor || this._dragCursor || beforeOnAxis !== this.axisRenderer.isHover)
      requestAnimationFrame(this.render.bind(this))
  }

  /**
   * @private
   * 根据累计拖动位置的变化重新计算tick的序号并渲染
   */
  _calcCursorIndexByMoveDistance() {
    let cursorMoved = false
    if (this._accDistance >= this.ticksRenderer._tickGap) {
      let amount = Math.floor(this._accDistance / this.ticksRenderer._tickGap)
      if (this.curTickIndex + amount < this.ticksRenderer.ticksCount) this.curTickIndex += amount
      else this.curTickIndex = this.ticksRenderer.ticksCount - 1
      this._accDistance -= (this.ticksRenderer._tickGap + 1) * amount
      cursorMoved = true
    } else if (this._accDistance <= -this.ticksRenderer._tickGap) {
      let amount = Math.floor(-this._accDistance / this.ticksRenderer._tickGap)
      if (this.curTickIndex - amount >= 0) this.curTickIndex -= amount
      else this.curTickIndex = 0

      this._accDistance += (this.ticksRenderer._tickGap + 1) * amount
      cursorMoved = true
    }
    if (cursorMoved) {
      requestAnimationFrame(this.render.bind(this))
    }
  }

  /**
   * 居中游标
   */
  adjustCursorToCenter() {
    const canvas = this.context.canvas
    const cursorOffset = this.ticksRenderer.getXPosAt(this.curTickIndex)
    const centerOffset = cursorOffset - canvas.width / 2
    this.scrollHorizontal(centerOffset - this.scroller.scrollLeft)
  }

  /**
   * 根据位置逐步居中游标
   */
  adjustCursorToCenterByStep() {
    const canvas = this.context.canvas
    const cursorOffset = this.ticksRenderer.getXPosAt(this.curTickIndex)
    const cursorPosX = cursorOffset - this.scroller.scrollLeft
    let scrollAmount
    if (cursorPosX < 0 || cursorPosX > this.context.canvas.width) {
      if (this.scroller.scrollLeft > cursorOffset) {
        scrollAmount = cursorOffset - this.scroller.scrollLeft - (this.ticksRenderer._tickGap + 1) * 2
      } else if (cursorOffset > this.scroller.scrollLeft + canvas.width) {
        scrollAmount = cursorOffset - this.scroller.scrollLeft - canvas.width + (this.ticksRenderer._tickGap + 1) * 2
      }
    } else {
      scrollAmount = 0
    }

    this.scrollHorizontal(scrollAmount)
  }

  /**
   *
   * @param {number} amount 移动的index的量
   */
  moveByIndexAndAdjustToCenter(amount) {
    if (amount + this.curTickIndex <= 0) this.curTickIndex = 0
    else if (amount + this.curTickIndex > this.ticksRenderer.ticksCount - 1)
      this.curTickIndex = this.ticksRenderer.ticksCount - 1
    else this.curTickIndex += amount

    this.adjustCursorToCenterByStep()
  }

  /**
   * @private
   * @param {number} x X轴坐标
   * @return {number} 在刻度轴上的位置
   */
  _toAixsPos(x) {
    return x + this.scroller.scrollLeft - PADDING_HORIZONTAL
  }

  /**
   *
   * @param {TickValue} initialValue 初始值
   */
  setTicksInitialValue(initialValue) {
    this.ticksRenderer.setInitialValue(initialValue)
  }

  /**
   *
   * @param {TickValueChangeMethod} addtionMethod
   */
  setTicksAddtionMethod(addtionMethod) {
    this.ticksRenderer._ticks.setAdditionMethod(addtionMethod)
  }

  /**
   * @param {TickValueStringifyMethod} stringifyMethod
   */
  setTickStringifyMethod(stringifyMethod) {
    this.ticksRenderer._ticks.setStringifyMethod(stringifyMethod)
  }

  /**
   * @param {number} count
   */
  setTicksCount(count) {
    this.ticksRenderer.setTicksCount(count)
    const ticksLength = this.ticksRenderer.getAllTickLength()
    console.log(ticksLength, this.ticksRenderer._tickGap)
    this.axisRenderer.setAxisLength(ticksLength)
    this.scroller.resizeContent({ width: ticksLength + PADDING_HORIZONTAL * 2 })
  }

  /**
   * @return {number}
   */
  getTicksCount() {
    return this.ticksRenderer.ticksCount
  }

  /**
   * 获取下一个点的位置
   * @return {number}
   */
  getNextTickPosition() {
    if (this.curTickIndex === this.ticksRenderer.ticksCount) return this.ticksRenderer.getAllTickLength()
    return this.ticksRenderer.getXPosAt(this.curTickIndex + 1)
  }

  /**
   * @return {number}
   */
  getPrevTickPosition() {
    if (this.curTickIndex === 0) return 0
    return this.ticksRenderer.getXPosAt(this.curTickIndex - 1)
  }

  /**
   * 移动游标n个单位
   * @param {number} n 移动的单位
   */
  moveCursorN(n) {
    if (this.curTickIndex + n < 0) {
      this.curTickIndex = 0
    } else if (this.curTickIndex + n > this.getTicksCount() - 1) {
      this.curTickIndex = this.getTicksCount() - 1
    } else {
      this.curTickIndex += n
    }

    this.render()
  }

  /**
   * 向前移动一位游标
   */
  moveCursorPrev() {
    this.moveCursorN(-1)
  }

  /**
   * 向后移动一位游标
   */
  moveCursorNext() {
    this.moveCursorN(1)
  }

  /**
   *
   * @param {number} amount
   */
  scrollHorizontal(amount) {
    this.scroller.scrollHorizontal(amount)
    this.render()
  }

  /**
   * @private
   * @param {number} index 刻度序号
   */
  _renderCursorAtIndex(index) {
    if (index < 0 || index > this.getTicksCount()) throw 'Index can not be nagetive or greater than ticks count'
    const offset = this.ticksRenderer.getXPosAt(index)
    const cursorPosX = offset - this.scroller.scrollLeft
    if (cursorPosX < -10 || cursorPosX > this.context.canvas.width + 10) return
    this.cursorRender.renderAt(offset - this.scroller.scrollLeft, CUROSR_RENDER_START_Y)
  }

  render() {
    const canvas = this.context.canvas
    this.context.clearRect(0, 0, canvas.width, canvas.height)
    this.axisRenderer.renderAt(this.scroller.scrollLeft)
    this.ticksRenderer.renderAt(this.scroller.scrollLeft)
    this._renderCursorAtIndex(this.curTickIndex)
  }
}
