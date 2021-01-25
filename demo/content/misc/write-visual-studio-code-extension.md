Write Visual Studio Code Extension
===

开发文档写得很详实， 先 [通读一遍 Overview](https://code.visualstudio.com/api)，甚至完整看过教程，即可对基础概念有一些理解。剩下的事情，就是看一些优秀的或是自己感兴趣的开源插件代码。


## 调试与测试

### [Disabling other extensions while debugging](https://code.visualstudio.com/api/working-with-extensions/testing-extension#disabling-other-extensions-while-debugging)

使用 `--disable-extensions` 命令行参数，可避免其他插件干扰，同时也加快启动速度。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Extension Tests",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--disable-extensions",
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
    }
  ]
}
```