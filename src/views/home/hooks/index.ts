import {isEmpty} from 'lodash'
import { GRID_CONFIG } from '../constant'
/**
 * 生成栅格位置信息数组
 * filterHeader:是否过滤第一行格子
 */
export const useCellPosArr = ({rows, cols, cellWidth, cellHeight}: any, filterHeader=true)=>{
    const cellPosArr: any = []
    // 第一行是表头，过滤掉，不能选中
    const rowStart = filterHeader ? 1 : 0
    for(let i=rowStart; i< rows; i++){
        for(let j=0; j< cols;j++) {
            cellPosArr.push({left: cellWidth*j, top:cellHeight*i, width:cellWidth, height: cellHeight  })
        }
    }
    // console.log('cellPosArr', cellPosArr)
    return cellPosArr
}

/**
 * 生成栅格位置信息数组
 * filterHeader:是否过滤第一行格子
 */
 export const useRowPosArr = ({rows, cols, cellWidth, cellHeight}: any, filterHeader=true)=>{
    const rowPosArr: any = []
    // 第一行是表头，过滤掉，不能选中
    let rowStart = filterHeader? 1 : 0
    for(let r=rowStart; r< rows; r++){
        rowPosArr.push({left: 0, top: cellHeight*r, width:cellWidth * cols, height: cellHeight  })
    }
    // console.log('rowPosArr', rowPosArr)
    return rowPosArr
}

/**
 * 生成文本位置信息数组
 * filterHeader:是否过滤第一行格子
 */

 export const useCellValPosArr = (headerColumns: any[], dataList: any[], {cellWidth, cellHeight} = GRID_CONFIG)=>{
    if(isEmpty(headerColumns) || isEmpty(dataList)) return
    const valPosArr: any = []
    const colsLen = headerColumns?.length
    const rowsLen = dataList.length
    for(let i=0; i < rowsLen; i++){
        const dataItem = dataList[i]
        for(let j=0; j < colsLen; j++) {
            let rowItem = headerColumns[j] || {}
            let { dataIndex } = rowItem
            valPosArr.push({left: cellWidth * (j), top: cellHeight*(i+1), width: cellWidth, height:cellHeight, value: dataItem[dataIndex] })
        }
    }
    console.log('valPosArr', valPosArr)
    return valPosArr
}
