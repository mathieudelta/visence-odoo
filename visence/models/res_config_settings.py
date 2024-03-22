from odoo import fields, models

class ResConfigSettings(models.TransientModel):
  _inherit = 'res.config.settings'
  visence_apikey = fields.Char("Clé d'API Visence", config_parameter="visence.api_key")