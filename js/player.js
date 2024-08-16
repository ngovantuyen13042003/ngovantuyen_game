game.player = {
		x: 54,
		y: 0,
		height: 24,
		highestY: 0,
		direction: "left",
		isInAir: false,
		startedJump: false,
		canDoubleJump: false,
		moveInterval: null,
		fallTimeout: function(startingY, time, maxHeight) {
			setTimeout( function () {
				if (this.isInAir) {
					this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
					if (this.y < this.highestY) {
						this.highestY = this.y
					}
					if (time > 37) {
						this.startedJump = false
						game.checkCollisions()
					}
					if (time < 150) {
						time++
						this.fallTimeout(startingY, time, maxHeight)
					} else {
						game.isOver = true
					}
					if (this.y > 40) {
						game.isOver = true
					}
					game.requestRedraw()
				}
			}.bind(this, startingY, time, maxHeight), 12)
		},
		animationFrameNumber: 0,
		collidesWithGround: true,
		animations: {
			// Describe coordinates of consecutive animation frames of objects in textures
			left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
			right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
		},
		animations2: {
			left: [{ tileColumn: 1, tileRow: 5 }, { tileColumn: 2, tileRow: 5 }, { tileColumn: 1, tileRow: 5 }, { tileColumn: 3, tileRow: 5 }],
			right: [{ tileColumn: 6, tileRow: 5 }, { tileColumn: 5, tileRow: 5 }, { tileColumn: 6, tileRow: 5 }, { tileColumn: 4, tileRow: 5 }]
		},
		jump: function(type) {
			if (!this.isInAir) {
				clearInterval(this.fallInterval);
				game.sounds.jump.play();
				this.isInAir = true;
				this.startedJump = true;
				this.canDoubleJump = true; 
				this.performJump(type, 121); 
			} else if (this.canDoubleJump && type !== "fall") {
				clearInterval(this.fallInterval);
				game.sounds.jump.play();
				this.canDoubleJump = false; 
				this.startedJump = true;
				this.performJump(type, 100);
			}
		},
		performJump: function(type, maxHeight) {
			var startingY = this.y;
			var time = 1;
			if (type === "fall") {
				time = 30;
				maxHeight = 0;
			}
			this.fallTimeout(startingY, time, maxHeight);
		},
		land: function() {
			this.isInAir = false;
			this.canDoubleJump = false;
			this.startedJump = false;
			clearInterval(this.fallInterval); 
		}



		
	}
