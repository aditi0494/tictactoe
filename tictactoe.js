$(document).ready(function() {

/*creating a class to store all of the player information*/
	function Player(name, color) {
		this.name = name;
		this.color = color;
	};

	var player1 = new Player();
	var player2 = new Player();

/*hides all of the info divs*/
	$('#winAlert').addClass('disabled');
	$('#player1Information').addClass('disabled');
	$('#player2Information').addClass('disabled');
	$('#player1Color').addClass('disabled');
	$('#player2Color').addClass('disabled');

/*gets all of the player information; still needs to store the values*/
	var getPlayer1Info = function () {

		$('#player1Information').removeClass('disabled');

		$('#player1NameSubmit').click(function() {
			$('#player1Information').addClass('disabled');
			$('#player1Color').removeClass('disabled');
			player1.name = ($('#player1Name').val());
			$('#player1Name').val('');	
		});

		$('.colorPlayer1').click(function() {
			$(this).css({"border-color": "#000000","border-width":"3px","border-style":"solid"});
			player1.color = $(this).css('background-color'); 
		});

		$('#player1ColorReset').click(function() {
			$('.colorPlayer1').css('border', 'none');
		});

		$('#player1ColorSubmit').click(function() {
			$('#player1Color').addClass('disabled');
			$('.colorPlayer1').css('border', 'none');
		});
	};

	var getPlayer2Info = function() {

		$('#player1ColorSubmit').click(function() {
			$('#player2Information').removeClass('disabled');
		});

		$('#player2NameSubmit').click(function() {
			$('#player2Information').addClass('disabled');
			$('#player2Color').removeClass('disabled');
			player2.name = ($('#player2Name').val());
			$('#player2Name').val('');
		});

		$('.colorPlayer2').click(function() {
			$(this).css({"border-color": "#000000","border-width":"3px","border-style":"solid"});
			player2.color= $(this).css('background-color');
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
			$('#winAlert').removeClass('disabled');
			$('#whoWon').html(player1.name + " wins!")
			$('#tictactoe td').off('click');
			return 1;
		}
		else if (a == "O" && b== "O" && c == "O") {
			$('#winAlert').removeClass('disabled');
			$('#whoWon').html(player2.name + " wins!")
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
			$('#winAlert').removeClass('disabled');
			$('#whoWon').html("it's a tie!")
			$('#tictactoe td').off('click');
			return 0;
		}
	};

/*starts the two player condition*/
	$('#twoPlayer').click(function() {
		var turn = 0;

/*disables the div asking what type of game the user wants once the type of game is picked*/
		$('#greeting').addClass('disabled');

/*gets all of the player information*/
		getPlayer1Info();
		getPlayer2Info();

		$('#tictactoe td').on('click',function() {
			if (isEven(turn) === 0) {
				$(this).text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color',player1.color);
			}
			else if (isEven(turn) === 1) {
				$(this).text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color',player2.color);
			}
			turn++;

			checkAll(turn);
		});
	});

/*starts the playing against computer game; currently not functional*/
	$('#onePlayer').click(function() {

		var turn = 0;
		
		$('#greeting').addClass('disabled');
		getPlayer1Info();
		player2.name = "the computer";
		player2.color = "black";

		$('#tictactoe td').one('click',function() {

/*this sees if the computer or the person is one away from winning*/
			var computerWrite = function(notsquare) {
				if (document.getElementById(notsquare).innerHTML.length === 0) {
					$('#' + notsquare).off('click');
					$('#' + notsquare).text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color',player2.color);
					return 0;
				}
			};

			var findSquare = function(a,b,c) {
				if (a.innerHTML == "X" && b.innerHTML == "X" || a.innerHTML == "O" && b.innerHTML == "O") {
					return computerWrite($(c).attr('id'));
				}
				else if (b.innerHTML == "X" && c.innerHTML == "X" || b.innerHTML == "O" && c.innerHTML == "O") {
					return computerWrite($(a).attr('id'));
				}
				else if (a.innerHTML == "X" && c.innerHTML == "X" || a.innerHTML == "O" && c.innerHTML == "O") {
					return computerWrite($(b).attr('id'));
				}
			};

			var computerTurn = function() {
				var square0 = document.getElementById("square0");
				var square1 = document.getElementById("square1");
				var square2 = document.getElementById("square2");
				var square3 = document.getElementById("square3");
				var square4 = document.getElementById("square4");
				var square5 = document.getElementById("square5");
				var square6 = document.getElementById("square6");
				var square7 = document.getElementById("square7");
				var square8 = document.getElementById("square8");

/*this has the computer's first turn be random; and if it isn't the first turn, it finds the square to chose by seeing if it is one away from winning*/
				try1 = findSquare(square0,square1,square2);
				if (try1 !== 0) {
					try2 = findSquare(square3,square4,square5);
					if (try2 !== 0) {
						try3 = findSquare(square6,square7,square8);
						if (try3 !== 0) {
							try4 = findSquare(square0,square3,square6);
							if (try4 !== 0) {
								try5 = findSquare(square1,square4,square7);
								if (try5 !== 0) {
									try6 = findSquare(square2,square5,square8);
									if (try6 !== 0) {
										try7 = findSquare(square0,square4,square8);
										if (try7 !== 0) {
											try8 = findSquare(square2,square4,square6);
											if (try8 !== 0 ) {
												squareNumber = Math.floor(Math.random() * 8);
												square = 'square' + squareNumber
												computerWrite(square)
											}
										}
									}
								}
							}
						}
					}
				}
			};

			$(this).text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color',player1.color);
			turn++;
			checkAll(turn);

			computerTurn();
			turn++;
			checkAll(turn);
		});
	});
	
/*resets the board when the new game button is clicked*/
	$('#reset').click(function() {
		$('#winAlert').addClass('disabled');
		$('#tictactoe td').html("");
		$('#greeting').removeClass('disabled');
	});
	
});