const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/FileUpload')

const MemberController = require('../../controllers/members');

router.get("/", MemberController.getMembers);

router.post("/", upload.single('memberImage'), MemberController.postMember);

router.delete("/:memberId", MemberController.deleteMember);

router.patch("/:memberId", MemberController.updateMember);

module.exports = router;