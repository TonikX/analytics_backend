from django.conf import settings
from social_core.backends.oauth import BaseOAuth2

# idm configuration
FIWARE_PROVIDER_ROLE = 'ST Provider'
FIWARE_CUSTOMER_ROLE = 'ST Customer'
FIWARE_DEVELOPER_ROLE = 'ST Developer'

# FIWARE_USER_DATA_URL = urljoin(settings.FIWARE_IDM_ENDPOINT, '/user')


class FiwareAuth(BaseOAuth2):
    """FI-WARE OAuth2 mechanism"""
    name = 'itmo_soc'
    AUTHORIZATION_URL = 'https://login.itmo.ru/cas/oauth2.0/authorize'
    ACCESS_TOKEN_URL = 'https://login.itmo.ru/cas/oauth2.0/accessToken'
    #AUTH_BACKEND = FiwareBackend
    # REDIRECT_STATE = False
    # STATE_PARAMETER = False
    ACCESS_TOKEN_METHOD = 'POST'
    RESPONSE_TYPE = 'code'
    SCOPE_SEPARATOR = ','
    SETTINGS_KEY_NAME = settings.FIWARE_APP_ID
    SETTINGS_SECRET_NAME = settings.FIWARE_API_SECRET
    # SCOPE_SEPARATOR = ','
    # Look at http://developer.github.com/v3/oauth/
    SCOPE_VAR_NAME = 'FIWARE_EXTENDED_PERMISSIONS'

    FIWARE_ORGANIZATION = getattr(settings, 'FIWARE_ORGANIZATION', None)

    # @classmethod
    # def auth_headers(cls):
    #     return {
    #         'Authorization': 'Basic %s' % base64.urlsafe_b64encode(
    #             '%s:%s' % cls.get_key_and_secret()
    #         )
    #     }
    #
    # def user_data(self, access_token, *args, **kwargs):
    #     """Loads user data from service"""
    #     url = FIWARE_USER_DATA_URL + '?' + urlencode({
    #         'access_token': access_token
    #     })
    #
    #     try:
    #         data = simplejson.load(dsa_urlopen(url))
    #     except ValueError:
    #         data = None
    #
    #     return data


def _fill_user_info(response, user, id_):
    user.userprofile.actor_id = id_
    # Save the current access token for future calls
    user.userprofile.access_token = response['access_token']

    if 'refresh_token' in response:
        user.userprofile.refresh_token = response['refresh_token']

        social = user.social_auth.filter(provider='fiware')[0]
        social.extra_data['refresh_token'] = response['refresh_token']
        social.save()

    user.userprofile.complete_name = response['displayName']
    user.userprofile.save()


def _create_private_org(user, roles):
    # Get user private organization
    user_org = Organization.objects.filter(actor_id=user.userprofile.actor_id)
    if len(user_org) == 0:
        user_org = Organization.objects.get(name=user.username)
        user_org.actor_id = user.userprofile.actor_id
        user_org.save()
    else:
        user_org = user_org[0]

    user.userprofile.current_organization = user_org
    user.userprofile.save()

    wstore_roles = []
    # Include new roles in the private organization
    for role in roles:
        wstore_roles.append(role['name'].lower())

    # Check if the user is an admin
    if 'provider' in wstore_roles and not user.is_staff:
        user.is_staff = True
        user.save()

    elif 'provider' not in wstore_roles and user.is_staff:
        user.is_staff = False
        user.save()

    return user_org


def _create_organizations(user, user_org, idm_organizations, id_field, name_field):
    organizations = []
    user_roles = ['customer', 'provider']

    organizations.append({
        'organization': user_org.pk,
        'roles': user_roles
    })

    # Check organizations info
    for org in idm_organizations:

        # Check if the organization exist
        org_model = Organization.objects.filter(actor_id=org[id_field])

        if len(org_model) == 0:
            # Create the organization
            org_model = Organization.objects.create(
                name=org[name_field],
                private=False,
                actor_id=org[id_field]
            )
        else:
            org_model = org_model[0]

        # Check organization roles
        idm_org_roles = org['roles']
        org_roles = []

        for role in idm_org_roles:
            if role['name'].lower() == 'Owner':
                if user.pk not in org_model.managers:
                    org_model.managers.append(user.pk)
                    org_model.save()
            elif role['name'].lower() == FIWARE_PROVIDER_ROLE.lower():
                org_roles.append('provider')
            elif role['name'].lower() == FIWARE_CUSTOMER_ROLE.lower():
                org_roles.append('customer')
            elif role['name'].lower() == FIWARE_DEVELOPER_ROLE.lower():
                org_roles.append('developer')

        organizations.append({
            'organization': org_model.pk,
            'roles': org_roles
        })

    user.userprofile.organizations = organizations
    user.userprofile.save()


# Backend definition
BACKENDS = {
    'fiware': FiwareAuth,
}
