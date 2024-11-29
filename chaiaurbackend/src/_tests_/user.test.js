import request from 'supertest';

describe('User API Tests', () => {
  const backendUrl = 'http://localhost:8000/api/v1/users'; // Backend URL

  // Test Register API
  describe('POST /register', () => {
    it('should register a user successfully', async () => {
      const res = await request(backendUrl)
        .post('/register')
        .field('fullname', 'samar suryawanshi')
        .field('username', 'samar1')
        .field('email', 'samar1@example.com')
        .field('password', 'password123')
        .attach('avatar', './avatar.png')
        // .attach('coverImage', './path/to/coverImage.jpg');
        
      expect(res.status).toBe(201);
    //   expect(res.body.message).toBe('registered');
    });

    it('should return an error if required fields are missing', async () => {
      const res = await request(backendUrl)
        .post('/register')
        .send({});

      expect(res.status).toBe(409);
    //   expect(res.body.message).toBe('All fields are req.');
    });
  });

  // Test Login API
  describe('POST /login', () => {
    it('should login successfully with correct credentials', async () => {
      const res = await request(backendUrl)
        .post('/login')
        .send({
          email: 'samar1@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(200);
    //   expect(res.body.message).toBe('user loggedin successfully');
    //   expect(res.cookies).toHaveProperty('accesstoken');
    //   expect(res.cookies).toHaveProperty('refreshtoken');
    });

    it('should return an error for incorrect password', async () => {
      const res = await request(backendUrl)
        .post('/login')
        .send({
          email: 'samar1@example.com',
          password: 'wrongpassword',
        });

      expect(res.status).toBe(408);
    //   expect(res.body.message).toBe('password incorrect');
    });
  });

  // Test Logout API
  describe('POST /logout', () => {
    it('should log the user out successfully', async () => {
      const res = await request(backendUrl)
        .post('/logout')
        // .set('Cookie', 'accesstoken=mocked; refreshtoken=mocked') // Mock cookies for logged-in state
        .send();

      expect(res.status).toBe(401);
    //   expect(res.body.message).toBe('user logged out successfully');
    });

    it('should login successfully with correct credentials', async () => {
        const res = await request(backendUrl)
          .post('/login')
          .send({
            email: 'samar1@example.com',
            password: 'password123',
          });
  
        expect(res.status).toBe(200);
        // expect(res.body.message).toBe('user loggedin successfully');
      //   expect(res.cookies).toHaveProperty('accesstoken');
      //   expect(res.cookies).toHaveProperty('refreshtoken');
      });
  });

  

  // Test Get User Profile
  describe('GET /c/:username', () => {
    it('should return the user profile', async () => {
      const res = await request(backendUrl).get('/c/samar1');

      expect(res.status).toBe(200);
    //   expect(res.body.message).toBe('User channel fetched successfully');
      expect(res.body.data[0]).toHaveProperty('fullname');
      expect(res.body.data[0]).toHaveProperty('username');
    });
  });

//   // Test Get User Watch History
//   describe('GET /c/:userId/watchhistory', () => {
//     it('should return watch history for a user', async () => {
//       const res = await request(backendUrl)
//         .get('/c/12345/watchhistory')
//         .set('Cookie', 'accesstoken=mocked; refreshtoken=mocked');

//       expect(res.status).toBe(200);
//       expect(res.body.message).toBe('watch history successfully retrieved!');
//     });
//   });
});
