const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule data collection every 24 hours
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled data collection...');
  exec('node scripts/data_collector.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
});

console.log('Data collector scheduler started. Runs every 24 hours at midnight.');