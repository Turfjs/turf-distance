var test = require('tape')
var distance = require('./')

test('distance', function(t){
  var pt1 = { 
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [-75.4, 39.4]}
  }
  var pt2 = {
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [-75.534, 39.123]}
  }

  var dist = distance(pt1, pt2, 'miles')
  t.ok(dist, 'should return a distance')

  t.end()
})