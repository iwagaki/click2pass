function save_options() {
  var optionDict = {};

  var optionIds = ['master_pwd'];
  for (var i = 0; i < optionIds.length; i++) {
    id = optionIds[i];
    optionDict[id] = document.getElementById(id).value;
  }

  chrome.storage.sync.set(optionDict, function() {
    var status = document.getElementById('status');
    status.innerHTML = 'Options saved.';
    setTimeout(function() {
      status.innerHTML = '';
    }, 750);
  });
}

function restore_options() {
  var optionIds = ['master_pwd'];

  chrome.storage.sync.get(optionIds, function(items) {
    for (var i = 0; i < optionIds.length; i++) {
      id = optionIds[i];
      if (items[id]) {
        document.getElementById(id).value = items[id];
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', function(e) {
  restore_options();
  document.querySelector('#save').addEventListener('click', save_options);
}, false);
