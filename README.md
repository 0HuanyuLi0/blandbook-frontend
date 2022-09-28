
# Welcome to Blandbook! 

## A lightweight social media platform using React and Ruby on Rails

**App Links:**
- [Backend Heroku](https://blandbook-server.herokuapp.com)
- [Frontend GitHub Pages](https://0huanyuli0.github.io/blandbook-frontend)

**Authors**:

- Huanyu Daniel Li [github link](https://github.com/0HuanyuLi0)
- Lei Huawen [github link](https://github.com/hwlei888)
- Brendan Tuckerman [github link](https://github.com/MrMaverick79)

A project as part of the General Assembly Software Intensive

**Overview**:

Blandbook is a social media platofrm that pulls together many of the features of sites like Facebook, Instagram, and Reddit. It allows users to set up an account, log in and see posts made by themsleves and other members of the platform. 


**Features**:




**Tech Stack**:

Front-end: React, CSS

Back-End: Ruby on Rails, PostgreSQL, ActiveRecord



## Chat function 



Thanks to Jennifer Ingram for [this](https://javascript.plainenglish.io/integrating-actioncable-with-react-9f946b61556e)  tutorial which was a huge help.

This part of the README aims to explain the chat function, which uses Rails' [ActionCable](https://guides.rubyonrails.org/action_cable_overview.html) --which replaces HTTP requests with WebSocket intergration

Gems: 
 - 'rack-cors' (to avoid CORS errors )
 
NPM Packages:
 - 'axios' (needed elsewhere, but also used for HTTP requests)
 - 'actioncable' (to form the connection with ActionCable in the back end)

# Backend

We added the following route in our Rails routes file, which created a URL which we could use to form the connection between front and back-end:

![Mount example](../planning/mount.png)


Because we are not using HTTP requests, we instead need to create a channenl (app-->channels-->chatroom_channel). This channel allows the front-end (known as a consumer) to subscribe to channels in the back end. This allows us to transmit the infomration in as many of our chatrooms as needed. In the example below, we see that the channel controller uses `stream_for` and `broadcast_to` within the ActionCable class.

![chatroom_channel](../planning/chatroom_channel.png)




# Frontend

NPM Packages:

- React-bootstrap
- Action-cable-react
- Axios
- React-draft-wysiwyg
- Draft-js
- Draftjs-to-html
- React-router-dom
- Google-map-react
- Gh-pages


## Authorization

User can login with their exsiting account or sign up a new account with their email.
It uses React-bootstrap `Button` to style.
User can change to sign in form and back to log in form, after signing up user will automatically log in and ebter into their account.

## Google Map React

On the DashBorad page, user can see all users location in the Google map section.



## Search Function

It searches the name of users and the content of posts in one place.
It uses React-bootstrap `Modal` and `ListGroup` to style.
The search results are clickable and can jump to specific routes or `follow | unfollow` other users.

`follow` and `unfollow` functions will 'phone' `FriendsList` component to update list by 'Homepage' component

## Text Editor
React-draft-wysiwyg, Draft-js, Draftjs-to-html are used in this website as the text editor. The editor can change the text formatting, add emoji, and upload Image(url). Draftjs-to-html is used to convert raw draftjs data to html data. Then use `dangerouslySetInnerHTML={{__html: HTML_CONTENT}}` attribute to show the correct formatting.

