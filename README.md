尝试封装了简单的DOM库<br>
  可以操作DOM对象
  ```JavaScript
  //创建节点
  create(string)
  //在节点的后面插入节点
  after(node,node2)
  // 在节点的前面插入
  before(node, node2)
  // 给父节点增加子节点
  append (parent, child)
  // 增加父节点
  wrap(node, parent)
  // 删除节点
  remove(node)
  // 删除所有的子节点
  empty(node)
  // 设置节点属性
  attr(node, name, value)
  // 设置节点的内容
  text(node, string)
  // 改变innerHTML
  html(node, string)
  // 修改dom的style属性
  style(node, name, value)
  // 查看移除设置class
  class: {
   add (node, className)
   remove (node, className)
   has (node, className)
   }
   // 添加监听事件
   on(node, eventName, fn)
   // 移除监听事件
   off(node, eventName, fn)
   // 给选择器查对应的节点
   find(selector, scope)
   // 找节点的父亲
   parent(node)
   // 找节点的儿子
   children(node)
   // 用于获取兄弟姐妹,除了自己
   siblings(node)
   // 找到下一个节点
   next(node)
   // 找到上一个节点
   prev(node)
  // 遍历所有节点
   each(nodeList,fn)
   // 找到自己是第几
   index(node)
  ```
  以上为现有的封装好的操作,具体的使用代码可以看dom.js中的内容
