// JavaScript Document
const countmax = 5;
var CPlayer = 0; // Current Player (0 is O,1 is X)
var InGame = false;
var l_played = [],
	l_win = [];
var mode = 0; // 0: no block; 1: block
var timereturn = false;

//New Game
function Loaded() {
	InGame = true;
	CPlayer = 0; // Current Player (0 is O,1 is X)
	l_played = [], l_win = [];
	var imgp = document.getElementById("imgPlayer");
	imgp.style.backgroundImage = "url('Images/Opng.png')";


	var table = document.getElementById("table");
	var row = document.getElementsByClassName("row");
	var square = document.getElementsByClassName("square");

	// Create Table
	table.innerHTML = "";
	if(document.getElementById("size_caro").value >= 5){
		for (y = 0; y < document.getElementById("size_caro").value; y++) {
			table.innerHTML += '<tr class="row"></tr>';
			for (x = 0; x < document.getElementById("size_caro").value; x++) {
				var div = '<div class="square" onClick="Click(id)" onMouseOver="MouseOver(id)" onMouseOut="MouseOut(id)"></div>';
				row.item(y).innerHTML += '<td class="col">' + div + '</td>';
				square.item(x + y * document.getElementById("size_caro").value).setAttribute("id", (x + y * document.getElementById("size_caro").value).toString());
				square.item(x + y * document.getElementById("size_caro").value).setAttribute("player", "-1");
			}
		}
	}
	else{
		alert("Bàn cờ phải lớn hơn hoặc bằng 5");
	}
}

function GetBoard() {
	var TBoard = [];
	var sqr = document.getElementsByClassName("square");
	for (i = 0; i < document.getElementById("size_caro").value * document.getElementById("size_caro").value; i++)
		TBoard.push(parseInt(sqr.item(i).getAttribute("player")));

	return TBoard;
}

//Play Game
function Click(id) {
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	if (square.item(pos).getAttribute("player") != "-1") return;
	var path = "url('Images/Opng.png')";
	if (CPlayer == 1) path = "url('Images/Xpng.png')";
	square.item(pos).style.backgroundImage = path;
	square.item(pos).setAttribute("player", CPlayer.toString());
	l_played.push(pos);

	var win = WinGame();
	var pwin = CPlayer;

	if (CPlayer == 0) CPlayer = 1;
	else CPlayer = 0;

	var iplayer = "url('Images/Opng.png')";
	if (CPlayer == 1) iplayer = "url('Images/Xpng.png')";
	var imgp = document.getElementById("imgPlayer");
	imgp.style.backgroundImage = iplayer;
	if (!win) {
		win = WinGame();
		pwin = 1;
	}

	if (win) {
		var mess = document.getElementById("name1").value + ' with "X" win';
		if (pwin == 0) mess = document.getElementById("name2").value + ' with "O" win';
		alert(mess);
		InGame = false;
	}
}

// Min Max
function maxab(a, b) {
	if (a > b) return a;
	else return b;
}

function minab(a, b) {
	if (a < b) return a;
	else return b;
}

function MouseOver(id) {
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#3F3";
}

function MouseOut(id) {
	if (!InGame) return;
	var square = document.getElementsByClassName("square");
	var pos = parseInt(id);
	square.item(pos).style.backgroundColor = "#FFF";
}

function WinGame() {
	var result = false;
	var Board = GetBoard();
	for (x = 0; x < document.getElementById("size_caro").value; x++) {
		for (y = 0; y < document.getElementById("size_caro").value; y++) {
			if (winHor(x, y, Board) || winVer(x, y, Board) || winCross1(x, y, Board) ||
				winCross2(x, y, Board)) {
				var square = document.getElementsByClassName("square");
				for (i = 0; i < l_win.length; i++) {
					square.item(l_win[i]).style.backgroundColor = "#FF0";
				}
				result = true;
			}
		}
	}
	return result;
}

function winHor(x, y, Board) {
	l_win = [];
	var count = 0,
		counto = 0; // count opponent
	var player = Board[x + y * document.getElementById("size_caro").value];
	if (player == -1) return false;

	if (x > 0) {
		var p = Board[x - 1 + y * document.getElementById("size_caro").value];
		if (p != player && p != -1) counto++;
	}

	for (i = x; i < document.getElementById("size_caro").value; i++) {
		var p = Board[i + y * document.getElementById("size_caro").value];
		if (p == player && p != -1) {
			count++;
			l_win.push(i + y * document.getElementById("size_caro").value);
		} else {
			if (p != -1) counto++;
			break;
		};
	}
	if (count >= countmax) {
		if (mode == 0)
			return true;
		else {
			if (counto >= 2) return false;
			else return true;
		}
	}
	return false;
}

function winVer(x, y, Board) {
	l_win = [];
	var count = 0,
		counto = 0;
	var player = Board[x + y * document.getElementById("size_caro").value];
	if (player == -1) return false;

	if (y > 0) {
		var p = Board[x + (y - 1) * document.getElementById("size_caro").value];
		if (p != player && p != -1) counto++;
	}

	for (i = y; i < document.getElementById("size_caro").value; i++) {
		var p = Board[x + i * document.getElementById("size_caro").value];
		if (p == player && p != -1) {
			count++;
			l_win.push(x + i * document.getElementById("size_caro").value);
		} else {
			if (p != -1) counto++;
			break;
		};
	}
	if (count >= countmax) {
		if (mode == 0)
			return true;
		else {
			if (counto >= 2) return false;
			else return true;
		}
	}
	return false;
}

function winCross1(x, y, Board) {
	l_win = [];
	if (x > document.getElementById("size_caro").value - countmax || y < countmax - 1) return false;
	var count = 0,
		counto = 0;
	var player = Board[x + y * document.getElementById("size_caro").value];
	if (player == -1) return false;

	if (y < document.getElementById("size_caro").value - 1 && x > 0) {
		var p = Board[x - 1 + (y + 1) * document.getElementById("size_caro").value];
		if (p != player && p != -1) counto++;
	}

	for (i = 0; i <= minab(document.getElementById("size_caro").value - x, y); i++) {
		var p = Board[(x + i) + (y - i) * document.getElementById("size_caro").value];
		if (p == player && p != -1) {
			count++;
			l_win.push((x + i) + (y - i) * document.getElementById("size_caro").value);
		} else {
			if (p != -1) counto++;
			break;
		};
	}
	if (count >= countmax) {
		if (mode == 0)
			return true;
		else {
			if (counto >= 2) return false;
			else return true;
		}
	}
	return false;
}

function winCross2(x, y, Board) {
	l_win = [];
	if (x > document.getElementById("size_caro").value - countmax || y > document.getElementById("size_caro").value - countmax) return false;
	var count = 0,
		counto = 0;
	var player = Board[x + y * document.getElementById("size_caro").value];
	if (player == -1) return false;

	if (y > 0 && x > 0) {
		var p = Board[x - 1 + (y - 1) * document.getElementById("size_caro").value];
		if (p != player && p != -1) counto++;
	}

	for (i = 0; i < minab(document.getElementById("size_caro").value - x, document.getElementById("size_caro").value - y); i++) {
		var p = Board[(x + i) + (y + i) * document.getElementById("size_caro").value];
		if (p == player && p != -1) {
			count++;
			l_win.push((x + i) + (y + i) * document.getElementById("size_caro").value);
		} else {
			if (p != -1) counto++;
			break;
		};
	}
	if (count >= countmax) {
		if (mode == 0)
			return true;
		else {
			if (counto >= 2) return false;
			else return true;
		}
	}
	return false;
}

function Undo(time) {
	if (time < 1) return;
	if (l_played.length <= 0 || !InGame) return;
	var sqr = document.getElementsByClassName("square");
	sqr.item(l_played[l_played.length - 1]).setAttribute("player", "-1");
	sqr.item(l_played[l_played.length - 1]).style.backgroundImage = "";

	l_played.pop();
	if (CPlayer == 0) CPlayer = 1;
	else CPlayer = 0;

	var iplayer = "url('Images/Opng.png')";
	if (CPlayer == 1) iplayer = "url('Images/Xpng.png')";
	var imgp = document.getElementById("imgPlayer");
	imgp.style.backgroundImage = iplayer;
}