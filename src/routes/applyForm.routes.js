const express = require('express');
const { saveuserApplyData, getapplyJobDetails } = require('../controllers/applyForm.controller');
const upload = require('../middleware/upload'); // import multer setup

const router = express.Router();

router.post('/apply', upload.single('resume'), saveuserApplyData);
router.get("/userApplications/:userId", getapplyJobDetails);


module.exports = router;
