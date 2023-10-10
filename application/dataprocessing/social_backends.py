from social_core.backends.oauth import BaseOAuth2

class GitHubOAuth2(BaseOAuth2):
    """GitHub OAuth authentication backend"""
    name = 'github'
    AUTHORIZATION_URL = 'https://login.itmo.ru/cas/oauth2.0/authorize?response_type=code'
    ACCESS_TOKEN_URL = 'https://login.itmo.ru/cas/oauth2.0/accessToken?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&code={authorization_code}&redirect_uri={url}'
    ACCESS_TOKEN_METHOD = 'POST'
    SCOPE_SEPARATOR = ','
    EXTRA_DATA = [
        ('id', 'id'),
        ('expires', 'expires')
    ]

    def get_user_details(self, response):
        """Return user details from GitHub account"""
        return {'username': response.get('login'),
                'email': response.get('email') or '',
                'first_name': response.get('name')}

    def user_data(self, access_token, *args, **kwargs):
        """Loads user data from service"""
        url = 'https://api.github.com/user?' + urlencode({
            'access_token': access_token
        })
        return self.get_json(url)