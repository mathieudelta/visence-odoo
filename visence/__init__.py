from . import models
from odoo.http import Response, request

def request_cors_headers():
    old_set_default = Response.set_default
    def set_default(self, template=None, qcontext=None, uid=None):
        old_set_default(self, template, qcontext, uid)
        if request.httprequest.headers.get('ORIGIN', False) == 'https://app.visence.co':
          self.headers.set('Access-Control-Allow-Origin', 'https://app.visence.co')
          self.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    Response.set_default = set_default