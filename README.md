
# Welcome to Blandbook! 

## A lightweight social media platform using React and Ruby on Rails

**Authors**:

- Huanyu Daniel Li (github link)
- Lei Huawen (github link)
- Brendan Tuckerman (github link)

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




# Read Me

- 18/Sep/2022

<img src="https://res.cloudinary.com/huanyuli/image/upload/v1663511861/blandBook/Screen_Shot_2022-09-18_at_11.55.11_pm_n5p7md.png">


I rewrite the structure, now using `./components/Homepage.jsx` as the home page, but still keep the originial `App.js` code.

The `Homepage.jsx` will use `state` to store `current user`, `search results`, `chat room` etc. information to easily shared with other components.

 - `current user` infomation gets from the component `./components/CurrentUserInfo.jsx`
 - `search results` infomation gets from the component `./components/SearchForm.jsx`   
    *(Just search template at this stage, need to discuss what we need to do here)*
- `chat room` infomation gets from the component `./components/ChatRoom.jsx`   
    *(need to discuss how to use `ChatroomShow` component)*

