/**
  * 给树形数组的每个节点增加index，index按层级递增
  * @param {} treeNodes 输入的树形数组
  * @returns 更新的树形数组
  */
  function addIndexToTree(treeNodes) {
    let index = 0; // 用于分配每个节点的递增索引
    let stack = [...treeNodes]; // 模拟栈结构来进行深度遍历
  
    while (stack.length > 0) {
      const node = stack.shift();
      node.index = index;
      index++;
  
      if (node.children && node.children.length > 0) {
        stack = [...node.children, ...stack]; // 将子节点压入栈中
      }
    }
  
    return treeNodes;
  }
  addIndexToTree(treeData)
  // 示例数据
  const treeData = [
    {
      name: 'A',
      children: [
        {
          name: 'B',
          children: [
            { name: 'D' },
            { name: 'E' },
          ]
        },
        {
          name: 'C',
          children: [
            { name: 'F' },
            { name: 'G' },
          ]
        },
      ],
    },
    {
      name: 'H',
      children: [
        {
          name: 'I',
          children: [
            { name: 'K' },
            { name: 'L' },
          ]
        },
        {
          name: 'J',
          children: [
            { name: 'M' },
            { name: 'N' },
          ]
        },
      ],
    },
  ];