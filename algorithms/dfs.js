/**
 * dfs 样例解决n个数是否可以有和为m的组合
 *
 */
var a = [];
function dfs (i, sum, n, m) {
	if (i == n) return sum == m;

	// 不取a[i]
	if (dfs(i+1, sum, n, m)) return true;
	
	// 取a[i]
	if (dfs(i+1, sum + a[i], n, m)) return true;

	return false;
}

var solve = function () {
	if( dfs(0, 0, a.length, 5) ) {
		console.log('Yes');
	} else {
		console.log('No');
	}
};

a = [1,2,3,4,5,6,7,8,9];
solve();
