const express = require('express');
const { saveuserApplyData, getapplyJobDetails, viewUserApplication } = require('../controllers/applyForm.controller');
const upload = require('../middleware/upload'); // import multer setup

const router = express.Router();

router.post('/apply', upload.single('resume'), saveuserApplyData);
router.get("/userApplications/:userId", getapplyJobDetails);
router.get('/userApplyDetails/:companyId', viewUserApplication)


module.exports = router;
