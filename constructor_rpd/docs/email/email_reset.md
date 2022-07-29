#Указание почты


**URL** : `api/email/reset`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : IsAuthenticated

## Request format
###Параметры:<br />
 **email **: ` [str] - почта, которую требуется указать и на которую прийдет ключ с подтверждением `<br />

**Data constraints** : `{}`
```json
{
   "email":"bestmailever@ucoz.ua"
}
```

## Success Responses

**Code** : `200 OK`

**Content** : `{"message": "success"}`
