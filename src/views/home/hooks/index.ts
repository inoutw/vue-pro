/**
 * 生成栅格位置信息数组
 */
export const useCellPosArr = ({rows, cols, cellWidth, cellHeight}: any)=>{
    const cellPosArr: any = []
    for(let i=0; i< rows; i++){
        for(let j=0; j< cols;j++) {
            cellPosArr.push({left: cellWidth*i, top:cellHeight*j, width:cellWidth, height: cellHeight  })
        }
    }
    console.log('cellPosArr', cellPosArr)
    return cellPosArr
}
