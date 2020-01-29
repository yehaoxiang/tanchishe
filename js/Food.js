//Food类
function Food() {
  //产生一个食物，保证这个食物不在蛇身上

  while (true) {
    this.x = parseInt(Math.random() * 15)
    this.y = parseInt(Math.random() * 20)

    for (var i = 0; i < g.snake.body.length; i++) {
      if (this.x == g.snake.body[i].x && this.y == g.snake.body[i].y) {
        break
      }
    }

    if (i == g.snake.body.length) {
      break
    }
  }

  console.log(g.tds[this.x][this.y])
  g.tds[this.x][this.y].innerHTML = '*'
}
