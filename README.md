# seng-disposable-event-listener
The addEventListener is a wrapper around the native addEventListener method, which makes it easier to remove it. By calling this function, the listener is removed

## Installation
### yarn / npm

```sh
yarn add seng-disposable-event-listener
```

```sh
npm i -S seng-disposable-event-listener
```

## Usage

#### Constructing.
```
  const windowResizeListener = addEventListener(
    window,
    resize',
    this.handleResize.bind(this)
  );
```

#### Disposing

```
  windowResizeListener();
```


## Building

In order to build seng-disposable-event-listener, ensure that you have [Git](http://git-scm.com/downloads) and [Node.js]
(http://nodejs
.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/riccomediamonks/seng-disposable-event-listener.git
```

Change to the seng-disposable-event-listener directory:
```sh
cd seng-disposable-event-listener
```

Install dev dependencies:
```sh
yarn
```

Use one of the following main scripts:
```sh
yarn build           # build this project
yarn dev             # run dev-watch mode, serving example/index.html in the browser
yarn generate        # generate all artifacts (compiles ts, webpack, docs and coverage)
yarn test:unit       # run the unit tests
yarn validate        # runs validation scripts, including test, lint and coverage check
yarn lint            # run tslint on this project
yarn doc             # generate typedoc documentation
```

When installing this module, it adds a pre-push hook, that runs the `validate`
script before committing, so you can be sure that everything checks out.
