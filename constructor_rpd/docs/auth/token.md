Получение токена на авторизацию для работы с остальным API. Возвращаемое значение указывается вместо `[token_number]` в поле **Authorization**

**URL** : `auth/token/login`

**Method** : `POST`

**Auth required** : No

**Permissions required** : -



## Request format

**Content-Type** : `multipart/form-data`

###Поля form-data:<br />
**username** : `username`<br />
**password** : `password`

## Success Responses

**Code** : `200 OK`

**Content** : `{}`

```json
{
    "auth_token": "some_auth_token"
}
```