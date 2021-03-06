var lastPassword = "";
var master_pwd = "";

function generatePassword(obj) {
  var id_string = obj.id;
  var id = id_string.substr('passwd'.length);
  var seed = document.getElementById('org_url' + id).value + master_pwd + document.getElementById('username' + id).value + document.getElementById('version' + id).value
  console.log(seed);
  var md5 = CybozuLabs.MD5.calc(seed);

  var mt = new MersenneTwister();
  var rndseed = parseInt(md5.substr(0, 3), 16)
  console.log(rndseed);
  mt.setSeed(rndseed);
  console.log(md5);

  var length = document.getElementById('length' + id).value;
  var has_number = document.getElementById('has_number' + id).checked;
  var has_lowercase = document.getElementById('has_lowercase' + id).checked;
  var has_uppercase = document.getElementById('has_uppercase' + id).checked;
  var has_symbol = document.getElementById('has_symbol' + id).checked;

  var charset = "";
  if (has_number) {
      charset += "0123456789";
  }
  if (has_lowercase) {
      charset += "abcdefghijklnopqrstuvwxyz";
  }
  if (has_uppercase) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (has_symbol) {
      charset += "()`~!@#$%^&*-+=|{}[]:;'<>,.?/";
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


function generateUsername(obj) {
  var id_string = obj.id;
  var id = id_string.substr('username'.length);
  var seed = document.getElementById('org_url' + id).value + master_pwd + document.getElementById('username_version' + id).value
  console.log(seed);
  var md5 = CybozuLabs.MD5.calc(seed);

  var mt = new MersenneTwister();
  var rndseed = parseInt(md5.substr(0, 3), 16)
  console.log(rndseed);
  mt.setSeed(rndseed);
  console.log(md5);

  var has_username = document.getElementById('has_username' + id).checked;
  console.log(has_username);
  if (!has_username)
      return;

  var length = document.getElementById('username_length' + id).value;
  var has_number = document.getElementById('username_has_number' + id).checked;
  var has_lowercase = document.getElementById('username_has_lowercase' + id).checked;

  var charset = "";
  if (has_number) {
      charset += "0123456789";
  }
  if (has_lowercase) {
      charset += "abcdefghijklnopqrstuvwxyz";
  }

  var retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(mt.nextInt(0, n));
  }
  console.log(retVal);

  obj.value = retVal;
  obj.select();
}


var optionIds = ['master_pwd'];

chrome.storage.sync.get(optionIds, function(items) {
  master_pwd = items['master_pwd'];
  elements = document.getElementsByClassName('passwd');

  for (var i = 0; i < elements.length; ++i) {
    (function(){
      var obj = elements[i];
      elements[i].addEventListener('click', function(e){
        generatePassword(obj);
      }, false);
    })();
  }

  username_elements = document.getElementsByClassName('username');

  for (var i = 0; i < username_elements.length; ++i) {
    (function(){
      var obj = username_elements[i];
      username_elements[i].addEventListener('click', function(e){
        generateUsername(obj);
      }, false);
    })();
  }


});
