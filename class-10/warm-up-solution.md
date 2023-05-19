# Warm-Up Exercise

Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```js
'use strict';

require('dotenv').config();
const express = require(express);
const cors = require('cors');
const app = express()
app.use(cors())

const PORT = process.env.PORT || 3002;

app.get('/username', (request, response) => {
  const userInfo = {};

  userInfo.name = request.username;
  userInfo.password = request.password;

  response.send(userInfo);
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
```
