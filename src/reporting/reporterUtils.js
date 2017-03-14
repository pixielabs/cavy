function getFormattedDate() {
  // Minor mods from http://stackoverflow.com/a/32062237

  var date = new Date();

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  month = (month < 10 ? '0' : '') + month;
  day = (day < 10 ? '0' : '') + day;
  hour = (hour < 10 ? '0' : '') + hour;
  min = (min < 10 ? '0' : '') + min;
  sec = (sec < 10 ? '0' : '') + sec;

  var str = date.getFullYear() + '-' + month + '-' + day + '_' + hour + '_' + min + '_' + sec;

  return str;
}

module.exports = {
  getFormattedDate: getFormattedDate
}