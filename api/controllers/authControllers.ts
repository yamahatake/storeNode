class AuthControllers {
  adminLogin = async (req: any, res: any) => {
    const { email, password } = req.body;
    console.log('Admin login attempt:', { email, password });
  };
}

export default new AuthControllers();
