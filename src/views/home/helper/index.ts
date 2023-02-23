import {isEmpty} from 'lodash'
export const getTargetGrid = (pos: {x: number, y: number}, grids: any[], offset= {x:0, y:0})=>{
    if(isEmpty(pos) || isEmpty(grids)) return 
    const { x, y } = pos;
    let res: any = {}
    const xFinal = x-offset.x
    const yFinal = y- offset.y
    for(let item of grids) {
      let {left, top, width, height} = item
      if (xFinal >= left && xFinal <= left + width && yFinal >= top && yFinal <= top + height) {
            console.log(`点击了栅格`, item);
            res = item
            break
          }
    }
    return res
}