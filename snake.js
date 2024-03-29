document.addEventListener("DOMContentLoaded", main());

function main()
{
      const canvas = document.getElementById("snakeCanvas");
      const ctx = canvas.getContext("2d");
      const headImage = new Image();
      const snakeImage = new Image();
      const snakeImage2 = new Image();
      const foodImage = new Image();
      const scorePlusI = new Image();
      const speedPlusI = new Image();
      const elongationI = new Image();
      snakeImage.src = 'img/pixel.png';
      snakeImage2.src = 'img/pixel-d.png';
      foodImage.src = 'img/coin.png';
      scorePlusI.src = 'img/scorePlus.png'; 
      speedPlusI.src = 'img/speedPlus.png';
      elongationI.src = 'img/x.png';
      var score = 0;
      const pixelSize = 20;
      let snake = [{ x: 10, y: 10}];
      let direction = "right";
      let food = { x: 15, y: 15 };
      let scorePlus = true;
      let speedPlus = true;
      let elongation = true;
      let gameInterval;
      let sp1, sp2, sp3, sp4, sp5, sp6;


      function moveSnake() 
      {
        let head = {...snake[0]};

        switch (direction) 
        {
          case "up":
            headImage.src = 'img/head-d.png';
            head.y--;
            break;
          case "down":
            headImage.src = 'img/head-d.png';
            head.y++;
            break;
          case "left":
            headImage.src = 'img/head.png';
            head.x--;
            break;
          case "right":
            headImage.src = 'img/head.png';
            head.x++;
            break;
        }

        snake.unshift(head);

        snake.pop();

        if (head.x < 0)
          head.x = canvas.width / pixelSize - 1;
        else if (head.x >= canvas.width / pixelSize)
          head.x = 0;
        
        if (head.y < 0)
          head.y = canvas.height / pixelSize - 1;
        else if (head.y >= canvas.height / pixelSize)
          head.y = 0;
      }

      function eatFood() 
      {
        food = {x: Math.floor(Math.random() * (canvas.width / pixelSize)), 
          y: Math.floor(Math.random() * (canvas.height / pixelSize))};
        snake.push({});
        var temp = document.getElementById("scoreValue");
        score += 1;
        temp.textContent = score;
      }

      function point()
      {
        sp1 = -1;
        sp2 = -1;
        var temp = document.getElementById("scoreValue");
        score += 2;
        temp.textContent = score;
      }

      function boost()
      {
        sp3 = -1;
        sp4 = -1;
        clearInterval(gameInterval);
        gameInterval = setInterval(draw, 50);
        setTimeout(function() {clearInterval(gameInterval);
          gameInterval = setInterval(draw, 100);}, 4000);
      }

      function extension()
      {
        sp5 = -1;
        sp6 = -1;
        for (let i = 0; i < Math.ceil(score / 3); i++)
          snake.push({});
      }

      function eatFeatureCollision() 
      {
        if (snake[0].x === food.x && snake[0].y === food.y)
          eatFood();
        else if (snake[0].x === sp3 && snake[0].y === sp4)
          boost();
        else if (snake[0].x === sp1 && snake[0].y === sp2)
          point();
        else if (snake[0].x === sp5 && snake[0].y === sp6)
          extension();

        for (let i = 1; i < snake.length; i++)
          if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
            return true;
        return false;
      }

      document.addEventListener("keydown", function (event)
      {
        switch (event.key) 
        {
          case "ArrowUp":
            if (direction != "down")
              direction = "up";
            break;
          case "ArrowDown":
            if (direction != "up")
              direction = "down";
            break;
          case "ArrowLeft":
            if (direction != "right")
              direction = "left";
            break;
          case "ArrowRight":
            if (direction != "left")
              direction = "right";
            break;
        }
      });

      function draw()
      {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) 
        {
          let segment = snake[i];
          let img;
          if (i === 0)
            img = headImage;
          else {
            if (snake[i - 1].y - snake[i].y == 1 || snake[i - 1].y - snake[i].y == -1)
              img = snakeImage2;
            else
              img = snakeImage;
          }
          ctx.drawImage(img, segment.x * pixelSize, segment.y * pixelSize, pixelSize, pixelSize);
        }

        ctx.drawImage(foodImage, food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
        
        if (scorePlus)
          ctx.drawImage(scorePlusI, sp1 * pixelSize, 
          sp2 * pixelSize, pixelSize, pixelSize);
        if (speedPlus)
          ctx.drawImage(speedPlusI, sp3 * pixelSize, 
          sp4 * pixelSize, pixelSize, pixelSize);
        if (elongation)
          ctx.drawImage(elongationI, sp5 * pixelSize, 
          sp6 * pixelSize, pixelSize, pixelSize);

        moveSnake();

        if (eatFeatureCollision()) {
          clearInterval(gameInterval);
          alert("Game Over!!!   Score:" + score);
          return;
        }
      }

      setInterval(function() {
        sp1 = Math.floor(Math.random() * 33);
        sp2 = Math.floor(Math.random() * 33);
        scorePlus = !scorePlus;
      },Math.floor(Math.random() * (2500 - 1250)) + 1250);

      setInterval(function() {
        sp3 = Math.floor(Math.random() * 37);
        sp4 = Math.floor(Math.random() * 37);
        speedPlus = !speedPlus;
      },Math.floor(Math.random() * (2750 - 1750)) + 1750);

      setInterval(function() {
        sp5 = Math.floor(Math.random() * 35);
        sp6 = Math.floor(Math.random() * 35);
        elongation = !elongation;
      },Math.floor(Math.random() * (2750 - 1750)) + 1750);

      gameInterval = setInterval(draw, 100);
}