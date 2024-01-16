const express = require('express');
const app = express();

app.use(express.static(__dirname));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
