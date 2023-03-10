# vcpkg 踩坑日记

## 从源码编译vcpkg 

**源码地址：**[github](https://github.com/microsoft/vcpkg)  
频道:
- [⚙︎ Slack-vcpkg ](https://cppalliance.org/slack/)  
- [🌏 Discord](https://www.includecpp.org/)  
- [📚︎ 文档](https://learn.microsoft.com/vcpkg)

## Windows上搭建vcpkg包管理环境  
1. **下载源代码**  
```
> git clone https://github.com/microsoft/vcpkg  
> .\vcpkg\bootstrap-vcpkg.bat  
``` 

2. **配置环境变量**
   将vcpckg的安装路径配置到系统环境变量中

3. **常用命令**
   | command     | Description |
   | ----------- | ----------- |
   | vcpkg search  <pkg>            | 搜索       |
   | vcpkg install <pkg>            | 安装       |
   | vcpkg remove  <pkg>            | 卸载       |
   | vcpkg remove --outdated        | 卸载所有过时的包。        |
   | vcpkg update                   | 列出可以更新的包。        |
   | vcpkg upgrade                  | 重建所有过时的包。        |   
   | vcpkg list                     | 列出已安装的包        |
   | vcpkg integrate install        | 使已安装的软件包在用户范围内可用。 需要管理员首次使用特权。|
   | vcpkg integrate remove         | 删除用户范围的集成。  |
   | vcpkg integrate project        | 为单个 VS 项目生成引用 NuGet 包使用。  |
   | vcpkg integrate powershell     | 启用 PowerShell 选项卡完成。 |
   | vcpkg export <pkg>... [opt]... | 导出包。        |
   | vcpkg version                  | 通过特定算法对文件进行哈希处理，默认为 SHA512        |  

4. 碎碎念  
   老生常谈的网络问题，解决办法：科学上网/提前下载安装包/镜像加速

5. 经典模式   
   - **查找**    
   ```
        vcpkg search sqlite3  
        //若需要指定x86/x64
        vcpkg search sqlite3：
   ```
   - **安装**  
   ```
        vcpkg install sqlite3
        //指定某种架构（x86/x64...） 
        vcpkg install sqlite3:x64-windows 
   ```
   - **检查是否安装成功**
   ```
        vcpkg list
   ``` 
   可选参数(常用)：
    | command                 | Description |
    | -----------             | ----------- |
    | --only-downloads        | 只下载资源包但是不构建 |
    | --recurse               | 允许在安装过程中删除软件包 |
    | --clean-after-build     | 在每一个库构建完成后清理buildtrees下库的源文件, packages 和 downloads 下的库相关的文件(比较大的库一定要记得清理,之前磁盘就被爆破了，泪目) |
    | --downloads-root=<path> | 指定downloads-root的路径，默认.\vcpkg\downloads |  

   - **集成到开发环境**(首次使用请开启管理员模式)
   ```
   //全局
   vcpkg integrate install
   //移除
   vcpkg integrate remove
   //指定工程
   vcpkg integrate [project]
   ```
6. **集成到CMake**
   ` cmake -B build -S -DCMAKE_TOOLCHAIN_FILE=<vcpkg_dir>/scripts/buildsystems/vcpkg.cmake`  
7. **手动将自己的本地库集成到vckpg**  
   (todo...)  

如有疑问：  
[🏳 **issue**](https://github.com/huaqfantasy/Maple_NOTE/issues)   
📩 邮箱: `hjf734628@gmail.com`   
