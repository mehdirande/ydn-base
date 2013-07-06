goog.require('goog.testing.jsunit');
goog.require('ydn.object.merge');


var setUp = function() {

};

var tearDown = function() {

};


var test_add_field = function() {
  var org = {a: 1};
  var ver1 = {a: 1, b: 2};
  var ver2 = {a: 1};
  var exp = {a: 1, b: 2};
  var result = ydn.object.merge(ver2, ver1, org);
  assertObjectEquals('1', exp, result);

  var result2 = ydn.object.merge(ver1, ver2, org);
  assertObjectEquals('2', exp, result2);
};


var test_remove_field = function() {
  var org = {a: 1, b: 2};
  var ver1 = {a: 1, b: 2};
  var ver2 = {a: 1};
  var exp = {a: 1};
  var result = ydn.object.merge(ver2, ver1, org);
  assertObjectEquals('1', exp, result);

  var result2 = ydn.object.merge(ver1, ver2, org);
  assertObjectEquals('2', exp, result2);
};


var test_add_obj = function() {
  var org = {a: 1};
  var ver1 = {a: 1, b: {a: 1}};
  var ver2 = {a: 1};
  var exp = {a: 1, b: {a: 1}};
  var result = ydn.object.merge(ver2, ver1, org);
  assertObjectEquals('1', exp, result);

  var result2 = ydn.object.merge(ver1, ver2, org);
  assertObjectEquals('2', exp, result2);
};


var test_remove_object = function() {
  var org = {a: 1, b: {a: 2}};
  var ver1 = {a: 1, b: {a: 2}};
  var ver2 = {a: 1};
  var exp = {a: 1};
  var result = ydn.object.merge(ver2, ver1, org);
  assertObjectEquals('1', exp, result);

  var result2 = ydn.object.merge(ver1, ver2, org);
  assertObjectEquals('2', exp, result2);
};


var test_conflict = function() {
  var org = {a: 1};
  var ver1 = {a: 2};
  var ver2 = {a: 3};
  var result = ydn.object.merge(ver2, ver1, org);
  assertObjectEquals('1', {a: 3}, result);

  var result2 = ydn.object.merge(ver1, ver2, org);
  assertObjectEquals('2', {a: 2}, result2);
};
