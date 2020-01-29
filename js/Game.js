//Game类
function Game() {
  //tr td的二维数组
  this.tds = []
  //蛇的类
  this.snake = new Snake()
  this.init()
  //绑定键盘监听
  this.bindEvent()
}
Game.prototype.init = function() {
  //得到table
  var table = document.getElementsByTagName('table')[0]

  //创建tr  td
  for (let i = 0; i < 15; i++) {
    var otr = document.createElement('tr')
    //二维数组，临时对象
    var tempArr = []
    table.appendChild(otr)
    for (var j = 0; j < 20; j++) {
      var otd = document.createElement('td')
      tempArr.push(otd)
      otr.appendChild(otd)
    }
    this.tds.push(tempArr)
  }
}

//因为蛇是作为game类的属性，蛇的渲染必须单独出来渲染，在game类里面渲染的话，实例g还没有被return出来，会导致找不到属性
Game.prototype.start = function() {
  //帧编号
  this.frame = 0
  this.snake.render()
  this.food = new Food()

  //主定时器,使用箭头函数就不需要备份this了

  this.timer = setInterval(() => {
    this.frame++
    infoBox.innerHTML = this.frame

    if (this.frame % 10 == 0) {
      //蛇身体的update，数组的变化 //蛇身体的渲染，根据update的返回值做短路判断，返回了false，最后一步就不会被渲染
      this.snake.update() && this.snake.render()
    }
  }, 20)
}

//绑定监听
Game.prototype.bindEvent = function() {
  //备份this
  var self = this

  //键盘事件监听
  document.onkeydown = function(event) {
    console.log(event)
    var event = event || window.event
    if (event.keyCode == 37 && self.snake.direction != 'RIGHT') {
      self.snake.direction = 'LEFT'
    } else if (event.keyCode == 38 && self.snake.direction != 'DOWN') {
      self.snake.direction = 'UP'
    } else if (event.keyCode == 39 && self.snake.direction != 'LEFT') {
      self.snake.direction = 'RIGHT'
    } else if (event.keyCode == 40 && self.snake.direction != 'UP') {
      self.snake.direction = 'DOWN'
    }
  }
}

//死亡  游戏结束
Game.prototype.gameover = function() {
  clearInterval(this.timer)
}

//生成新的食物
Game.prototype.createNewFood = function() {
  //清除原先的食物
  this.tds[this.food.x][this.food.y].innerHTML = ''
  //生成新的食物
  this.food = new Food()
}
