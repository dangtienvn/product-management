# AUTH
## Login
[User click Login]
      ↓
[Input email + password]
      ↓
[Frontend validate]
      ↓
↓ Invalid             ↓ Valid
[Show error]          ↓
                      ↓
                [Loading...]
                      ↓
                [POST /auth/login]
                      ↓
                [Backend validate input]
                      ↓
              ↓ Invalid format
              [400 Bad Request]

                      ↓
                [Find user by email]
                      ↓
              ↓ Not found / wrong password
              [401 Unauthorized]

                      ↓
                [Check user status]
                      ↓
              ↓ Inactive / banned
              [403 Forbidden]

                      ↓
                [Generate accessToken (+ refreshToken)]
                      ↓
                [Return token]
                      ↓
        [Frontend lưu token (cookie/localStorage)]
                      ↓
                [Redirect Dashboard]
## Logout
[User click Logout]
      ↓
[Confirm]
      ↓ Yes
      ↓
[Frontend call /auth/logout]
      ↓
[Backend revoke refreshToken (nếu có)]
      ↓
[Frontend clear token]
      ↓
[Redirect Login]

## Register

