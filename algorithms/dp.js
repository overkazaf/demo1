/**
 *	背包的dp问题
 */

var w = [];
var v = [];
var n;

function dp (i, j) {
	var res;
	if (i == n) {
		res = 0;	
	} else if (j < w[i]) {
		// 这个背包无法放
		res = dp(i+1, j);
	} else {
		// 放与不放的最大值进行比较
		res = Math.max(dp(i+1,j), dp(i+1, j-w[i])+v[i]);
	}

	return res;
};

w = [2,1,3,2];
v = [3,2,4,2];
n = 4;

function solve () {
	console.log(dp(0,5));
}

solve();
