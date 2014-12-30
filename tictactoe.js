$(document).ready(function() {

/*starts the turning count*/
	var turn = 0;

/*hides all of the info divs*/
	$('#player1Information').addClass('disabled');
	$('#player2Information').addClass('disabled');
	$('#player1Color').addClass('disabled');
	$('#player2Color').addClass('disabled');

/*gets all of the player information; still needs to store the values*/
	var getInfo = function () {
		var getPlayer1Name = function() {
			var player1Name = document.getElementById("player1Name").value;
		};

		$('#player1Information').removeClass('disabled');

		$('#player1NameSubmit').click(function() {
			getPlayer1Name();
			$('#player1Information').addClass('disabled');
			$('#player1Color').removeClass('disabled');
		});

		$('.color').click(function() {
			$(this).css({"border-color": "#000000","border-width":"3px","border-style":"solid"});
		});

		$('#playerColorReset').click(function() {
			$('.color').css('border', 'none');
		});

		$('#player1ColorSubmit').click(function() {
			
			$('#player1Color').addClass('disabled');
			$('#player2Information').removeClass('disabled');
		});

		$('#player2NameSubmit').click(function() {
			getPlayer1Name();
			$('#player2Information').addClass('disabled');
			$('#player2Color').removeClass('disabled');
		});

		$('#player2ColorSubmit').click(function() {
			
			$('#player2Color').addClass('disabled');
		});
	};

/*sees if a number is even; used to check whose turn it is*/
	var isEven = function(number) {
		return (number % 2);
	};

/*these two functions are currently not used; they write "X"s or "O"s in cells, but not necessarily when clicked*/ 
	var player1Write = function() {
		$('#tictactoe td').text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#CC2EFA');
	};

	var player2HumanWrite = function() {
		$('#tictactoe td').text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#74DF00');
	};

/*checks to see if three cells are "X"s or "O"s and returns accordingly*/
	var checkRows = function(a,b,c) {
		if (a == "X" && b == "X" && c == "X") {
			alert("player 1 wins!");
			$('#tictactoe td').off('click');
			return 1;
		}
		else if (a == "O" && b== "O" && c == "O") {
			alert("player 2 wins!");
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

/*disables the div asking what type of game the user wants once the type of game is picked*/
		$('#greeting').addClass('disabled');

/*gets all of the player information*/
		getInfo();

		$('#tictactoe td').on('click',function() {
			if (isEven(turn) === 0) {
				$(this).text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#CC2EFA');
			}
			else if (isEven(turn) === 1) {
				$(this).text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#74DF00');
			}
			turn++;

			checkAll(turn);
		});
	});

/*starts the playing against computer game; currently not functional*/
	$('#onePlayer').click(function() {
		
		$('#greeting').addClass('disabled');

		var findSquare = function() {
			var squareNumber = Math.floor(Math.random() * 8);
			var square = 'square' + squareNumber
			return square
		}

/*this is broken: without the if statment, it will put "O" in a random location, but it will override an exisiting letter often; also it will only work within the click function (one has to click to show the "O"s)*/

		var computerTurn = function() {
			square = findSquare();
			var squareID = ('#' + square).length;
			/*if (squareID == 0) {*/
				$('#' + square).text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#74DF00');
			/*}
			else {
				findSquare();
			}	*/
		};

		$('#tictactoe td').one('click',function() {
			if (isEven(turn) === 0) {
				$(this).text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#CC2EFA');
			}
			else {
				computerTurn();
			}

			turn++;
	
			var checkRows = function(a,b,c) {
				if (a == "X" && b == "X" && c == "X") {
					alert("player 1 wins!");
					$('#tictactoe td').off('click');
					return 1;
				}
				else if (a == "O" && b== "O" && c == "O") {
					alert("player 2 wins!");
					$('#tictactoe td').off('click');
					return -1;
				}
				else {
					return 0;
				}
			};


			var checkWin = function() {

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

			win = checkWin();

			if (win == 0 && square0.length !== 0 && square1.length !== 0 && square2.length !== 0 && square3.length !== 0 && square4.length !== 0 && square5.length !== 0 && square6.length !== 0 && square7.length !== 0 && square8.length !== 0) {
				alert("it's a tie!");
				return 0;
			};

	});

	});
	
/*resets the board when the new game button is clicked*/
	$('#reset').click(function() {
		$('#tictactoe td').html("");
		$('#greeting').removeClass('disabled');
	});
	
});