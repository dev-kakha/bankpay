const express = require('express');
const path = require('path');
const client = require('prom-client');

const app = express();
const port = 5000;

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000]
});

// სტატიკური ფაილები
app.use(express.static(__dirname));

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

// მთავარი გვერდი
app.get('/', (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.sendFile(path.join(__dirname, 'index.html'));
  end({ method: 'GET', route: '/', code: 200 });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
