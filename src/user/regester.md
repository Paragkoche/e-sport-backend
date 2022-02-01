# Ragester

Used to collect a user info and ragester the user

**URL** : `/Ragester`

**Mathod** : `POST`

_DATA constraints_

```json
{
  "username": "[uniqe username]",
  "name": "[user name]",
  "lastname": "[user lastname]",
  "password": "[password in plan text]"
}
```

_DATA Example_

```json
{
  "username": "Jonahship",
  "name": "Jona",
  "lastname": "Jona",
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

**Condition** : `username` is not unique

**Code** : `400 BAD REQUEST`

**Content** :
`prisma error codes`

```json
P2002
```
