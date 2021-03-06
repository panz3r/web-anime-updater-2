# Web Anime Updater 2

## Reference Backend

### Models

#### User

A `User` model represent the platform user and must include at least the following attributes

| Field    | Description                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------- |
| ID       | An unique ID generated by the server to identify the user between different requests.                     |
| Username | This should uniquely identify the user so that the same username cannot be used to create multiple users. |
| Password | This should be the password used by the user to authenticate to the service.                              |

<hr />

#### Serie

A `Serie` model represent the TV show that an user is watching and must include at least the following attributes

| Field     | Description                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ID        | An unique ID generated by the server to identify a serie.                                                                       |
| Title     | The Serie title to be shown to the user.                                                                                        |
| Url       | The URL used by the `WAU scraper` to retrieve serie data and episodes.                                                          |
| PosterUrl | The URL at which a `poster` image can be found for the serie. This should be used to display the serie main poster to the user. |

<hr />

#### Episode

An `Episode` model represent a single episode of a `Serie` and must include at least the following attributes

| Field  | Description                                                  |
| ------ | ------------------------------------------------------------ |
| ID     | An unique ID generated by the server to identify an episode. |
| Number | The episode number. Should be an integer (starting from 0).  |
| Title  | The episode title (if available).                            |
| Url    | The episode details URL.                                     |

<hr />

### Relationships

* An `User` can be subscribed to many `Serie`s
* A `Serie` can be subscribed by many `User`s

* A `Serie` can have multiple `Episode`s
* An `Episode` can only be of a single `Serie`
