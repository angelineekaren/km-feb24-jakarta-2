const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { feedback } = JSON.parse(event.body);
  const filePath = path.join('/tmp', 'feedback.txt');

  try {
    fs.appendFileSync(filePath, `${feedback}\n`);
    return {
      statusCode: 200,
      body: 'Feedback saved successfully',
    };
  } catch (err) {
    console.error('Error writing to file', err);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
