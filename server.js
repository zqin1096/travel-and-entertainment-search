const express = require('express');

const app = express();

// Define the routes.
app.use('/api/places', require('./routes/api/places'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});