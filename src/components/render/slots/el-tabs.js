// export default {
//   options(h, conf, key) {
//     const list = []
//     conf.__slot__.options.forEach(item => {
//       if (conf.__config__.optionType === 'tabs') {
//         list.push(<el-tab-pane label={item.label} border={conf.border}>{item.value}</el-tab-pane>)
//       }
//     })
//     return list
//   }
// }
export default {
  options(h, conf, key) {
    const list = []
    conf.__slot__.options.forEach(item => {
      if (conf.__config__.optionType === 'tabs') {
        list.push(<el-tab-pane label={item.label} border={conf.border}>{item.value}</el-tab-pane>)
      }
    })
    return list
  }
}
