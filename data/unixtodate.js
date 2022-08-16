function toYMD(inputUnix) {
	var unix = new Date(parseInt(inputUnix) * 86400000);
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = year.toString() + "/" + month.toString() + "/" + day.toString();
	return DMY;
}
function changeYMD(inputUnix) {
	var unix = new Date(inputUnix)
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = year.toString() + "/" + month.toString() + "/" + day.toString();
	return DMY;
}
function toDMY(inputUnix) {
	var unix = new Date(parseInt(inputUnix) * 86400000);
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = ("0" + day.toString()).slice(-2) + "/" + ("0" + month.toString()).slice(-2) + "/" + year.toString();
	return DMY;
}
function changeDMY(inputUnix) {
	var unix = new Date(inputUnix)
	var year = unix.getFullYear();
	var month = unix.getMonth() + 1;
	var day = unix.getDate();
	var DMY = ("0" + day.toString()).slice(-2) + "/" + ("0" + month.toString()).slice(-2) + "/" + year.toString();
	return DMY;
}
function toUnix(inputDate) {
	var unix = Date.parse(inputDate.split("/")[2] + "/" + inputDate.split("/")[1] + "/" + inputDate.split("/")[0])
	return Math.floor(unix / 86400000)
}
