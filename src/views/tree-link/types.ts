// 节点类型
export enum NodeType {
  INPUT = 'INPUT', // 数据输入
  FILTER = 'FILTER', // 数据过滤
  JOIN = 'JOIN', // 数据连接
  UNION = 'UNION', // 数据合并
  AGG = 'AGG', // 数据聚合
  OUTPUT = 'OUTPUT' // 数据输出
}

// 元素校验状态
export enum CellStatus {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface Position {
  // 节点位置信息
  x: number
  y: number
}
