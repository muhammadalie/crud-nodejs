# API Docs

>## General

|              |                                     |
| ------------ | ----------------------------------- |
| URl          | `127.0.0.1:8122`                    |
| Content-Type | `application/x-www-form-urlencoded` |
| start-file   | `app.js`                            |
| to start     | `node app.js`                       |

>### register user 

*`register a user`*

|        |                |
| ------ | -------------- |
| API    | `/user/signup` |
| Method | `POST`         |

>  Body Params

| Params    | Type     |            |
| --------- | -------- | ---------- |
| userId    | `String` |            |
| password  | `String` |            |
| firstName | `String` | `optional` |
| lastName  | `String` | `optional` |

>### login user 

*`login a user`*

|        |               |
| ------ | ------------- |
| API    | `/user/login` |
| Method | `POST`        |

>  Body Params

| Params   | Type     |
| -------- | -------- |
| userId   | `String` |
| password | `String` |


>## please login for following APIs

>### Update profile

*`Update profile details`*

|        |                |
| ------ | -------------- |
| API    | `/user/update` |
| Method | `PUT`          |


>  Body Params

| Params    | Type     |            |
| --------- | -------- | ---------- |
| firstName | `String` | `optional` |
| lastName  | `String` | `optional` |
| address   | `String` | `optional` |

>### Get Profile 

*`Get user profile`*

|        |             |
| ------ | ----------- |
| API    | `/user/get` |
| Method | `GET`       |


>### logout user 

*`logout a user`*

|        |                |
| ------ | -------------- |
| API    | `/user/logout` |
| Method | `GET`          |


> ## NOTE

>### Create Note 

*`make a note`*

|        |                |
| ------ | -------------- |
| API    | `/note/create` |
| Method | `POST`         |

>  Body Params

| Params  | Type     |
| ------- | -------- |
| content | `String` |
| title   | `String` |

>### Get note 

*`download a file`*

|        |             |
| ------ | ----------- |
| API    | `/note/get` |
| Method | `GET`       |

>  Query Params

| Params | Type     |
| ------ | -------- |
| title  | `String` |

>### list notes

*`list all notes`*

|        |              |
| ------ | ------------ |
| API    | `/note/list` |
| Method | `PUT`        |

>### Update note

*`Update content of notes`*

|        |              |
| ------ | ------------ |
| API    | `/note/list` |
| Method | `GET`        |


>  Body Params

| Params  | Type     |
| ------- | -------- |
| content | `String` |
| title   | `String` |

>### Remove note 

*`delete or clear notes`*

|        |                |
| ------ | -------------- |
| API    | `/note/remove` |
| Method | `POST`         |


> Body Params

| Params | Type     | notes                         |
| ------ | -------- | ----------------------------- |
| clear  | `bool`   | **true if need flash our db** |
| title  | `String` |                               |


>## FILE

>### upload 

*`upload a file`*

|              |                    |
| ------------ | ------------------ |
| API          | `/file/upload`     |
| Method       | `POST`             |
| Content-Type | `application/json` |

>  Body Params

| Params   | Type     |
| -------- | -------- |
| file     | `file`   |
| filename | `String` |


>### download 

*`download a file`*

|        |                  |
| ------ | ---------------- |
| API    | `/file/download` |
| Method | `GET`            |

>  Query Params

| Params   | Type     |
| -------- | -------- |
| filename | `String` |

>### list 

*`list all files`*

|        |              |
| ------ | ------------ |
| API    | `/file/list` |
| Method | `GET`        |

>### delete 

*`delete or clear files`*

|        |                |
| ------ | -------------- |
| API    | `/file/delete` |
| Method | `POST`         |

> Body Params

| Params   | Type     | notes                         |
| -------- | -------- | ----------------------------- |
| clear    | `bool`   | **true if need flash our db** |
| filename | `String` |                               |