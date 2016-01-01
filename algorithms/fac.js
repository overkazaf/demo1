/**
 * 这里用了记忆化搜索技术，可以mark一下
 */
var memo = {};
function fac (n) {
	if (n === 0) return 1;
	else if (typeof memo[n] !== 'undefined') return memo[n];
	return (memo[n] = n * fac(n-1));
};

console.log(fac(10));
