# Getting Started

Get start with the project by following bellow steps.

```zsh
git clone https://github.com/SamiulKhanDev/zag.git;
cd zag
npm install
npm run start:dev
```

**NOTE** \
The otp based authentication uses SMTP(Simple Mail Transfering Protocol) for which
Google has blocked uses of low priority applications with an Email. So the email
you are using make sure you have created a separate password for the app.

**NOTE** \
Make sure to define your own database host, port, username, password, database in
app.module.ts file.

**NOTE** \
The Otp expires in 2mins where the access token expires in 1d.

## API Reference

#### Get Otp

```http
  POST /api/v1/auth/sendotp
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `userId`  | `string` | **Required**. Your Email Address |

#### Verify Otp

```http
  POST /api/v1/auth/verifyotp
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `userId`  | `string` | **Required**. Your Email Address            |
| `otp`     | `string` | **Required**. The Otp You Got In Your Email |
| `hash`    | `string` | **Required**. Hash Sent From the Backend    |

#### Get all Todo

```http
  GET /api/v1/todo
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

#### Insert A Todo

```http
  POST /api/v1/todo/insert
```

| Parameter     | Type     | Description                           |
| :------------ | :------- | :------------------------------------ |
| `name`        | `string` | **Required**. Name of the new Todo    |
| `description` | `string` | **Required**. Description Of The Todo |

#### Update The Description Of A Todo

```http
  POST /api/v1/todo/update
```

| Parameter     | Type     | Description                               |
| :------------ | :------- | :---------------------------------------- |
| `id`          | `string` | **Required**. Id Of The Todo              |
| `description` | `string` | **Required**. New Description Of The Todo |

#### Delete A Todo

```http
  GET /api/v1/todo/delete/:id
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

#### SignOut

```http
  GET /api/v1/auth/signout
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

## Environment Variables

Please make sure you add a .env file to the root of the project. The file
contents should look like this

```
EMAIL=your email address

PASSWORD=your password

SECRET=your jwt secret

HOST=youy mysql server

PORT=your mysql server port

USERNAME=your mysql server username

PASSWORD_DB=your mysql server password

NAME=your mysql server database name
```
