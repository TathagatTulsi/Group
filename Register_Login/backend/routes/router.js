const { add, get, search, searchcategory, deleted} = require('../controllers/ControllerProduct');
 
const router = express.Router();

router.post('/add', add);
router.get('/get', get);
router.get('/search', search)
router.get('/searchcategory', searchcategory)
router.delete('/deleted', deleted)

module.exports = router