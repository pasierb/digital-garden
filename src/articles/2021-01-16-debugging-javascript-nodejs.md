---
title: 🐛 Debugging JavaScript (Node.js)
date: 2021-01-16
summary: assss
slug: /debugging-javascript-nodejs
images:
- https://cdn.stencilbot.io/project?w=1300&h=650&0.bg=%23ffffff&1.x=150&1.y=75&1.w=1000&1.h=500&1.txt=Debugging%20JavaScript%20(Node.js)&1.color=%23c13e70&1.fontSize=60&1.font=DM%20Sans%3A700&1.txtAlign=center&1.valign=middle
stencilbot: generic
---

To paraphrase Theodore Roosevelt

> The only man who never created a bug is the man who never wrote a line of code.

Bugs are inevitable, and You better know how to debug your code. In this post, I will show You how to use the debugger in most common scenarios.

*If You are only interested in VS Code usage, you can skip directly to the [next section](#vscode), but I think it's worth to understand how to use node debugger without IDE support first.*

Since JavaScript was made for browser usage, it comes with no surprise that we have great tooling in the browser itself. My favorite browser to develop is Chrome, mainly because of DevTools, and it's top-notch debugger. Fortunately, the same debugger available for frontend applications is also available for Node.js apps.

To use **Chrome DevTools debugger**:

1. run node script in debug mode (more on how to do it in next section)
2. open chrome developer tools
3. open node debugger

![Chrome DevTools debugger](images/chrome-debugger-button.png)

To set a breaking point just put `debugger` statement in the code

```javascript
http.createServer((req, res) => {
    debugger; // <- code should stop executing here
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello!");
    res.end();
  })
```

## Activating inspector

Node.js has a built-in inspector that we can activate by passing `--inspect` flag to the `node` command. This will run the `node` command and start the inspector at `127.0.0.1:9229`. 

```shell
node --inspect server.js
```

We can then open Chrome DevTools and connect the debugger.

What about scripts that run and exit (i.e., not servers)? Node.js has another flag, `--inspect-brk`, which stops execution at the beginning of the script, giving us time to open and connect Chrome debugger.

```shell
node --inspect-brk script.js
```

## TypeScript

Obviously, you can compile TS to JS and run JS script, but it's much more convenient to do it in one step. I use [ts-node](https://github.com/TypeStrong/ts-node) in pretty much every TypeScript project nowadays for that reason.

```shell
node -r ts-node/register --inspect-brk script.ts
```


You can find more debugging options at [ts-node project README](https://github.com/TypeStrong/ts-node#programmatic).

## "bin" scripts, e.g., jest

What if you need to debug a script that is not run by the `node` command, like `jest`?
Easy, make it run with `node`.  

```shell
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

**NOTE**: `--runInBand` is required to run jest in a single process; otherwise, it will spawn child processes preventing debugging.

## <a name="vscode"></a> VS Code

As reported in [2020 State of JS](https://2020.stateofjs.com/en-US/other-tools/#text_editors) VS Code is by far the most used text editor (86%), so I'm going to focus only on it (conveniently, this is also my text editor of choice).

VS Code has an excellent, highly configurable (via [launch configurations](https://code.visualstudio.com/Docs/editor/debugging#_launch-configurations)) JavaScript debugger.

Bellow launch configuration shows how to debug some of before mentioned scenarios:

1. Jest tests
2. Server
3. TypeScript

```json
{
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Tests",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "console": "integratedTerminal",
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "args": ["--runInBand"]
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Server",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/server.js",
        },
        {
            "type": "node",
            "request": "launch",
            "name": "TypeScript",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/script.ts",
            "runtimeArgs": ["-r", "ts-node/register"]
        }
    ]
}
```

If you check in the VS Code terminal, you can see no magic in how it works. For the Jest tests, you will see something like `./node_modules/.bin/jest --runInBand` plus some environmental variables and configuration options - just like you would run it without IDE.

For more in depth VS Code debugging guide, check the official [documentation](https://code.visualstudio.com/Docs/editor/debugging) section.

## Summary

I find the ability to debug software effectively an essential tool in my day-to-day work. Sprinkling `console.log("wtf")` all over code will take you places, but when it comes to those nasty "down the rabbit hole" bugs, nothing can replace a proper debugger.

Full code examples available at [https://github.com/pasierb/debugging-javascript-nodejs-examples](https://github.com/pasierb/debugging-javascript-nodejs-examples).
