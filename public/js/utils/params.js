angular.module('courseApp.utils')
 
.factory('ParamBuilder', function() {
  var builder = {}
  builder.build = function(obj) {
    var params = ''
    for (var prop in obj) {
      if (params != '')
        params += '&'
      params += prop + '=' + encodeURIComponent(obj[prop])
    }
    return params
  }
  return buidler
})