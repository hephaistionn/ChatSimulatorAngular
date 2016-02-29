# ChatSimulator (Angular version)
This app is a chat simulation. All frontend side .

# Tech
* [AngularJS] - HTML enhanced for web apps!

# Installation

You need Gulp installed globally:

```sh
$ npm i -g gulp
```

```sh
$ git clone [git-repo-url] BattleCruiserAngular
$ cd BattleCruiserReact
$ npm install
$ gulp build
$ node server.js
```

opens this page : [http://localhost:3000/]

# Tests

Tests are managed by Protractor. <br />
Protractor needs to [Java Development Kit (JDK)] for working. <br />
You need jasmine and protractor installed globally: <br />
```sh
$ npm install -g jasmine
$ npm install -g protractor
```

Launch functional tests.
```sh
$ webdriver-manager update
$ webdriver-manager start  //test server
$ protractor protractor.conf.js
```

License
----

MIT

[AngularJS]: <http://angularjs.org>
[Java Development Kit (JDK)]: <http://www.oracle.com/technetwork/java/javase/downloads/index.html>
[protractor]: <http://angular.github.io/protractor/#/>
