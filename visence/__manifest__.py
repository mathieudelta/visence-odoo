{
    'name': "Visence",

    'summary': """
        Intégration de Visence""",

    'description': """
        Intégration de Visence
      """,
    'author': "Visence",
    'website': "https://visence.co/",
    'version': '1.0.0',
    'installable': True,
    'application': True,
    'depends': ['base', 'web'],
    "data": [
        "views/res_config_settings.xml",
        "views/assets.xml",
    ],
    "assets": {
        "web.assets_common": [
            "visence/static/src/js/init_visence.js",
        ],
    },
    'images': ['static/description/banner.png'],
    'post_load': 'request_cors_headers'
}
