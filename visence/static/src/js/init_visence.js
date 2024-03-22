odoo.define('visence', ['web.session', 'web.rpc'], function (require) {
  "use strict";
  var session = require('web.session');
  var rpc = require('web.rpc');
  function getNames(name) {
    var names = name.split(' ');
    if (names.length < 2) return { firstName: ' ', lastName: name };
    else if (names.length === 2) return  { firstName: names[0], lastName: names[1] };
    else return { firstName: names[0], lastName: names.slice(1).join(' ') };
  }
  if (session.user_id.length > 0 && session.user_id[0]) {
    rpc.query({
      model: 'res.users',
      method: 'read',
      args: [[session.user_id[0]], ['name', 'email', 'company_id', 'phone', 'create_date', 'visence_apikey']],
    }).then(function (result) {
      if (result.length === 1) {
        var { id: idExt, name, email, company_id: company, phone, create_date, visence_apikey } = result[0];
        var [ company_id, company_name ] = company;
        var { firstName, lastName } = getNames(name);

        if (visence_apikey && window.Visence) {
          window.Visence.init({
            apiKey: visence_apikey,
            endUser: {
              idExt: idExt.toString() + '-' + window.location.origin,
              firstName,
              lastName,
              email,
              phone: phone || '',
              registerDate: new Date(create_date),
              custom: { environment: window.location.origin },
            },
            client: {
              idExt: company_id.toString() + '-' + window.location.origin,
              name: company_name,
            },
          });
        }
      }
    }).catch(function (error) {
      console.error({ error }); 
    });
  }
});