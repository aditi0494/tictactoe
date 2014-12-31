$(document).ready(function() {

	var player1 = new Player();
	var player2 = new Player();

/*creating a class to store all of the player information*/
	function Player() {
		this.name = "name";
		this.color = "color";
	};

/*hides all of the info divs*/
	$('#player1Information').addClass('disabled');
	$('#player2Information').addClass('disabled');
	$('#player1Color').addClass('disabled');
	$('#player2Color').addClass('disabled');

/*gets all of the player information; still needs to store the values*/
	var getInfo = function () {

		$('#player1Information').removeClass('disabled');

		$('#player1NameSubmit').click(function() {
			$('#player1Information').addClass('disabled');
			$('#player1Color').removeClass('disabled');
			player1.name = ($('#player1Name').val());
			$('#player1Name').val('');	
		});

		$('.colorPlayer1').click(function() {
			$(this).css({"border-color": "#000000","border-width":"3px","border-style":"solid"});
/*the following currently doesn't work (first, it just returns the id, which is the name of the color (i.e. "green"), also it doesn't store the variable)*/
			player1.color = $(this).attr('id');
			return player1.color; 
		});

		$('#player1ColorReset').click(function() {
			$('.colorPlayer1').css('border', 'none');
		});

		$('#player1ColorSubmit').click(function() {
			$('#player1Color').addClass('disabled');
			$('#player2Information').removeClass('disabled');
			$('.colorPlayer1').css('border', 'none');
		});

		$('#player2NameSubmit').click(function() {
			$('#player2Information').addClass('disabled');
			$('#player2Color').removeClass('disabled');
			player2.name = ($('#player2Name').val());
			$('#player2Name').val('');
		});

		$('.colorPlayer2').click(function() {
			$(this).css({"border-color": "#000000","border-width":"3px","border-style":"solid"});
		});


		$('#player2ColorReset').click(function() {
			$('.colorPlayer2').css('border', 'none');
		});

		$('#player2ColorSubmit').click(function() {
			$('#player2Color').addClass('disabled');
			$('.colorPlayer2').css('border', 'none');
		});
	};


/*sees if a number is even; used to check whose turn it isfor two player*/
	var isEven = function(number) {
		return (number % 2);
	};

/*checks to see if three cells are "X"s or "O"s and returns accordingly*/
	var checkRows = function(a,b,c) {
		if (a == "X" && b == "X" && c == "X") {
			alert(player1.name + " wins!");
			$('#tictactoe td').off('click');
			return 1;
		}
		else if (a == "O" && b== "O" && c == "O") {
			alert(player2.name + " wins!");
			$('#tictactoe td').off('click');
			return -1;
		}
		else {
			return 0;
		}
	};

/*updates variables for what is inside of the cells and checks rows for all win conditions*/
	var checkWin = function() {
		var square0 = document.getElementById("square0").innerHTML;
		var square1 = document.getElementById("square1").innerHTML;
		var square2 = document.getElementById("square2").innerHTML;
		var square3 = document.getElementById("square3").innerHTML;
		var square4 = document.getElementById("square4").innerHTML;
		var square5 = document.getElementById("square5").innerHTML;
		var square6 = document.getElementById("square6").innerHTML;
		var square7 = document.getElementById("square7").innerHTML;
		var square8 = document.getElementById("square8").innerHTML;

		var row1 =  checkRows(square0,square1,square2);
		var row2 =  checkRows(square3,square4,square5);
		var row3 =  checkRows(square6,square7,square8);
		var row4 =  checkRows(square0,square3,square6);
		var row5 =  checkRows(square1,square4,square7);
		var row6 =  checkRows(square2,square5,square8);
		var row7 =  checkRows(square0,square4,square8);
		var row8 =  checkRows(square2,square4,square6);

		if (row1 === 1 || row2 === 1 || row3 === 1 || row4 === 1 || row5 === 1 || row6 === 1 || row7 === 1 || row8 === 1) {
			return 1
		}
		else if (row1 === -1 || row2 === -1 || row3 === -1 || row4 === -1 || row5 === -1 || row6 === -1 || row7 === -1 || row8 === -1) {
			return -1
		}
		else {
			return 0
		}
	};

/*checks if there is a tie (when there is not a win)*/
	var checkAll = function(number) {
		win = checkWin();

		if (win == 0 && number == 9) {
			alert("it's a tie!");
			return 0;
		}
	};

/*starts the two player condition*/
	$('#twoPlayer').click(function() {
		var turn = 0;

/*disables the div asking what type of game the user wants once the type of game is picked*/
		$('#greeting').addClass('disabled');

/*gets all of the player information*/
		getInfo();

		$('#tictactoe td').on('click',function() {
			if (isEven(turn) === 0) {
				$(this).text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','player1.color');
			}
			else if (isEven(turn) === 1) {
				$(this).text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','player2.color');
			}
			turn++;

			checkAll(turn);
		});
	});

/*starts the playing against computer game; currently not functional*/
	$('#onePlayer').click(function() {

		var turn = 0;
		var clickedItem = [];
		
		$('#greeting').addClass('disabled');

/*this is broken: without the if statment, it will put "O" in a random location, but it will override an exisiting letter often*/
		$('#tictactoe td').one('click',function() {

/*this just finds a square randomly to fix the animation; then will change so that it picks logically*/
			var findSquare = function() {
				var squareNumber = Math.floor(Math.random() * 8);
				var square = 'square' + squareNumber
				return square
			};

			var computerTurn = function() {
				square = findSquare();
				var squareID = $('#' + square);
				var squareInside = squareID.html();
				clickedItem.push(square);
				var position = clickedItem.indexOf(square);

				console.log(square);
				console.log(clickedItem);
				
				$('#' + square).off('click');
				if (position == turn) {
					$('#' + square).text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#74DF00');
					return 0
				}
				else {
					return 1
				}

			};

			$(this).text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#CC2EFA');
			var success = 0;

			lastClicked = $(this).attr('id');
			clickedItem.push(lastClicked);
			turn++;

			success = computerTurn();
			if (success == 1) {
				computerTurn();
			}
			turn++;
			checkAll(turn);
			
			console.log(success);
		});
	});
	
/*resets the board when the new game button is clicked*/
	$('#reset').click(function() {
		$('#tictactoe td').html("");
		$('#greeting').removeClass('disabled');
	});
	
});