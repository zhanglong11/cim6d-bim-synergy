import Ticks from './ticks'

/**@type {number} 主要刻度高度 */
const TICK_MAJOR_HEIGHT = 12
/**@type {number} 次要刻度高度 */
const TICK_MINOR_HEIGHT = 6

/**@type {number} 刻度标签字体大小*/
const LABEL_FONT_SIZE = 12
/**@type {string} 刻度标签字体颜色*/
const LABEL_FILL_COLOR = '#83ace1'

/**@type {number} 整个刻度轴顶部留白*/
const PADDING_TOP = 14
/**@type {number} 整个进度条水平距离留白*/
export const PADDING_HORIZONTAL = 8
/**@type {number} 标签开始渲染的Y轴位置*/
const LABEL_RENDER_START_Y = PADDING_TOP
/**@type {number} 刻度轴轴部分开始渲染的Y轴位置*/
const AXIS_RENDER_START_Y = LABEL_RENDER_START_Y + 1 + LABEL_FONT_SIZE + 1 + TICK_MAJOR_HEIGHT + 1
/**@type {number} 主刻度开始渲染的Y轴位置*/
const TICK_MAJOR_START_Y = PADDING_TOP + 1 + LABEL_FONT_SIZE
/**@type {number} 次要刻度开始渲染的Y轴位置*/
const TICK_MINOR_START_Y = TICK_MAJOR_START_Y + (TICK_MAJOR_HEIGHT - TICK_MINOR_HEIGHT)

/**@type {number} 刻度轴宽度 */
const AXIS_WIDTH = 4
/**@type {string} 轴颜色*/
const AXIS_STROKE_STYLE = '#34AEE7'
/**@type {string} */
const AXIS_STROKE_STYLE_HOVER = '#34AEE7'

/**@type {numbe} 刻度宽度 */
const AXIS_TICK_WIDTH = 1
/**@type {number} 刻度最小间隔*/
const TICK_MINIMIUM_GAP_WIDTH = 10
/**@type {number} 主要刻度间隔*/
const MAJOR_TICK_INTERVAL = 5
/**@type {string} 刻度颜色*/
const TICK_STROKE_STYLE = '#34AEE7'

/**@type {number} 游标球部分的半径 */
const CURSOR_RADIUS = 5
/**@type {number} 游标箭头距离圆心位置 */
const CURSOR_ARRORW_DISTANCE = 10
/**@type {string} 游标颜色*/
const CURSOR_FILL_STYLE = 'rgba(161, 206, 243, 1)'
/**@type {string} 游标hover颜色*/
const CURSOR_HOVER_FILL_STYLE = 'rgba(64, 168, 251, 1)'
/**@type {number} 游标渲染Y轴位置*/
export const CUROSR_RENDER_START_Y =
  AXIS_RENDER_START_Y - CURSOR_ARRORW_DISTANCE - CURSOR_ARRORW_DISTANCE - CURSOR_RADIUS

/**
 * @class AxisRender 渲染轴
 */
export class AxisRenderer {
  /**
   *
   * @param {CanvasRenderingContext2D} context 绘制环境
   */
  constructor(context) {
    /**@member {CanvasRenderingContext2D} */
    this.context = context
    /**@member {HTMLCanvasElement} */
    this._canvas = context.canvas
    /**@member {number} */
    this._axisLength = 0
    /**@member {boolean}*/
    this._isHover = false
  }

  /**
   * 设置刻度轴长度
   * @param {number} length
   */
  setAxisLength(length) {
    this._axisLength = length
  }

  /**
   * 判断点是否在轴上
   * @param {number} offsetX 滚动偏移量
   * @param {number} x 点X轴坐标
   * @param {number} y 点y轴坐标
   * @return {boolean} 点是否在轴上
   */
  isPointOnAxis(offsetX, x, y) {
    const canvas = this.context.canvas
    const startX = offsetX > PADDING_HORIZONTAL ? 0 : PADDING_HORIZONTAL - offsetX
    const renderLength = this._axisLength - (PADDING_HORIZONTAL < offsetX ? offsetX - PADDING_HORIZONTAL : 0)
    const endX = startX + renderLength > canvas.width ? canvas.width : startX + renderLength

    return x >= startX && x <= endX && y >= AXIS_RENDER_START_Y - 1 && y <= AXIS_RENDER_START_Y + AXIS_WIDTH
  }

  /**
   *
   * @param {number} offsetX 水平滚动条滚动的距离
   */
  renderAt(offsetX = 0) {
    const ctx = this.context
    const canvas = this.context.canvas
    const startX = offsetX > PADDING_HORIZONTAL ? 0 : PADDING_HORIZONTAL - offsetX
    const renderLength = this._axisLength - (PADDING_HORIZONTAL < offsetX ? offsetX - PADDING_HORIZONTAL : 0)
    const endX = startX + renderLength > canvas.width ? canvas.width : startX + renderLength
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = AXIS_WIDTH
    if (!this.isHover) ctx.strokeStyle = AXIS_STROKE_STYLE
    else ctx.strokeStyle = AXIS_STROKE_STYLE_HOVER

    ctx.moveTo(startX, AXIS_RENDER_START_Y - 0.5)
    ctx.lineTo(endX, AXIS_RENDER_START_Y - 0.5)
    ctx.stroke()
    ctx.restore()
  }
}

/**
 * @class
 * 刻度轴刻度渲染
 */
export class TicksRenderer {
  /**
   *
   * @param {CanvasRenderingContext2D} context 渲染环境
   * @param {number} ticksCount 刻度数量
   * @param {TickValue} startValue 刻度起始值
   * @param {TickValueChangeMethod} additionMethod 刻度增加计算方法
   * @param {TickValueStringifyMethod} stringifyMethod 刻度转换为字符串方法
   */
  constructor(context, ticksCount, startValue, additionMethod, stringifyMethod) {
    /**@type {CanvasRenderingContext2D} */
    this.context = context
    /**@type {number} */
    this.ticksCount = ticksCount
    /**@type {Ticks} */
    this._ticks = new Ticks(ticksCount, startValue, additionMethod, stringifyMethod)
    /**@type {number} */
    this._tickGap = TICK_MINIMIUM_GAP_WIDTH

    this._calcTickGap(context.canvas.width - PADDING_HORIZONTAL * 2)
  }

  /**
   *
   * @param {TickValue} initialValue
   */
  setInitialValue(initialValue) {
    this._ticks.setInitialValue(initialValue)
  }

  /**
   *
   * @param {number} count 刻度数量
   */
  setTicksCount(count) {
    this.ticksCount = count
    this._ticks.setTickCounts(count)
    this._calcTickGap(this.context.canvas.width - PADDING_HORIZONTAL * 2)
  }

  /**
   * @private
   * @param {number} viewPortLength 最大长度
   */
  _calcTickGap(viewPortLength) {
    console.log(viewPortLength)
    const ticksWidth = this.ticksCount * AXIS_TICK_WIDTH
    const gapNum = this.ticksCount - 1
    console.log(gapNum)
    const gapWidth = gapNum > 0 ? Math.floor((viewPortLength - ticksWidth) / gapNum) : viewPortLength - ticksWidth
    this._tickGap = gapWidth < TICK_MINIMIUM_GAP_WIDTH ? TICK_MINIMIUM_GAP_WIDTH : gapWidth
  }

  /**
   * @return {number}
   */
  getAllTickLength() {
    console.log(this._tickGap)
    return this.ticksCount * (AXIS_TICK_WIDTH + this._tickGap) - this._tickGap
  }

  /**
   * 根据从轴0位置的偏移量获取刻度序号
   * @param {number} offset 从轴0位置的偏移量
   * @return {number} 位置对应刻度的序号
   */
  getIndexFromOffset(offset) {
    return Math.round(offset / (AXIS_TICK_WIDTH + this._tickGap))
  }

  /**
   *
   * @param {number} offset 从轴0位置的偏移量
   * @return {TickValue} 对应位置的值
   */
  getValueFromOffset(offset) {
    return Math.round(offset / (this._tickGap + AXIS_TICK_WIDTH))
  }

  /**
   * 根据下标返回刻度值
   * @param {number} index 下标
   * @return {TickValue}
   */
  getValueFromIndex(index) {
    return this._ticks.getValueAt(index)
  }

  /**
   *
   * @param {number} offset 获取第offset + 1个刻度的X轴位置
   */
  getXPosAt(offset) {
    return offset * (this._tickGap + AXIS_TICK_WIDTH) + PADDING_HORIZONTAL
  }

  /**
   * 判断是否是主要刻度
   * @param {number} index 刻度序号
   */
  _isMajorGap(index) {
    if (this.ticksCount < 25) return true
    return index % MAJOR_TICK_INTERVAL === 0
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} centerX label中心点x
   * @param {number} centerY label中心点y
   * @param {string} text label内容
   */
  _drawLabel(ctx, centerX, centerY, text) {
    ctx.save()
    ctx.fillStyle = LABEL_FILL_COLOR
    ctx.fillText(text, centerX, centerY)
    ctx.restore()
  }

  /**
   *
   * @param {number} offsetX 水平滚动条滚动距离
   */
  renderAt(offsetX) {
    const ctx = this.context
    const canvas = this.context.canvas

    /**@type {number} 起始渲染的刻度编号*/
    const startIndex =
      offsetX <= PADDING_HORIZONTAL
        ? 0
        : Math.floor((offsetX - PADDING_HORIZONTAL + this._tickGap) / (this._tickGap + AXIS_TICK_WIDTH))

    const startPosX = this.getXPosAt(startIndex) - offsetX
    const allRemindTicks = this.ticksCount - startIndex
    const remindTicksLength = allRemindTicks * (AXIS_TICK_WIDTH + this._tickGap) - this._tickGap

    /**@type {number} 绘制可见刻度的数量*/
    const maxTicksToDraw =
      remindTicksLength < canvas.width
        ? this.ticksCount - startIndex
        : Math.ceil(
            (canvas.width - (PADDING_HORIZONTAL - offsetX < 0 ? 0 : PADDING_HORIZONTAL - offsetX)) /
              (AXIS_TICK_WIDTH + this._tickGap)
          )

    let curPos = startPosX
    ctx.save()
    ctx.strokeStyle = TICK_STROKE_STYLE
    ctx.lineWidth = AXIS_TICK_WIDTH
    ctx.font = 'Microsoft YaHei 10px'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (let i = 0; i < maxTicksToDraw; ++i) {
      ctx.beginPath()
      const isMajor = this._isMajorGap(startIndex + i)

      const xPos = curPos + (this._tickGap + AXIS_TICK_WIDTH) * i + 0.5

      const yPos = isMajor ? TICK_MAJOR_START_Y : TICK_MINOR_START_Y

      ctx.moveTo(xPos, yPos)
      ctx.lineTo(xPos, yPos + (isMajor ? TICK_MAJOR_HEIGHT : TICK_MINOR_HEIGHT))
      if (isMajor) {
        this._drawLabel(ctx, xPos, LABEL_RENDER_START_Y, this._ticks.getValueStringAt(startIndex + i))
      }
      ctx.stroke()
    }
    ctx.restore()
  }
}

/**
 * 刻度游标
 * @class
 */
export class CursorRenderer {
  /**
   * @param {CanvasRenderingContext2D} ctx 绘图上下文
   */
  constructor(ctx) {
    /**@member {CanvasRenderingContext2D} */
    this.context = ctx
    /**@member {number} 游标X轴坐标*/
    this.x = 0
    /**@member {number} 游标Y轴坐标*/
    this.y = 0
    /**@member {boolean} 是否hover*/
    this.isHover = false
  }

  /**
   * 判断点是否在游标上
   * @param {number} x 判断的点X轴坐标
   * @param {number} y 判断的点Y轴坐标
   * @return {boolean} 点是否在游标上
   */
  isPointOnCursor(x, y) {
    const diffX = x - this.x
    const diffY = y - this.y

    return diffX * diffX + diffY * diffY <= CURSOR_RADIUS * CURSOR_RADIUS
  }

  renderAt(x, y) {
    const ctx = this.context
    this.x = x
    this.y = y
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, CURSOR_RADIUS, 0, -Math.PI, true)
    ctx.lineTo(x, y + CURSOR_ARRORW_DISTANCE)
    ctx.closePath()

    if (this.isHover) ctx.fillStyle = CURSOR_HOVER_FILL_STYLE
    else ctx.fillStyle = CURSOR_FILL_STYLE

    ctx.fill()
    ctx.restore()
  }
}
