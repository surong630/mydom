window.dom = {
  //创建节点 接收一个标签名
  create (string) {
    // 创建一个template标签,里面可以容纳任意元素,但div不可以容纳td元素
    const container = document.createElement("template");
    // 将div的HTML设置为传入的string,并去掉前后的空格,若前后没有去空格,第一个返回的可能是文本不是所需要的内容
    container.innerHTML = string.trim();
    // 返回div的第一个子元素(特别的方法)
    return container.content.firstChild;
  },
  // 在节点的后面插入节点
  after(node,node2) {
    // 找到node的爸爸的节点调用,将node2插到node下一个节点的前面
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  // 在节点的前面插入
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  // 给父节点增加子节点,插入到其他地方,当前的地方会移开
  append (parent, child) {
    parent.appendChild(child)
  },
  wrap(node, parent) {
    // 把parent放在node的前面
    dom.before(node, parent)
    // 把node放在parent的里面
    dom.append(parent, node)
  },
  // 删除节点
  remove(node) {
    // 找到该节点的父节点,然后删除父节点的子节点
    node.parentNode.removeChild(node);
    // 返回删除的节点以便引用
    return node
  },
  // 删除所有的子节点
  empty(node) {
    // 直接删除
    // node.innerHTML = '';
    // 找到所有的子节点
    // const childNodes = node.childNodes;
    // 以上的简写
    const {childNodes} = node;
    // 保存删除的数组
    const array = []
    /* 遍历所有子节点 !!!这里的childNodes的长度是实时变化的所以这种方式有弊端
    for(let i=0;i<childNodes.length;i++) {
      // 将所有找到的节点移除
      dom.remove(childNodes[i]);
      // 将删除了的节点保存到数组中,返回以供使用
      array.push(childNodes[i])
    }
    return array*/
    // 设置x为node的第一个子节点
    let x = node.firstChild
    while(x){
      // remove后会有返回值,所以可以将删除的push到数组中
      array.push(dom.remove(node.firstChild))
      // 然后让x等于下一个子节点,直到没有子节点
      x = node.firstChild
    }
    // 返回数组
    return array
  },
  // 设置节点属性
  attr(node, name, value) { // 重载(根据参数个数写不同的代码)
    // 判断实参的长度,如果实参长度为3就设置 
    if(arguments.length === 3) {
      node.setAttribute(name, value)
    }else if(arguments.length === 2){
    // 判断实参的长度,如果实参长度为2就读取
      return node.getAttribute(name)
    }
  },
  // 设置节点的内容 会同时改掉该节点里面含有的子节点
  text(node, string) { // 适配两种浏览器
    if(arguments.length === 2){
      // 判断如果有则用,没有就用另一种
      if('innerText' in node) {
        node.innerText = string //该方法是IE的比较通用
      }else {
        node.textContent = string // 该方法火狐谷歌等用的比较多
      }
    }else if(arguments.length ===1) {
      if('innerText' in node) {
        return node.innerText //该方法是IE的比较通用
      }else {
        return node.textContent// 该方法火狐谷歌等用的比较多
      }
    }
  },
  // 改变innerHTML
  html(node, string) {
    if(arguments.length === 2){
      // 判断如果有则用,没有就用另一种
      node.innerHTML = string
    }else if(arguments.length ===1) {
      return node.innerHTML
    }
  },
  // 修改dom的style属性
  style(node, name, value) {
    // 若长度为3 是直接设置style样式
    if(arguments.length === 3) {
      node.style[name] = value
      // 当长度为2时还需要判断第二个值类型为对象(设置),还是字符串(读取)
    }else if(arguments.length === 2) {
      if(typeof name === 'string') {
        return node.style[name]
      }else if(name instanceof Object) {
        // 读取到所有的key
        const object = name
        for(let key in object) {
          // 将每个的key设置为对象的key值
          node.style[key] = object[key]
        }
      }
    }
  },
  // 查看移除设置class
  class: {
    // 添加
    add (node, className) {
      node.classList.add(className)
    },
    // 移除
    remove (node, className) {
      node.classList.remove(className)
    },
    // 查看有无
    has (node, className) {
      return node.classList.contains(className)
    }
  },
  // 添加监听事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  // 移除监听事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  // 给选择器查对应的节点
  find(selector, scope) {
    // 返回的是一个数组
    // 若存在一个返回就用返回内 如果没有就在文档中找
    return (scope || document).querySelectorAll(selector)
  },
  // 找节点的父亲
  parent(node) {
    return node.parentNode
  },
  // 找节点的儿子
  children(node) {
    return node.children
  },
  // 用于获取兄弟姐妹,除了自己
  siblings(node) {
    console.log(node.parentNode.children);
    console.log(node);
    // 将生成的伪数组转换成数组,再filter过滤
    return Array.from(node.parentNode.children).filter(x => {
      return x !== node
    })
  },
  // 找到下一个节点
  next(node) {
    let x = node.nextSibling
    // 判断是否下一个是文本
    while(x && x.nodeType === 3) {
      x = x.nextSibling
      // 直到x是节点退出循环
    }
    return x
  },
  // 找到上一个节点
  prev(node) {
    let x = node.previousSibling
    // 判断是否下一个是文本
    while(x && x.nodeType === 3) {
      x = x.previousSibling
      // 直到x是节点退出循环
    }
    return x
  },
  // 遍历所有节点
  each(nodeList,fn) {
    for(let i=0;i<nodeList.length;i++) {
      fn.call(null, nodeList[i])
    }
  },
  // 找到自己是第几
  index(node) {
    // 获取所有孩子,判断什么时候是自己 然后停止,返回
    const list = dom.children(node.parentNode);
    let i
    for(i =0;i<list.length;i++) {
      if(list[i] === node) {
        break
      }
    }
    return i
  }
}