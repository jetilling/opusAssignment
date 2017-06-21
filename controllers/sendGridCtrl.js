var app = require('../index'),
    db = app.get('db'),
    sg = require('sendgrid')(process.env.SENDGRID_API_KEY),
    handlebars = require('handlebars'),
    fs = require('fs');


function compileTemplate(source, userInfo){
    var file = fs.readFileSync(source, 'utf8')
    var template = handlebars.compile(file)
    return template(userInfo)
}

function createRequest(userInfo, subjectLine, templatePath){
  var template = compileTemplate(templatePath, userInfo)
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: userInfo.email
            }
          ],
          subject: subjectLine
        }
      ],
      from: {
        email: 'doNotReply@opusAssignment.com'
      },
      content: [
        {
          type: 'text/html',
          value: template
        }
      ]
    }
  });
  return request
}

module.exports = {

  sendValidationEmail: function(userInfo){

    var request = createRequest(userInfo, 'Validation', './emailTemplates/verification.html')

    sg.API(request, function (error, response) {
      if (error) console.log('Error response received: ', error)
      else return response.statusCode
    });
  },

  sendPasswordResetEmail: function(userInfo) {
    
    var request = createRequest(userInfo, 'Password Reset', './emailTemplates/passwordReset.html')

    sg.API(request, function (error, response) {
      if (error) console.log('Error response received: ', error)
      else return response.statusCode
    });
  },

  sendPasswordChangedEmail: function(userInfo) {

    var request = createRequest(userInfo, 'Password Changed', './emailTemplates/passwordChanged.html')

    sg.API(request, function (error, response) {
      if (error) console.log('Error response received: ', error)
      else return response.statusCode
    });
  }
}