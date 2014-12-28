$(document).ready(function() {

	var turn = 0;

	$('#tictactoe td').one('click',function() {

		var isEven = function(number) {
			return (number % 2);
		};

		if (isEven(turn) === 0) {
			$(this).text("X").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#CC2EFA');
		}
		else if (isEven(turn) === 1) {
			$(this).text("O").css('font-family','PT Sans Narrow').css('font-size','125px').css('color','#74DF00');
		}

		var square0 = document.getElementById("square0").innerHTML;
		var square1 = document.getElementById("square1").innerHTML;
		var square2 = document.getElementById("square2").innerHTML;
		var square3 = document.getElementById("square3").innerHTML;
		var square4 = document.getElementById("square4").innerHTML;
		var square5 = document.getElementById("square5").innerHTML;
		var square6 = document.getElementById("square6").innerHTML;
		var square7 = document.getElementById("square7").innerHTML;
		var square8 = document.getElementById("square8").innerHTML;

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
			else if (square0.length !== 0 && square1.length !== 0 && square2.length !== 0 && square3.length !== 0 && square4.length !== 0 && square5.length !== 0 && square6.length !== 0 && square7.length !== 0 && square8.length !== 0) {
				alert("it's a tie!");
				return 0;
			}
		};

		var checkAll = function() {

			checkRows(square0,square1,square2);
			checkRows(square3,square4,square5);
			checkRows(square6,square7,square8);
			checkRows(square0,square3,square6);
			checkRows(square1,square4,square7);
			checkRows(square2,square5,square8);
			checkRows(square0,square4,square8);
			checkRows(square2,square4,square6);

		};

		checkAll();

		turn++;

	});

	$('#reset').click(function() {
		$('#tictactoe td').html("");
	});

});
