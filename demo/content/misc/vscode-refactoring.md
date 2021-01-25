VSCode Refactoring
===
#vscode

看起来 Typescript LSP server 有实现一些重构 action，涉及重命名和子函数抽取等常用功能，但是没有理想的 move file 体验。

目前 [move-ts](https://github.com/stringham/move-ts) 插件有一些暴力的实现？但一个没有解决的痛点是没支持 `git mv`， 在 git 仓库里使用往往比较烦人。

相比之下 WebStorm 做得很好，整个 JetBrains 系的重构体验比较统一和[智能](https://www.jetbrains.com/help/idea/refactoring-source-code.html)。

- [Safe delete](https://www.jetbrains.com/help/idea/safe-delete.html)，使用此模式删除，会显示引入了该代码或文件的模块
- [Move Refactorings](https://www.jetbrains.com/help/idea/move-refactorings.html)，文件移动以后会自动更新引用以及 git

这也是许多类似 [_Why I Switched From Visual Studio Code To JetBrains WebStorm_](https://dev.to/mokkapps/why-i-switched-from-visual-studio-code-to-jetbrains-webstorm-939) 的文章里一定会提到的 JetBrains 家一大优势