/**
 * 用二维数组记录中间结果，进行记忆化搜索的dp算法
 */

var w = [2, 1, 3, 2];
var v = [3, 2, 4, 2];
var n = 4;
var V = 11;
var W = 5;
var dp;

function init() {
	dp = new Array();
	for (var i = 0; i<=W; i++) {
		dp[i] = new Array();
		for (var j=0; j<=V; j++) {
			dp[i][j] = 0;
		}
	}
};


function fac (i, j) {
	if (dp[i][j] > 0) {
		return dp[i][j];
	}

	var res;
	if (i == n) {
		// 没有物品可以选了
		res = 0;
	} else if (j < w[i]) {
		res = fac(i+1, j);
	} else {
		res = Math.max(fac(i+1, j), fac(i+1, j-w[i])+v[i]);
	}

	return (dp[i][j] = res);
};

var solve = function (){
	init();
	console.log(fac(0,W));
	console.log(dp);
};

solve();
