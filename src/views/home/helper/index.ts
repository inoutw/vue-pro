import {isEmpty} from 'lodash'
import { DEFAULT_COL_COUNT } from '../constant';
/**
 * 在给定的grids栅格数组中，根据位置pos,找到选中的栅格
 * @param pos 鼠标位置
 * @param grids 栅格数组
 * @param offset 栅格所在的父元素Group的偏移
 * @returns 目标格子
 */
export const getTargetGrid = (pos: {x: number, y: number}, grids: any[], offset= {x:0, y:0})=>{
    if(isEmpty(pos) || isEmpty(grids)) return 
    const { x, y } = pos;
    let res: any = {}
    const xFinal = x-offset.x
    const yFinal = y- offset.y
    for(let item of grids) {
      let {left, top, width, height} = item
      if (xFinal >= left && xFinal <= left + width && yFinal >= top && yFinal <= top + height) {
            // console.log(`点击了栅格`, item);
            res = item
            break
          }
    }
    return res
}
/**
 *  在给定的grids栅格数组中，根据鼠标位置pos,找到所在的行
 * @param pos 鼠标位置
 * @param grids 栅格数组
 * @param offset 栅格所在的父元素Group的偏移
 * @returns 目标行
 */
 export const getTargetRow = (pos: {x: number, y: number}, rows: any[], offset= {x:0, y:0})=>{
  if(isEmpty(pos) || isEmpty(rows)) return 
  const { x, y } = pos;
  let res: any = {}
  const xFinal = x-offset.x
  const yFinal = y- offset.y
  for(let item of rows) {
    let {left, top, width, height} = item
    if (xFinal >= left && xFinal <= left + width && yFinal >= top && yFinal <= top + height) {
          // console.log(`hover行`, item);
          res = item
          break
        }
  }
  return res
}