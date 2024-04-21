#Подтверждение почты


**URL** : `api/email/confirm`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : IsAuthenticated

## Request format
###Параметры:<br />
 **key **: ` [str] - ключ, пришедший на почту `<br />

**Data constraints** : `{}`
```json
{
   "key":"verylongkey"

}
```

## Success Responses

**Code** : `200 OK`

**Content** : `{"message": email updated successfully."}`
