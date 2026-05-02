class authControllers {
  adminLogin = async(req, res) => {
    const { email, password } = req.body;
    console.log('Admin login attempt:', { email, password });
  }
}

module.exports = new authControllers();