
'use strict';
module.exports = function (app) {
    var AnnouncementManager = require('../controllers/AnnouncementController');

    // routes
    app.route('/announcement')
        .get(AnnouncementManager.getAllAnnouncements)
        .post(AnnouncementManager.saveAndUpdateAnnouncementPost);
        // .post(AnnouncementManager.saveAnnouncement);

    app.route('/announcement/:announcementId')
        .get(AnnouncementManager.getAnnouncement)
        .post(AnnouncementManager.updateAnnouncementPost)
        .put(AnnouncementManager.updateAnnouncement)
        .delete(AnnouncementManager.deleteAnnouncement)
}