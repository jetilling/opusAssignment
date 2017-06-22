# opusAssignment

User Administration application using Angular 2, NodeJs, Express, and ElephantSQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

What things you need to install the software and how to install them

```
NodeJs
.env file that was sent in the email with the link to this repository
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Clone the repository to your local machine and copy .env file to root directory (next to the index.js file)
```

Install Packages

```
npm install
```

Start server

```
npm start 

Wait until you see "Listening on port 6060"
```

Open it in chrome (or your browser in choice - I used chrome)

```
http://localhost:6060/#/
```

## A Couple Things to Note:

* Why I Used SendGrid - I tried to set up an account with PostMark, but they required a private email address. I only have public gmail and hotmail ones. So I contacted Liisa and she recommended I choose another email service. I chose sendGrid because it seemed similar (I also had never used it before). I still created a PostMark controller that could be used if there was an api key connected to it.

* Sending Emails - I tested the email service with my gmail and hotmail accounts. It works with both, but I didn't notice that the emails are recieved much faster with gmail. My hotmail account will recieve the emails, but it tends to be a couple minutes after they are sent and they end up in the spam folder. 

* Database - I thought the best way to demonstrate my understanding of building full stack application would be to do just that: build a full stack application. So, I decided to host my database rather than just use a JSON file (also, it was free). I populated the database with a lot of dummy data (for example: a@a.com, j@j.com, etc). The database has 8 columns: id (primary key), email, password (hashed and salted using bcrypt), first_name, last_name, validated (true/false), validation_token, and login_dates (array of timestamps). 

![database image]('./src/images/db.png')

## Built With

* [Angular.io](https://angular.io/) - Front-End Framework
* [ExpressJS](https://expressjs.com/) - Back-End Node Framework
* [HandleBars](https://www.npmjs.com/package/handlebars) - HandlesbarsJS npm Package
* [ElephantSQL](https://www.elephantsql.com/) - Hosted Database
* [SendGrid](https://sendgrid.com) - Email Transport System
* [PostMark](https://postmarkapp.com/) - Email Transport System
