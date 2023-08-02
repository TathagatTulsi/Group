const { add, get, search, searchcategory, deleted, edit} = require('../controllers/ControllerProduct');
const router = require('express').Router();

router.post('/add', add);
// router.patch('/add', edit)
router.get('/get', get);
router.get('/search',  search)
router.get('/searchcategory', searchcategory)
router.delete('/deleted', deleted)

module.exports = router
