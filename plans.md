# Suggestions from TOP

- 1 Backend for 2 different frontends
- One front-end: for people to read and comment on your blog posts
- Other front-end: for you to write, edit and publish posts

1. Design backend models and schemas:

    1. Want to authenticate blog poster given a username and password, so set up a user model, although there will be just one user (the blogger)

    2. Blog should have posts and comments

    3. Make visitors leave email with comments

    4. Display timestamps for posts

    5. Display timestamps for comments

    6. Posts should have a title
    
    7. Comments should not have a title

    8. Give each post an "isPublished" that can be either true or false, so some posts can 
    be stored in the database without being published, and toggling of whether a post is published can be done

2. Set up express app

3. Define models in mongoose

4. Set up routes and controllers RESTfully:

    - Use Postman to make test HTTP requests

    - Helpful resources:

        1. https://www.theodinproject.com/lessons/nodejs-api-basics: has a table matching HTTP CRUD methods to paths concisely

        2. https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-name-collections-with-plural-nouns: has a list of status codes and more

        3. https://www.robinwieruch.de/node-express-server-rest-api/: Express directory structure for REST API

        4. https://www.youtube.com/watch?v=7nafaH9SddU: JWT

        5. https://dev.to/_arpy/learn-using-jwt-with-passport-authentication-22n8: using convenient Passport functions to help with JWT, if desired

5. WILL SKIP FOR NOW Build frontends:

    - https://www.theodinproject.com/lessons/javascript-working-with-apis: resource on working with fetch and APIs from frontend perspective

    1. Build frontend for people to read and comment on your posts

    2. Build frontend for you to author and edit your posts. Useful features include:

        1. List of all posts

        2. In each post, indicate whether post is published

        3. In each post, have a button to toggle whether a post is published

        4. Have a 'NEW POST' form somewhere
