/**
 *
 * @param {HTMLElement} el DOM元素
 * @param {'Top' | 'Left'} type offset类型
 * @return {number}
 */
function getOffset(el, type) {
  return el.getBoundingClientRect()[type]
}
/**
 *
 * @param {HTMLElement} el DOM元素
 * @param {number} x X坐标
 * @param {number} y Y坐标
 * @return {{ x: number, y: number }}
 */
export function toCanvasCoord(el, x, y) {
  let canvasX = x - getOffset(el, 'left')
  let canvasY = y - getOffset(el, 'top')

  return { x: canvasX, y: canvasY }
}
