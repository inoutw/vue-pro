<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import G6 from '@antv/g6'
import vueSvg from "../../assets/vue.svg";
import { debounce } from "lodash";
const nodeCfg = {
  width: 160,
  height: 50,
  radius:[4, 4, 0, 0],
}
const graph=ref<any>()

const nodeColorMap:any={
  a:'#096',
  b:'#789',
  c:'#9928ff',
  d:'#77621c',
}

const overflowText=(text:string)=>{
  if(text.length>8) {
   return  `${text.substring(0,7)}...` 
  }
  return text
}

const typesColor=(type:string)=>{
  return nodeColorMap[type]
}

/* G6.registerLayout('bigraph-layout', {
  execute() {
    const self = this
    const center = self.center || [0, 0]
    const biSep = self.biSep || 100
    const nodeSep = self.nodeSep || 20
    const nodeSize = self.nodeSize || 20
    const direction = self.direction || 'horizontal'
    let part1Pos = 0
    let part2Pos = 0
    if (direction === 'horizontal') {
      part1Pos = center[0] - biSep / 2
      part2Pos = center[0] + biSep / 2
    }
    const { nodes, edges } = self
    const part1Nodes = []
    const part2Nodes = []
    const part1NodeMap = new Map()
    const part2NodeMap = new Map()
    // separate the nodes and init the positions
    nodes.forEach(function (node, i) {
      if (node.cluster === 'part1') {
        part1Nodes.push(node)
        part1NodeMap.set(node.id, i)
      } else {
        part2Nodes.push(node)
        part2NodeMap.set(node.id, i)
      }
    })

    // order the part1 node
    part1Nodes.forEach(function (p1n) {
      let index = 0
      let adjCount = 0
      edges.forEach(function (edge) {
        const sourceId = edge.source
        const targetId = edge.target
        if (sourceId === p1n.id) {
          index += part2NodeMap.get(targetId)
          adjCount += 1
        } else if (targetId === p1n.id) {
          index += part2NodeMap.get(sourceId)
          adjCount += 1
        }
      })
      index /= adjCount
      p1n.index = index
    })
    part1Nodes.sort(function (a, b) {
      return a.index - b.index
    })
    part2Nodes.forEach(function (p2n) {
      let index = 0
      let adjCount = 0
      edges.forEach(function (edge) {
        const sourceId = edge.source
        const targetId = edge.target
        if (sourceId === p2n.id) {
          index += part1NodeMap.get(targetId)
          adjCount += 1
        } else if (targetId === p2n.id) {
          index += part1NodeMap.get(sourceId)
          adjCount += 1
        }
      })
      index /= adjCount
      p2n.index = index
    })
    part2Nodes.sort(function (a, b) {
      return a.index - b.index
    })

    // place the nodes
    const hLength = part1Nodes.length > part2Nodes.length ? part1Nodes.length : part2Nodes.length
    const height = hLength * (nodeSep + nodeSize)
    let begin = center[1] - height / 2
    if (direction === 'vertical') {
      begin = center[0] - height / 2
    }
    part1Nodes.forEach(function (p1n, i) {
      if (direction === 'horizontal') {
        p1n.x = part1Pos
        p1n.y = begin + i * (nodeSep + nodeSize)
      } else {
        p1n.x = begin + i * (nodeSep + nodeSize)
        p1n.y = part1Pos
      }
    })
    part2Nodes.forEach(function (p2n, i) {
      if (direction === 'horizontal') {
        p2n.x = part2Pos
        p2n.y = begin + i * (nodeSep + nodeSize)
      } else {
        p2n.x = begin + i * (nodeSep + nodeSize)
        p2n.y = part2Pos
      }
    })
  }
}) */
G6.registerNode(
  'icon-node',
  {
    draw(cfg: any, group: any) {
      const dom = group.addShape('dom', {
        attrs: {
          width: nodeCfg.width,
          height: nodeCfg.height,
          radius: [nodeCfg.radius, nodeCfg.radius, 0, 0],
          html: `
           <div class='g6-node' style="width: ${nodeCfg.width}px; height: ${nodeCfg.height}px; background:${typesColor(cfg.cluster)}">
            <img class='nodeImg' src='${vueSvg}' />
            <div class='content'>
                <div class='title'>${overflowText(cfg.label)}</div>
                <div class='des'>${cfg.des || ''}</div>
              </div>
            </div>
          `
        },
        // name:'nodeDom',
      })
      group.addShape('rect', {
        attrs: {
          width: nodeCfg.width,
          height: nodeCfg.height,
          x: 0,
          y: 0,
          fill: 'transparent',
          // radius: [nodeCfg.radius, nodeCfg.radius, 0, 0],
        },
        modelId: cfg.id,
        name:'nodeDom',
        draggable: true
      })   
      group.addShape('marker', {
        attrs: {
          x: nodeCfg.width,
          y: nodeCfg.height / 10,
          r:8,
          symbol: G6.Marker.expand,
          fill: 'red',
          stroke:'#fff',
          lineWidth:2
        },
        name:'collapse-icon',
        modelId: cfg.id
      })
      return dom
    },
    update: (cfg, node) => {
    },
    setState(name,value,item){ 
      console.log("setState",item);
      const group = item.getContainer();
      const icon = group.find((e: any) => e.get('name') === 'collapse-icon');
      if(name==='collapse') {
       let attrs= {
          x: nodeCfg.width,
          y: nodeCfg.height / 10,
          r:8,
          symbol: value ? G6.Marker.collapse : G6.Marker.expand,
          fill: 'red',
          stroke:'#fff',
          lineWidth:2
        }
      // graph.value.refreshPositions();
        // icon.destroy()
      // icon.attrs=attrs
      icon.attr('symbol', value ? G6.Marker.expand : G6.Marker.collapse);
      }else {
        icon.attr({
          fill: 'transparent',
          stroke: 'transparent'
        })
      }
    }
  },
  'rect'
)


const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node', 'edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    //outDiv.style.padding = '0px 0px 20px 0px';
    outDiv.innerHTML = `
      <h4>Custom Content</h4>
      <ul>
        <li>Type: ${e.item.getType()}</li>
      </ul>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`;
    return outDiv;
  },
});

const nodeLayout={
    renderer: 'svg',
    container: 'mountNode',
    fitCenter: true,
    // fitView:true,
    // plugins: [tooltip],
    width: 1400,
    height: 900,
    modes: {
      default: ['drag-canvas', 'drag-node', 'zoom-canvas']
    },
    layout: {
      type: 'fruchterman',
      unitRadius: 100,
      center: [200, 200], // 可选，默认为图的中心
      gravity: 2, // 可选
      speed: 0.8, // 可选
      clustering: false, // 可选
      clusterGravity: 100, // 可选
      gpuEnabled:true,
      preventOverlap: true, // 防止节点重叠
      nodeSize: 100,
      linkDistance: 150 // 指定边距离为150
    },
    animate: true,
    defaultNode: {
      type: 'icon-node',
      size: [40, 40] // 节点大小
    },
    defaultEdge: {
      type: 'quadratic',
      size:0.8,
      color: '#4b86bf',
      lineWidth:2,
      targetAnchor: ['Left', 'Top'],
    labelCfg: {
      autoRotate: true,
      // style:{
      //   fill:'#007acc'
      // }
    },
      style: {
        // endArrow: {
        //   path: 'M 0,0 L 8,4 L 8,-4 Z',
        //   d:2,
        //   fill: '#e2e2e2',
        // },
        lineWidth:1.2,
        endArrow: true,
      }
    },
    // edgeStateStyles: {
    //   selected: {
    //     stroke: '#0282FF',
    //     shadowBlur: 0,
    //     'text-shape': {
    //       fill: "#0282FF",
    //       fontWeight: 600,
    //     }
    //   }
    // },
  }

let data = ref({
  nodes: [
    {
      id: '0',
      label: '0',
      cluster: 'a',
      des:'hahahaha',
      collapse:false
    },
    {
      id: '1',
      label: '1',
      cluster: 'a',
      des:'hahahaha',
      collapse:false
    },
    {
      id: '2',
      label: '2',
      cluster: 'b',
      collapsed:false
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
      zIndex: 999
    },
    {
      source: '1',
      target: '2',
      label: '阿斯顿撒多',
      // style: {
      //   fill: '#ccc',
      // }
    },
    {
      source: '2',
      target: '0',
    },
  ]
})

let data1=ref({
  nodes: [
    {
      id: '21',
      label: '21',
      cluster: 'a',
      des:'21',
    },
    {
      id: '22',
      label: '22',
      cluster: 'a',
      des:'22',
    },
    {
      id: '23',
      label: '23',
      cluster: 'a',
      des:'23',
    },
    {
      id: '24',
      label: '24',
      cluster: 'a',
      des:'24',
    },
  ],
  edges: [
    {
      source:"1",
      target:"21"
    },
    {
      source:"1",
      target:"22"
    },
    {
      source:"2",
      target:"23"
    },
    {
      source:"2",
      target:"24"
    },
    {
      source:"3",
      target:"21"
    },
  ]
})

let data2=ref({
  nodes: [
    {
      id: '31',
      label: '31',
      cluster: 'a',
      des:'31',
    },
    {
      id: '34',
      label: '34',
      cluster: 'a',
      des:'34',
    },
    {
      id: '35',
      label: '35',
      cluster: 'a',
      des:'35',
    },
  ],
  edges: [
    {
      source:"0",
      target:"34"
    },
    {
      source:"0",
      target:"35"
    },
    {
      source:"0",
      target:"31"
    },
    {
      source:"22",
      target:"2"
    },
    
  ]
})


const mountNode = ref()

const iconClick=()=>{
  
}


const initG6=()=>{
  graph.value = new G6.Graph(nodeLayout)
  graph.value.data(data.value)
  graph.value.render()
  graph.value.on('collapse-icon:click',  (ev: any) => {
    let model = ev.item.getModel()
    const anchorPoints = ev.item.getAnchorPoints();
    console.log(model.id);
    let zoom=graph.value.getZoom().toFixed(1)
    
    if(!model.collapsed) {
      if(model.id==0) {
        data2.value.nodes.forEach(v=>{
      graph.value.addItem('node',{...v,collapsed:false,isChild:model.id,x:Math.ceil(Math.random())})
      })
      data2.value.edges.forEach(v=>{
          graph.value.addItem('edge',v)
      })
      }else {
        data1.value.nodes.forEach(v=>{
      graph.value.addItem('node',{...v,collapsed:false,isChild:model.id})
      })
      data1.value.edges.forEach(v=>{
          graph.value.addItem('edge',v)
      })
      graph.value.updateItem(model.id, { ...model, collapsed: !model.collapsed })
      graph.value.setItemState(model.id,"collapse",!model.collapsed)
    }
      // 没有数据
      // graph.value.setItemState(model.id,"opacity",false)
    }else {
      graph.value.updateItem(model.id, { ...model, collapsed: !model.collapsed })
      graph.value.setItemState(model.id,"collapse",!model.collapsed)
      const nodes = graph.value.findAll('node', (node) => {
        return model.id ===node._cfg.model.isChild
      });
      nodes.forEach(el=>{
        if(el._cfg) {
          graph.value.removeItem(el._cfg.id)
        }
      })
    }
    graph.value.layout()  
    // graph.value.layout(nodeLayout)
    // graph.value.fitCenter()
  })
  graph.value.on('nodeDom:click',nodeClick)
  graph.value.on('nodeDom:dblclick',nodeDblclick)
}


const drawer=ref(false)
let timer:any=null
const nodeDblclick=(ev)=>{
  clearTimeout(timer);
  console.log(ev);
}

const nodeClick=(ev)=>{
  clearTimeout(timer); 
  timer=setTimeout(function(){
    ev.stopPropagation();
    drawer.value=true
 },300)
}

function cancelClick() {
  drawer.value = false
  
}

onMounted(() => {
  initG6()
})
</script>
<template>
  <div ref="mountNode" id="mountNode"></div>
  <el-drawer
    v-model="drawer"
    title="I am the title"
    :before-close="cancelClick"
    :modal="false"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>
<style lang="less" scoped>
#mountNode {
  width: 1400px;
  height: 900px;
}
</style>
