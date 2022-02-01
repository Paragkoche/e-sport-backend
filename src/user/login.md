# Login

**URL** : `/login`

**Mathod** : `POST`

_DATA constraints_

```json
{
  "username": "[uniqe username]",
  "password": "[password in plan text]"
}
```

_DATA Example_

```json
{
  "username": "Jonahship",
  "password": "password $500"
}
```

## Success Response

**Code** : `200 ok`

**Content example**

```json
{
  "data": {
    "id": "112bcf78-79db-4261-824f-d0c0dd073c1b",
    "username": "Jonahship",
    "name": "Jona",
    "lastname": "Jona",
    "totalIncom": "0",
    "isGammer": true,
    "followerID": null,
    "gameId": null,
    "vidosID": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMmJjZjc4LTc5ZGItNDI2MS04MjRmLWQwYzBkZDA3M2MxYiIsImlzR2FtbWVyIjp0cnVlLCJpYXQiOjE2NDM3MDczODcsImV4cCI6MTY0NjI5OTM4N30.B5opQj8Y988TAWmnJeh0tnwZQw4I76NfDWbNpm9aSBU"
}
```

## Error Response

**Condition** : `password` is not valid

**Code** : `202 Accepted`

**Content** :

```json
{
  "error": "password is encorret"
}
```

**Condition** : `username` is not valid

**Code** : `404 NOT FOUND`

**Content** :

```json
{
  "error": "user not found 404"
}
```
