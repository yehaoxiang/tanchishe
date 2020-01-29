//蛇的类
function Snake() {
  //蛇的身体
  this.body = [{ x: 3, y: 10 }, { x: 3, y: 9 }, { x: 3, y: 8 }]

  //蛇前进的默认方向
  this.direction = 'RIGHT'
}
//蛇身体的update
Snake.prototype.update = function() {
  //根据运动方向给数组加上头部
  switch (this.direction) {
    case 'RIGHT':
      this.body.unshift({
        x: this.body[0].x,
        y: this.body[0].y + 1
      })
      break
    case 'LEFT':
      this.body.unshift({
        x: this.body[0].x,
        y: this.body[0].y - 1
      })
      break
    case 'DOWN':
      this.body.unshift({
        x: this.body[0].x + 1,
        y: this.body[0].y
      })
      break
    case 'UP':
      this.body.unshift({
        x: this.body[0].x - 1,
        y: this.body[0].y
      })
      break
  }

  //判断蛇是否死亡

  //最后一步走完后，判断碰壁
  if (
    this.body[0].x < 0 ||
    this.body[0].x > 14 ||
    this.body[0].y < 0 ||
    this.body[0].y > 19
  ) {
    alert('碰壁死亡')
    g.gameover()
    return false
  }

  //最后一步走完后，碰到自己生长身子死亡
  for (let i = 1; i < this.body.length; i++) {
    if (this.body[i].x == this.body[0].x && this.body[i].y == this.body[0].y) {
      alert('碰到自己死亡')
      g.gameover()
      return false
    }
  }

  if (this.body[0].x == g.food.x && this.body[0].y == g.food.y) {
    //碰到了食物，蛇的尾部不删除,并且重新生成一个食物
    g.createNewFood()
  } else {
    //蛇的尾部变白，蛇的头部加上
    var last = this.body.pop()
    g.tds[last.x][last.y].style.background = 'white'
  }

  return true
}

//蛇身体的渲染方法
Snake.prototype.render = function() {
  g.tds[this.body[0].x][this.body[0].y].style.background = 'red'
  for (i = 1; i < this.body.length; i++) {
    g.tds[this.body[i].x][this.body[i].y].style.background = 'blue'
  }
}
