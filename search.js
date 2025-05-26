var searchBox = '.search-box';
var searchItem = '.search-box input';
var listItem = '.result';
var hideClass = 'is-hide';

$(function() {
   $(document).on('change', searchBox + ' input', function() {
    search_filter();
  });
});

function search_filter() {
  $(listItem).removeClass(hideClass);
  for (var i = 0; i < $(searchBox).length; i++) {
    var name = $(searchBox).eq(i).find('input').attr('name');
    var searchData = get_selected_input_items(name);
    if(searchData.length === 0 || searchData[0] === '') {
      continue;
    }
    for (var j = 0; j < $(listItem).length; j++) {
      var itemData = get_setting_values_in_item($(listItem).eq(j), name);
      var check = array_match_check(itemData, searchData);
      if(!check) {
        $(listItem).eq(j).addClass(hideClass);
      }
    }
  }
}

function get_selected_input_items(name) {
  var searchData = [];
  $('[name=' + name + ']:checked').each(function() {
    searchData.push($(this).val());
  });
  return searchData;
}

function get_setting_values_in_item(target, data) {
  var itemData = target.data(data);
  if(!Array.isArray(itemData)) {
    itemData = [itemData];
  }
  return itemData;
}

function array_match_check(arr1, arr2) {
  var arrCheck = false;
  for (var i = 0; i < arr1.length; i++) {
    if(arr2.indexOf(arr1[i]) >= 0) {
      arrCheck = true;
      break;
    }
  }
  return arrCheck;
}