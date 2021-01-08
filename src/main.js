const div = dom.create("<div>newDiv</div>");
const div3 = dom.create("<div id='parent'></div>");
dom.before(test, div)
dom.wrap(test, div3)
dom.attr(test,'title','gobo')
console.log(dom.attr(test,'title'));
dom.text(test,'这是新的文本啊')
console.log(dom.style(test, 'border'));
dom.style(test, 'border', '1px solid black')
dom.class.add(test, 'red')
dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'red')
dom.on(test,'click', function () {
  console.log('呗点击了');
})
const test2 = dom.find('#test2')[0];
const test3 = dom.find('p', test2)[0]
console.log(test3);
console.log(dom.siblings(dom.find("#s2")[0]))
console.log(dom.next(dom.find("#s2")[0]))
console.log(dom.prev(dom.find("#s2")[0]))
dom.each(dom.children(dom.find('#siblings')[0]), x => dom.style(x, 'color', 'red'))
console.log(dom.index(dom.find("#s2")[0]))