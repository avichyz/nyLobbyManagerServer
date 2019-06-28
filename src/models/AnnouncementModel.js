'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnouncementSchema = new Schema({
  // announcementId: {
  //   type: String
  // },
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
  isDeleted: {
    type: Boolean,
    default: false
  }
});

AnnouncementSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Announcement', AnnouncementSchema);