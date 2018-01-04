# Web Anime Updater 2

## Reference Backend

### Endpoints

This is the minimum required set of endpoints a WAU2 server should expose.
The service should be exposed via `application/json` style endpoints and use [`JWT`](https://jwt.io) as the method of authentication.

#### POST /register

PUBLIC endpoint to allow an user to register himself to the platform.

Must accept a JSON with the following structure

```json
{
  "username": "my_user_name",
  "password": "my_user_password"
}
```

Must not return any data except for one of the status codes:

* `201 Created`, in case the user has been registered
* `422 Unprocessable Entity`, in case the user could not be registered (invalid input data, already existing user, etc.)
* `500 Internal Server Error`, in case of server errors

#### POST /login

PUBLIC endpoint to allow an user to login to the platform.

Must accept a JSON with the following structure

```json
{
  "username": "my_user_name",
  "password": "my_user_password"
}
```

Must return the status code `200 OK` and an object containing the user JWT

```json
{
  "token": "the.user.jwt"
}
```

or one of the following error codes:

* `422 Unprocessable Entity`, in case the user could not be logged in (User not found, Wrong password, etc.)
* `500 Internal Server Error`, in case of server errors

#### GET /me

PRIVATE endpoint to retrieve current user data based on the JWT used in the request.

Must return the status code `200 OK` and an object containing every attributes of the `User` model except for the user `password` inside a `"user"` object.

```json
{
  "user": {
    "username": "my_user_name",
    ...
  }
}
```

#### GET /series

PRIVATE endpoint to retrieve the series subscribed by the user.

Must return the status code `200 OK` and an object containing an array `"series"` containing objects representing the subscribed series.

```json
{
  "series": [
    {
      "id": "serie-id",
      "title": "TestSerie",
      "url": "http://my.series.website/test-serie",
      "posterUrl": "http://my.series.website/test-serie/poster.png"
      ...
    }
    ...
  ]
}
```

#### POST /series

PRIVATE endpoint to subscribe the current user to a new serie (or link him to an existing one).

Must accept a JSON with the following structure (some fields may be optional based on the concrete server implementation)

```json
{
  "title": "TestSerie",
  "url": "http://my.series.website/test-serie",
  "posterUrl": "http://my.series.website/test-serie/poster.png"
}
```

Must not return any data except for one of the status codes:

* `201 Created`, in case the serie has been created and the user subscribed
* `422 Unprocessable Entity`, in case the serie could not be created or the user could not be subscirbed to it (invalid input data, unknown user, etc.)
* `500 Internal Server Error`, in case of server errors

##### GET /series/<serie-id>/episodes

PRIVATE endpoint to retrieve every episodes of the `<serie-id>` serie

Must return the status code `200 OK` and an object containing an array `"episodes"` containing objects representing the serie's episodes.

```json
{
  "episodes": [
    {
      "id": "episode-id",
      "number": 1,
      "title": "First episode of the serie",
      "url": "http://my.series.website/test-serie/first-episode"
      ...
    }
    ...
  ]
}
```

### JWT

The user JWT should contain at least the field `id` containing the `user_id`
