const authControllers = require('../controllers/authControllers');

router.post('/admin-login', authControllers.adminLogin);

module.exports = router;
