## User
- id
- email
- password
- name
##  Task
- id
- title
- description
- status
- priority
- deadline
- createdBy
- isDeleted
##  TaskAssignment 
- id
- taskId
- userId
##  Comment
- id
- taskId
- userId
- content
- parentId (reply)
##  ActivityLog
- id
- taskId
- userId
- action
- oldValue
- newValue
##  Notification
- id
- userId
- type
- content
- isRead
##  File
- id
- taskId
- url
- uploadedBy

# RELATIOSHIP
- User — Task: N-N 
- Task — Comment: 1-N
- Comment — Comment: 1-N (self relation)
- Task — ActivityLog: 1-N
- User — Notification: 1-N
- Task — File:
