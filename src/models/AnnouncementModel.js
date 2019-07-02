'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnouncementSchema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  info: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  deletionDate: {
    type: Date,
    default: null
  },
  isHidden: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

AnnouncementSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Announcement', AnnouncementSchema);