// Set-Up Routes

import express from 'express';
import path from 'path';
const router= express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'static', 'webpage.html'));
});

export default router;
