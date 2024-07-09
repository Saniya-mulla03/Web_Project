const express = require("express");
const {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById, deleteCampusInfoById} = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers);
router.route('/users/:id').get(authMiddleware, adminMiddleware, getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, updateUserById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, deleteUserById);
router.route('/contacts').get(authMiddleware, adminMiddleware, getAllContacts);
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware,deleteContactById);
router.route('/campusInfo/delete/:id').delete(authMiddleware, adminMiddleware, deleteCampusInfoById);
router.route('/campusInfo/:id').get(authMiddleware, adminMiddleware, getCampusInfoById);
router.route('/campusInfo/:id/edit').patch(authMiddleware, adminMiddleware, updateCampusInfoById);

module.exports = router;
