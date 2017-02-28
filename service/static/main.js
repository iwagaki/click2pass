var lastPassword = "";

function generatePassword(obj, id) {
  var seed = document.getElementById('org_url' + id).value + document.getElementById('masterpwd').value + document.getElementById('username' + id).value + document.getElementById('version' + id).value
  var md5 = CybozuLabs.MD5.calc(seed);

  var mt = new MersenneTwister();
  var rndseed = parseInt(md5.substr(0, 3), 16)
  console.log(rndseed);
  mt.setSeed(rndseed);
  console.log(md5);

  var length = document.getElementById('length' + id).value;
  var is_capital = document.getElementById('capital' + id).checked;
  var is_symbol = document.getElementById('symbol' + id).checked;

  var charset = "abcdefghijklnopqrstuvwxyz0123456789";
  if (is_capital && !is_symbol) {
      charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  } else if (is_capital && is_symbol) {
      charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()`~!@#$%^&*-+=|{}[]:;'<>,.?/";
  } else if (!is_capital && is_symbol) {
      var charset = "abcdefghijklnopqrstuvwxyz0123456789()`~!@#$%^&*-+=|{}[]:;'<>,.?/";
  }

  var retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(mt.nextInt(0, n));
  }

  lastPassword = retVal;
  obj.value = lastPassword;
  obj.select();

  document.oncopy = function(event){
      window.open(document.getElementById('url' + id).value);
  }
}
