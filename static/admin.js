var dataPoints = [
  { label: "BJP ", y: 0 },
  { label: "Congress ", y: 0 },
  { label: "Republic ", y: 0 },
  { label: "Democratic ", y: 0 },
]
var chartContainer = document.querySelector('#chartContainer');

if(chartContainer) {
  var chart = new CanvasJS.Chart("chartContainer",
    {
      animationEnabled: true,
      theme: "theme2",
      data: [
      {
        type: "column",
        dataPoints: dataPoints
      }
      ]
    });
  chart.render();
}

Pusher.logToConsole = true;

// Configure Pusher instance
var pusher = new Pusher('d9160493eb4e8535ab25', {
  cluster: 'us2',
  encrypted: true
});

// Subscribe to poll trigger
var channel = pusher.subscribe('poll');

// Listen to vote event
channel.bind('vote', function(data) {
  dataPoints = dataPoints.map(dataPoint => {
    console.log(data[4])
    if(dataPoint.label == data[4].name[0]) {
      // VOTE
      dataPoint.y += 1;
    }
    return dataPoint
  });

  // Re-render chart
  chart.render()
});
