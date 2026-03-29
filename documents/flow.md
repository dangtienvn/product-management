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

# TASK
## Create Task
[User click "Create Task"]
        ↓
[Input: title, description, deadline, priority]
        ↓
[Frontend validate]
        ↓
↓ Invalid                ↓ Valid
[Show error]             ↓
                         ↓
                [POST /tasks]
                         ↓
                [Backend validate]
                         ↓
              ↓ Invalid data
              [400 Bad Request]

                         ↓
                [Create task]
                         ↓
                [Set createdBy]
                         ↓
                [Save DB]
                         ↓
                [Log activity: CREATE_TASK]
                         ↓
                [Return task]
                         ↓
                [Show success UI]
## View Task
[User open Task List]
        ↓
[Send query: page, limit, status, priority, search]
        ↓
[GET /tasks]
        ↓
[Backend parse query]
        ↓
[Build query filter]
        ↓
[Query DB + pagination]
        ↓
[Return list + meta (total, page)]
        ↓
[Render UI]
## Update Task
[User edit task]
        ↓
[PUT /tasks/:id]
        ↓
[Backend validate input]
        ↓
↓ Invalid                ↓ Valid
[400]                    ↓
                         ↓
                [Find task]
                         ↓
              ↓ Not found
              [404]

                         ↓
                [Update fields]
                         ↓
                [Save DB]
                         ↓
                [Log activity: UPDATE_TASK]
                         ↓
                [Return updated task]
## Delete Task
[User click delete]
        ↓
[Confirm]
        ↓
[DELETE /tasks/:id]
        ↓
[Backend find task]
        ↓
↓ Not found         ↓ Found
[404]               ↓
                    ↓
        [Set isDeleted = true]
                    ↓
        [Save DB]
                    ↓
        [Log activity: DELETE_TASK]
                    ↓
        [Return success]
## Change Status
[User change status]
        ↓
[PATCH /tasks/:id/status]
        ↓
[Validate status]
        ↓
↓ Invalid                ↓ Valid
[400]                    ↓
                         ↓
                [Find task]
                         ↓
              ↓ Not found
              [404]

                         ↓
                [Update status]
                         ↓
                [Save DB]
                         ↓
        [Log: TODO → IN_PROGRESS]
                         ↓
                [Return updated task]

# ASSIGNMENT
## Assign user vào task
[User chọn assignee]
        ↓
[POST /tasks/:id/assign]
        ↓
[Backend validate userId]
        ↓
[Find task + user]
        ↓
↓ Not found
[404]

        ↓
[Check already assigned?]
        ↓
↓ Yes             ↓ No
[Skip]            ↓
                  ↓
        [Insert TaskAssignment]
                  ↓
        [Log activity: ASSIGN_USER]
                  ↓
        [Create notification]
                  ↓
        [Return success]
## Remove user khỏi task
[User remove assignee]
        ↓
[DELETE /tasks/:id/assign/:userId]
        ↓
[Find assignment]
        ↓
↓ Not found         ↓ Found
[404]               ↓
                    ↓
        [Delete assignment]
                    ↓
        [Log activity: REMOVE_USER]
                    ↓
        [Return success]

# COMMENT
## Add comment
[User nhập comment]
        ↓
[POST /tasks/:id/comments]
        ↓
[Backend validate content]
        ↓
↓ Invalid                ↓ Valid
[400]                    ↓
                         ↓
                [Find task]
                         ↓
              ↓ Not found
              [404]

                         ↓
                [Create comment]
                         ↓
        [Set userId, taskId]
                         ↓
                [Save DB]
                         ↓
        [Log activity: ADD_COMMENT]
                         ↓
        [Trigger notification]
                         ↓
                [Return comment]
## Edit comment
[User edit comment]
        ↓
[PUT /comments/:id]
        ↓
[Validate content]
        ↓
↓ Invalid                ↓ Valid
[400]                    ↓
                         ↓
                [Find comment]
                         ↓
↓ Not found        ↓ Found but not owner
[404]              [403 Forbidden]

                         ↓
                [Update content]
                         ↓
                [Save DB]
                         ↓
        [Log: EDIT_COMMENT]
                         ↓
                [Return updated]
## Delete comment
[User delete comment]
        ↓
[DELETE /comments/:id]
        ↓
[Find comment]
        ↓
↓ Not found        ↓ Not owner
[404]              [403]

        ↓ Found
        ↓
[Soft delete comment]
        ↓
[Save DB]
        ↓
[Log: DELETE_COMMENT]
        ↓
[Return success]
## Reply comment 
[User reply comment]
        ↓
[POST /comments/:parentId/replies]
        ↓
[Validate content]
        ↓
[Find parent comment]
        ↓
↓ Not found
[404]

        ↓
[Create comment với parentId]
        ↓
[Save DB]
        ↓
[Log: REPLY_COMMENT]
        ↓
[Notify người bị reply]
        ↓
[Return reply]

# ACTIVITY LOG 
## Auto log (system generate, not user trigger directly)
[Event xảy ra]
 (create task / update / comment / assign)
        ↓
[Backend trigger log service]
        ↓
[Generate message]
  VD: "Tiến changed status TODO → DONE"
        ↓
[Save ActivityLog]
        ↓
[Done]

# NOTIFICATION
## Notify when assign
[User A assign User B]
        ↓
[Create TaskAssignment]
        ↓
[Trigger notification]
        ↓
[Create notification:
 "You were assigned to task X"]
        ↓
[Save DB]
## Notify when comment
[User comment vào task]
        ↓
[Find assignees / owner]
        ↓
[Exclude người comment]
        ↓
[Create notifications]
        ↓
[Save DB]
## Notify when update task
[Task được update]
        ↓
[Check field thay đổi]
        ↓
[Find related users]
        ↓
[Create notification:
 "Task updated"]
        ↓
[Save DB]

# FILE
## Upload file
[User chọn file]
        ↓
[POST /tasks/:id/files]
        ↓
[Backend validate file]
        ↓
↓ Invalid                ↓ Valid
[400]                    ↓
                         ↓
                [Upload storage]
         (local / cloud như S3)
                         ↓
                [Save file info DB]
                         ↓
        [Log: UPLOAD_FILE]
                         ↓
                [Return file URL]
## Download file
[User click download]
        ↓
[GET /files/:id]
        ↓
[Find file]
        ↓
↓ Not found         ↓ Found
[404]               ↓
                    ↓
        [Return file URL / stream]
                    ↓
        [Download file]