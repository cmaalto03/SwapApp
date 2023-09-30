# SwapApp

Geared towards college students, this marketplace on mobile applications aims to facilitate trade for the college community. It supports traditional buying and selling, as well as a barter system. This version is still very early in the development stages and has not reached a MVP yet, but the demo showcases some of its working features.

*This version only has the photos of each post in the cloud (s3 bucket). I have lambda functions, as well as an RDS MySQL, database set up, but they are not currently active because the app is still in early dev stages. For this version, the APIs and MySQL database are all hosted locally on my machine, and I'm using Expo Go for the client. Contact me if you want to set up the testing environment*

9/26/23 Demo 

https://github.com/cmaalto03/SwapApp/assets/79030806/32a67e96-d890-4b0b-895d-c3923b24b4d0

# Working features

As of now, the app supports messaging between users, posting an item to their specific college campus community, filtering and selecting categories, a working authentication system with tokens, as well as seamless login with local storage credentials.

# Some of the features/potential features in progress (Ranked 1-5 in importance, 1 being most important)

- (1) A great deal more of styling (Have focused mainly on creating features thus far, not styling them in depth)
    - Animations
    - Update color scheme
    - Fix issue in some text inputs where keyboard covers elements
    - Style login and registration screens
- (1) Fix issue where chats only work for certain users together
- (1) Fix security vulnerabilities in login system, as well as when connecting to AWS
- (1) Hook up barter system to SchoolItem screen
- (2) Add notifications for messages
- (2) Add option to upload multiple photos of an item
- (3) Add notifications for personalized events
- (3) Allow users to upload a custom profile picture
- (4) Allow users to save posts
- (4) Ability to change name and school
- (5) Allow for multiple users to chat in groups together
- (5) Add stylistic elements that cater towards a user's specific school

# Tech currently used

React Native, Expo, React Query, AWS (Lambda, RDS MySQL, S3), MySQL, SQL, MySQL workbench, Node.js, Express, RESTful APIs, WebSockets (Socket.io), JWTs
