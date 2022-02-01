# User By ID

Get the details of the currently Authenticated User along with basic subscription information.

_id must be uuid and valid_

**URL** : `/:id`

**Mathod** : `GET`

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

**Condition** : `id` is not found

**Code** : `400 BAD REQUEST`

**Content** :

```json

```
