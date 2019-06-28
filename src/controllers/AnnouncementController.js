
let mongoose = require('mongoose');
var assert = require('assert');
let AnnouncementSchema = mongoose.model('Announcement');

exports.getAllAnnouncements = function (req, res) {
    AnnouncementSchema.find({}, function (err, announcement) {
        if (err) res.send(err);
        res.json(announcement);
    });
};

exports.saveAnnouncement = function (req, res) {
    let newAnnouncement = new AnnouncementSchema(req.body);
    newAnnouncement.save(
        function (err, announcement) {
            if (err) {
                assert.equal(err.errors['name'].message,
                    'Path `name` is required.');
                res.send(err);
            }
            res.json(announcement);
        });
}


exports.saveAndUpdateAnnouncementPost = function (req, res) {
    AnnouncementSchema.findOneAndUpdate({ announcementId: req.body.announcementId }, req.body, { new: true },
        function (err, announcement) {
            // if the function found no Announcement, create one
            if (!announcement) {
                let newAnnouncement = new AnnouncementSchema(req.body);
                newAnnouncement.save(
                    function (err, Announcement) {
                        if (err) {
                            assert.equal(err.errors['name'].message,
                                'Path `name` is required.');
                            res.send(err);
                        }
                    });
            }
            res.json(announcement);
        });
    ;
}


exports.getAnnouncement = function (req, res) {
    AnnouncementSchema.findById(req.params.announcementId,
        function (err, announcement) {
            if (err) res.send(err);
            res.json(announcement);
        });
};

exports.updateAnnouncementPost = function (req, res) {
    AnnouncementSchema.findOneAndUpdate({ announcementId: req.params.announcementId }, req.body, { new: true },
        function (err, announcement) {
            console.log(announcement)
            if (err) res.send(err);
            res.json(announcement);
        });
    ;
}

exports.updateAnnouncement = function (req, res) {
    AnnouncementSchema.findOneAndUpdate({ _id: req.params.announcementId }, req.body, { new: true },
        function (err, announcement) {
            console.log(announcement)
            if (err) res.send(err);
            res.json(announcement);
        });
    ;
}
exports.deleteAnnouncement = function (req, res) {
    AnnouncementSchema.remove({
        _id: req.params.announcementId
    },
        function (err, announcement) {
            if (err) res.send(err);
            res.json({ message: 'Announcement was succefully deleted' });
        });
};

// exports.findAnnouncements = function (req, res) {
//     return AnnouncementSchema.find({ $text: { $search: req.params.searchString} },
//         function (err, announcement) {
//         console.log(req.params.name);
//             if (err) res.send(err);
//         res.json(announcement)
//     })
// }
