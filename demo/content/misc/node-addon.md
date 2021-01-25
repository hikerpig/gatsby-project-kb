Node Addon
===

### N-API

- [从暴力到 NAN 再到 NAPI——Node.js 原生模块开发方式变迁 · 语雀](https://www.yuque.com/egg/nodejs/nodejs-addon-history)，死月写的介绍
- [🤖 Beginners guide to writing NodeJS Addons using C++ and N-API (node-addon-api)](https://medium.com/@a7ul/beginners-guide-to-writing-nodejs-addons-using-c-and-n-api-node-addon-api-9b3b718a9a7f)
- [JavaScript ♥ C++: Modern Ways to Use C++ in JavaScript Projects](https://medium.com/netscape/javascript-c-modern-ways-to-use-c-in-javascript-projects-a19003c5a9ff)。17 年的测试，WASM 几个 case 里比 N-API 快，可能是数据在 JS <-> WASM 比 JS <-> Native 间转换开销要小？
- [用 Rust 和 N-API 开发高性能 NodeJS 扩展 - 知乎](https://zhuanlan.zhihu.com/p/234914336)


与 WASM 比较
- 从包管理的角度来说，WASM 可以直接发布编译产物，不需要发布源码让用户自己编译，也不需要 node-pre-gyp 这样的方案
- N-API 从 JS 侧来看，使用起来更加的自然，不用考虑和纯 JS 模块调用方式的区别。
- [待验证] WASM 方案在数据跨环境转换的调用开销小于 N-API ，但是它的计算性能可能低于 native, 而且可能在最新的功能(例如 SIMD)支持上没有 native 发展得快？