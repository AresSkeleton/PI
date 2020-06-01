define({ "api": [
  {
    "type": "post",
    "url": "/addSurveyByKey",
    "title": "Dodaje ankiete do użytkownika za pomocą klucza",
    "group": "dodajankiete.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Key of survey.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>User password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Status of POST method is OK.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Created UserSurveys row:",
          "content": "200 OK\n{\n  \"hashedKey\": \"5tEg190520\",\n  \"data\": \"--encrypt survey--\",\n  \"done\": \"0\"\n}",
          "type": "json"
        },
        {
          "title": "Updated Users row:",
          "content": "200 OK\n{\n  \"anotherHashedKeys\": \"[--1st encrypt key-- , --2nd encrypt key--, .... ]\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Failed to create UserSurveys row.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status1",
            "description": "<p>Not able to append keys field.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status2",
            "description": "<p>Not such survey with given key.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status3",
            "description": "<p>Not such user with given login.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/dodajankiete.js",
    "groupTitle": "dodajankiete.js",
    "name": "PostAddsurveybykey"
  },
  {
    "type": "post",
    "url": "/dodajankiete",
    "title": "Wysyła nowo utworzoną ankiete do DB",
    "group": "dodajankiete.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Key of survey.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of survey.</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "data",
            "description": "<p>Added survey data.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>Users session.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Status1",
            "description": "<p>of POST method is OK.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status2",
            "description": "<p>Not able to create row in table UserSurveys.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status3",
            "description": "<p>Not able to append keys field.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status4",
            "description": "<p>Not able to create row in table Survey.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status5",
            "description": "<p>Row from Users not founded.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/dodajankiete.js",
    "groupTitle": "dodajankiete.js",
    "name": "PostDodajankiete"
  },
  {
    "type": "get",
    "url": "/dodajankiete",
    "title": "Generuje strone 'dodajankiete'",
    "group": "home.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>User login.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page",
            "description": "<p>Render /dodajankiete page.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/home.js",
    "groupTitle": "home.js",
    "name": "GetDodajankiete"
  },
  {
    "type": "get",
    "url": "/mojeankiety/:uspass",
    "title": "Wyswietla strone 'mojeankiety', gdzie można wypełniać dodane ankiety oraz zobaczyć wyniki swoich ankiet",
    "group": "home.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uspass",
            "description": "<p>User password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page",
            "description": "<p>Render /mojeankiety/:uspass.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/home.js",
    "groupTitle": "home.js",
    "name": "GetMojeankietyUspass"
  },
  {
    "type": "get",
    "url": "/home",
    "title": "Wyswietla głowną stronę dla zalogowanych użytkowników",
    "group": "index.js",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page",
            "description": "<p>If session is not exist render /index page.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Failed to find Users row.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "index.js",
    "name": "GetHome"
  },
  {
    "type": "get",
    "url": "/index",
    "title": "przekierowóje na strone loginowania albo na strone /home, w zalezności od sesji",
    "group": "index.js",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page",
            "description": "<p>If session is not exist render /login page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page1",
            "description": "<p>If session is exist redirect to /home page.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "index.js",
    "name": "GetIndex"
  },
  {
    "type": "get",
    "url": "/register",
    "title": "przekierowóje na strone rejestracji albo na strone /home, w zalezności od sesji",
    "group": "index.js",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page",
            "description": "<p>If session is not exist render /register page.</p>"
          },
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page1",
            "description": "<p>If session is exist redirect to /home page.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "index.js",
    "name": "GetRegister"
  },
  {
    "type": "post",
    "url": "/home",
    "title": "Porównuje hasło",
    "group": "index.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>Username login.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Username password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Send to page parameter iscorrect.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "index.js",
    "name": "PostHome"
  },
  {
    "type": "get",
    "url": "/wynikiankiety/:id/:usccv",
    "title": "Pokazuje wyniki konkretnej ankiety",
    "group": "mojeankiety.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id from Users table.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "usccv",
            "description": "<p>Code CCV.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page",
            "description": "<p>Render /wynikiankiety/:id/:usccv with [id, usccv, survey, user] parameters.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Bad CCV code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status1",
            "description": "<p>Not such survey with given id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/mojeankiety.js",
    "groupTitle": "mojeankiety.js",
    "name": "GetWynikiankietyIdUsccv"
  },
  {
    "type": "get",
    "url": "/zaladujankiete/:id",
    "title": "Wyświetla strone z możliwościa wypełnienia ankiety o konkretnym id",
    "group": "mojeankiety.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Username id from Users table.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Page",
            "optional": false,
            "field": "Page",
            "description": "<p>Render /zaladujankiete with parameters &quot;data&quot; and &quot;user&quot;.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Not such survey with given id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/mojeankiety.js",
    "groupTitle": "mojeankiety.js",
    "name": "GetZaladujankieteId"
  },
  {
    "type": "post",
    "url": "/sendSurvey/:id",
    "title": "Wysyła do bazy danych informacje o wypełniniej ankiecie",
    "group": "mojeankiety.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "answers",
            "description": "<p>Json of survey with input data.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of survey in Surveys table.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Status of POST method is OK, if row was edit correctly.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status1",
            "description": "<p>Status of POST method is Created, if row was created succesfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update UserSurveys row:",
          "content": "200 OK\n{\n  \"done\": \"2\"\n}",
          "type": "Json"
        },
        {
          "title": "Append \"data\" parameter in Answers table:",
          "content": "200 OK\n{\n  \"data\": \"--some new inputs --\",\n}",
          "type": "Json"
        },
        {
          "title": "Create Answers row:",
          "content": "200 OK\n{\n  \"key\" : \"5tEg190520\",\n     \"name\" : \"testowy\",\n     \"data\" : \"--some encrypted data--\"\n}",
          "type": "Json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Not able to update row in table Answers.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status1",
            "description": "<p>Not able to find row with given key in Answers table.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status2",
            "description": "<p>Not able to create row in table Answers.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status3",
            "description": "<p>Row from Users not founded.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status4",
            "description": "<p>Not able to find row with dehashed key.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status5",
            "description": "<p>Not able to update status of row in UserSurveys table.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status6",
            "description": "<p>Not able to find all rows in UserSurveys table.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/mojeankiety.js",
    "groupTitle": "mojeankiety.js",
    "name": "PostSendsurveyId"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Dodawanie użytkownika do bazy danych",
    "group": "register.js",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>Username login.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Username password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Send to page object with parameter status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Create User row:",
          "content": "200 OK\n{\n  \"login\" : \"testowy2\"\n  \"password\": \"$2b$10$v9BsrpDLlpA9uQvpMocydO90uOJX3PQ/tvBbxyMsSU7TgVwBaNgVu\"\n  \"hashedKeys\": \"\"\n  \"anotherHashedKeys\": \"\"\n}",
          "type": "Json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Not able to create row in Users table.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "status1",
            "description": "<p>Cannot hash password.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/register.js",
    "groupTitle": "register.js",
    "name": "PostRegister"
  }
] });
