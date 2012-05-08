Meteor.startup(function(){
  Meteor.setInterval(function() {
    Session.set('now', new Date());
  }, 500);
})

var time_component = function (component, name) {
  return component + ' ' + (component > 1 ? name + 's' : name);
}

var to_time = function(time_in_milliseconds) {
  var t = Math.floor(time_in_milliseconds/1000);
  return [[60, "second"], [60, "minute"], [24, "hour"], [365, "day"], [1000, "year"]].map(function(part) {
    q = t % part[0];
    t = Math.floor(t/part[0]);
    return [q, time_component(q, part[1])];
  }).reverse().reduce(function(previousValue, currentValue, index, array){
    if(currentValue[0] > 0 || previousValue.length !== 0 ) {
      previousValue.push(currentValue);
    }
    return previousValue
  }, []).map(function(a) { return a[1] }).join(', ');
}