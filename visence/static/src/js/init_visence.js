odoo.define('visence', ['web.session', 'web.rpc'], function (require) {
  "use strict";
  var session = require('web.session');
  var rpc = require('web.rpc');
  function getNames(name) {
    var names = name.split(' ');
    if (names.length < 2) {
      return { firstName: ' ', lastName: name };
    } else if (names.length === 2) {
      return { firstName: names[0], lastName: names[1] };
    } else {
      return { firstName: names[0], lastName: names.slice(1).join(' ') };
    }
  }
  var user = session.user_id;
  if (user.length > 0 && user[0]) {
    rpc.query({
      model: 'res.users',
      method: 'read',
      args: [[user[0]], ['name', 'email', 'company_id', 'phone', 'create_date']],
    }).then(function (result) {
      if (result.length === 1) {
        var { id: idExt, name, email, company_id: company, phone, create_date } = result[0];
        var [ company_id, company_name ] = company;
        var { firstName, lastName } = getNames(name);

        rpc.query({
          model: 'ir.config_parameter',
          method: 'get_param',
          args: ['visence.api_key'],
        }).then(function (api_key) {
          if (api_key && window.Visence) {
            window.Visence.init({
              apiKey: api_key,
              endUser: {
                idExt: idExt.toString(),
                firstName,
                lastName,
                email,
                phone: phone || '',
                registerDate: new Date(create_date),
                custom: {
                  environment: window.location.origin, 
                }
              },
              client: {
                idExt: company_id.toString(),
                name: company_name,
              },
            });
          }
        }).catch(function (error) {
          console.error({ error });
        });
      }
    }).catch(function (error) {
      console.error({ error }); 
    });
  }
});