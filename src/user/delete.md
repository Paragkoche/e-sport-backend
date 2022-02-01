# DELETE

Get the details of the currently Authenticated User along with basic subscription information.

**URL** : `/delete`

**Mathod** : `DELETE`

## Success Response

**Code** : `200 ok`

**Content example**

```json
{
  "id": "112bcf78-79db-4261-824f-d0c0dd073c1b",
  "username": "Jonahship",
  "name": "Jona",
  "lastname": "Jona",
  "totalIncom": "0",
  "isGammer": true,
  "followerID": null,
  "gameId": null,
  "vidosID": null
}
```

## Error Response

**Condition** : `user` is not exist

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "code": "P2025",
  "clientVersion": "3.8.1",
  "meta": {
    "cause": "Record to delete does not exist."
  }
}
```
