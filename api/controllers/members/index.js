const mongoose = require('mongoose');

const Members = require('../../models/members');
const CustomResponse = require('../../middlewares/CustomeResponse')

exports.getMembers = (req, res, next) => {
    Members.find()
    .select('name memberImage')
    .exec()
    .then( members => {
      res.send(CustomResponse('Get Members', true, members));
    })
    .catch( err => {
      res.send(CustomResponse('Get Members Failed', false, err));
    });
  };

  exports.postMember = (req, res, next) => {
    const member = new Members({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      memberImage: req.file.path
    });
    member
      .save()
      .then(result => {
        res.send(CustomResponse('Post Members', true, result));
      })
      .catch(err => {
        res.send(CustomResponse('Post Members Failed', false, err));
      });
  };

  exports.deleteMember = (req, res, next) => {
    const id = req.params.memberId;
    Members.deleteOne({ _id: id })
      .exec()
      .then(result => {
        res.send(CustomResponse('Post Member Success', true, result));
      })
      .catch(err => {
        res.send(CustomResponse('Post Member Failed', false, err));
      });
  };

  exports.updateMember = (req, res, next) => {
    const id = req.params.memberId;
    Members.findByIdAndUpdate({ _id: id }, req.body)
      .exec()
      .then(
      Members.findOne({ _id: id })
      .exec()
      .then( result => {
        res.send(CustomResponse('Update Members Success', true, result));
      }))
      .catch(err => {
        res.send(CustomResponse('Update Members Failed', false, err));
      });
  };