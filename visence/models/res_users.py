from odoo import fields, models

class ResUsers(models.Model):
  _inherit = 'res.users'
  visence_apikey = fields.Char("Clé d'API Visence", compute='_compute_visence_apikey')

  def _compute_visence_apikey(self):
    for user in self:
      user.visence_apikey = self.env['ir.config_parameter'].sudo().get_param('visence.api_key')