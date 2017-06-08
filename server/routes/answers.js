'use strict';
const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers').Answers;

router.route('/')
  .get(AnswerController.getAll)
  .post(AnswerController.create)
  .delete(AnswerController.delete)
  ;

module.exports = router;
