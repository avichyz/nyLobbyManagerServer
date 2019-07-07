
let mongoose = require('mongoose');
let AnnouncementSchema = mongoose.model('Announcement');

exports.getAllAnnouncements = function (req, res) {
    AnnouncementSchema.find({ isDeleted: false }, function (err, announcement) {
        if (err) {
            res.send(err);
        }
        res.json(announcement);
    });
};

exports.saveAnnouncement = function (req, res) {
    let newAnnouncement = new AnnouncementSchema(req.body);
    newAnnouncement.save(
        function (err, announcement) {
            if (err) {
                res.send(err);
            }
            res.json(announcement);
        });
}


exports.saveAndUpdateAnnouncementPost = function (req, res) {
    AnnouncementSchema.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true },
        function (err, announcement) {
            // if the function found no Announcement, create one
            if (!announcement) {
                let newAnnouncement = new AnnouncementSchema(req.body);
                newAnnouncement.save(
                    function (err, Announcement) {
                        if (err) {
                            res.send(err);
                        }
                    });
            }
            else { 
                console.log(announcement);
            }
            res.json(announcement);
        });
    ;
}


exports.getAnnouncement = function (req, res) {
    AnnouncementSchema.findById(req.params.id,
        function (err, announcement) {
            if (err) res.send(err);
            res.json(announcement);
        });
};

exports.updateAnnouncementPost = function (req, res) {
    AnnouncementSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true },
        function (err, announcement) {
            console.log(announcement)
            if (err) res.send(err);
            res.json(announcement);
        });
    ;
}

exports.updateAnnouncement = function (req, res) {
    AnnouncementSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true },
        function (err, announcement) {
            console.log(announcement)
            if (err) res.send(err);
            res.json(announcement);
        });
    ;
}
exports.deleteAnnouncement = function (req, res) {
    AnnouncementSchema.findOneAndUpdate({ _id: req.params.id }, 
        { isDeleted: true, deletionDate: new Date() }, 
        { new: false },
        function (err, announcement) {
            console.log(announcement)
            if (err) res.send(err);
            res.json(announcement);
        });
};

// AnnouncementSchema.remove({
    //     _id: req.params.id
    // },
    //     function (err, announcement) {
    //         if (err) res.send(err);
    //         res.json({ message: 'Announcement was succefully deleted' });
    //     });
// exports.findAnnouncements = function (req, res) {
//     return AnnouncementSchema.find({ $text: { $search: req.params.searchString} },
//         function (err, announcement) {
//         console.log(req.params.name);
//             if (err) res.send(err);
//         res.json(announcement)
//     })
// }
