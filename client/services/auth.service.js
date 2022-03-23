const AuthService = {
  async login(email, password) {
    return await fetch('http://192.168.0.198:8000/api/auth/login', {
      method: 'post',
      headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
      },
      body: JSON.stringify({
        device_name: 'Lolo phone',
        email,
        password,
      }),
    }).then(res => res.json());
  },
};

export default AuthService;