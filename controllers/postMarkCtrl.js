var app = require('../index'),
    db = app.get('db'),
    postmark = require('postMark'),
    //client = new postmark.Client(process.env.POSTMARK_API_KEY),
    client = {},
    handlebars = require('handlebars'),
    fs = require('fs');

function compileTemplate(source, userInfo){
    var file = fs.readFileSync(source, 'utf8')
    var template = handlebars.compile(file)
    return template(userInfo)
}

function createRequest(userInfo, subjectLine, templatePath){
  var template = compileTemplate(templatePath, userInfo)
  var request = {
      "From": 'doNotReply@opusAssignment.com',
      "To" : userInfo.email,
      "Subject": subjectLine,
      "HTMLBody": template
  }
  return request
}

module.exports = {

  sendValidationEmail: function(userInfo){

    var request = createRequest(userInfo, 'Validation', './emailTemplates/verification.html')

    client.sendEmail(request, function (error, response) {
      if (error) console.log('Error response received: ', error)
      else return response.statusCode
    });
  },

  sendPasswordResetEmail: function(userInfo) {
    
    var request = createRequest(userInfo, 'Password Reset', './emailTemplates/passwordReset.html')

    client.sendEmail(request, function (error, response) {
      if (error) console.log('Error response received: ', error)
      else return response.statusCode
    });
  },

  sendPasswordChangedEmail: function(userInfo) {

    var request = createRequest(userInfo, 'Password Changed', './emailTemplates/passwordChanged.html')

    client.sendEmail(request, function (error, response) {
      if (error) console.log('Error response received: ', error)
      else return response.statusCode
    });
  },

  sendNewUserEmail: function(userInfo) {

    var request = createRequest(userInfo, "You've Been Added!", './emailTemplates/newUser.html')

    client.sendEmail(request, function (error, response) {
      if (error) console.log('Error response received: ', error)
      else return response.statusCode
    });
  }
}
