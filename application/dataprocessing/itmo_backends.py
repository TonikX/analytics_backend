from social_core.backends.oauth import BaseOAuth2

class ItmoOAuth2(BaseOAuth2):
    """Itmo OAuth authentication backend"""
    name = 'itmo_o'
    AUTHORIZATION_URL = 'https://login.itmo.ru/cas/oauth2.0/authorize'
    ACCESS_TOKEN_URL = 'https://login.itmo.ru/cas/oauth2.0/accessToken'
    ACCESS_TOKEN_METHOD = 'POST'
    RESPONSE_TYPE = 'code'
    SCOPE_SEPARATOR = ','
    EXTRA_DATA = [
        ('id', 'user_id'),
        ('expires', 'expires')
    ]

    #
    # def get_user_details(self, response):
    #     """Return user details from GitHub account"""
    #     return {'username': response.get('login'),
    #             'email': response.get('email') or '',
    #             'first_name': response.get('name')}
    #
    # def user_data(self, access_token, *args, **kwargs):
    #     """Loads user data from service"""
    #     url = 'https://api.github.com/user?' + urlencode({
    #         'access_token': access_token
    #     })
    #     return self.get_json(url)