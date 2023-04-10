# Smart Brain app
 
***Demo version of website:*** https://smartbrain-app-joce.onrender.com/

## Brief description
This is full stack application, builded by using technologies such as ReactJS, NodeJS, ExpressJS, PostgreSQL as well. The project consists of 3 main pages, which are SIgnIn, Registration and HomePage. First of all, you need to register on website, and after you can see the homepage, which has your entry count number and input part. The main principle of this project is recognition of faces. For this you need to paste the link of any image with the face and click detect button. The image will appear bottom and the face will be highlighted in square.

<br />
The aim of building this project is perfectioning front-end skills as well as understanding basic terms of back-end technologies.

Note!
<br /> 
The application could work a little bit slowly, so after writing your info and clicking to signin/register you need to wait for a while. 

## Technologies
* ReactJS
* CSS, Tailwind
* NodeJS 
* Express.js
* PostgreSQL


## Features 
* The application is fully responsive wrriten in Tailwind.
* Here there was used Clarifai API, which allows to fetch data and detect faces from images. 
* After registration, your account is added to data, so for further usage you need to just sign in.
* You can not use the same gmail account for several users. So you'll see some alert message and can't entry to homepage.
* When you are signing in, be sure that you wrote the exact login/password. Again, in case you wrote something incorrectly, there'll be alert message.
* You can also notice, entry count which is the number of images where you detected faces. It increases within detect trials. Moreover, even if you are signing out, entry count will be saved in database, so you will see your last entry count.
* Nonvisible features: 
  * For routing, whole code was written manually, so React Router was not used.
  * During registration process, the joined time of every user is also added to the database
  * Bcrypt library was also used for security cases, precisely for password saving. So, in database only hash text is saved without knowing the plain text. 
