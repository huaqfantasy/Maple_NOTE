#  适用于 .NET 的 C++/CLI 
ps: 今日无事，开坑！
# 环境配置及结构介绍
   1. 安装安装 C++/CLI 支持：打开vs installer 选择安装
   2. 创建CLR 控制台应用程序(CLR 控制台应用(.NET Framework))
   3. 项目结构(源文件、头文件、资源文件)  
   
   | 源文件      | Description |
   | ----------- | ----------- |
   | ConsoleApplicationName.cpp      | 应用的主要源文件和入口点。 此文件具有为项目指定的基名称。 它标识项目 DLL 文件和项目命名空间。 在此文件中提供你自己的代码       |
   | AssemblyInfo.cpp   | 包含可用于修改项目程序集元数据的属性和设置。         |
   | pch.cpp| 用于生成名为 ConsoleApplicationName.pch 的预编译标头文件和名为 pch.obj 的预编译类型文件         |  
   
   | 头文件     | Description |
   | ----------- | ----------- |
   | pch.h      | 用于生成名为 ConsoleApplicationName.pch 的预编译标头文件和名为 pch.obj 的预编译类型文件。       |
   | Resource.h   | 为 app.rc 生成的包含文件        |

   | 资源文件     | Description |
   | ----------- | ----------- |
   | app.rc      | 程序的资源脚本文件      |
   | app.ico     | 程序的图标文件        | 

## 示例程序
```
#include "pch.h"

using namespace System;

ref struct City {
private:
    Int16 zip_;

public:
    City(int zip) : zip_(zip) {};
    property Int16 zip {
        Int16 get(void) {
            return zip_;
        }   // get
    }   // property
};

void passByRef(City^% myCity) {
    // cast required so this pointer in City struct is "const City"
    if (myCity->zip == 20100)
        Console::WriteLine("zip == 20100");
    else
        Console::WriteLine("zip != 20100");
}

ref class G {
public:
    int i;
};

void Test(int% i) {
    i++;
}

int main(array<System::String ^> ^args)
{
    G^ g1 = gcnew G;
    G^% g2 = g1;
    g1->i = 12;

    Test(g2->i);   // g2->i will be changed in Test2()

    City^ Milano = gcnew City(20100);
    passByRef(Milano);
    return 0;
}
``` 
## 基础数据类型

- bool：布尔类型，可以存储 true 或 false。
  
- char：用于存储单个字符的类型。
  
- wchar_t：用于存储宽字符（Unicode）的类型。
  
- unsigned char：无符号字符类型。
  
- short：短整型，通常占用 2 个字节。
  
- unsigned short：无符号短整型，占用 2 个字节。
  
- int：整型，通常占用 4 个字节。
  
- unsigned int：无符号整型，占用 4 个字节。
  
- long long：长整型，通常占用 8 个字节。
  
- unsigned long long：无符号长整型，占用 8 个字节。
  
- float：单精度浮点数，占用 4 个字节。
  
- double：双精度浮点数，占用 8 个字节。
  
- Decimal：高精度小数类型，占用 16 个字节。
  
- IntPtr：指针类型，用于存储指针或句柄。
  
- UIntPtr：无符号指针类型，用于存储指针或句柄的无符号表示  
`C++/CLI 中的基本数据类型可以通过带有“^”后缀的托管指针来表示，以区别于非托管的 C++ 数据类型。例如，int 的托管指针类型为“int^”;用"%"定义引用`

## c++/cli中的指针,引用,托管指针
ok,上代码  
**Swap**：我来~~~

```
//指针
void swap(int* a, int* b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

//引用
void swap_1(int% a, int% b)
{
    int temp = a;
    a = b;
    b = temp;
}
//托管指针
void swap_2(int^ a, int^ b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}


int main()
{
    int x = 10, y = 20;
    Console::WriteLine("befor: a:{0:D} b:{1:D}", a, b);
    swap(&a,&b);
    Console::WriteLine("after: a:{0:D} b:{1:D}",a,b);
    return 0;
}
```

**指针（pointer）**是一个变量，它存储另一个变量的地址。使用指针可以直接访问存储在这个地址上的变量的值。指针可以通过运算符来进行解引用、取地址、加法、减法等操作。指针可以指向任何类型的变量，包括托管类型和非托管类型。

**托管指针（managed pointer）**是一个特殊的指针，它由 CLR（公共语言运行时）进行管理。托管指针只能指向托管类型的变量（如 `String`、`array`、`class`、`interface` 等）。使用托管指针需要在类型前加上符号 ^，例如：`int^`、`String^`、`array<int>^` 等。与指针不同，托管指针不能进行指针算术运算，但可以使用 `gcnew` 运算符进行动态内存分配和释放。

**引用（reference）**是另一个变量的别名。它可以被看作是指针的一种特殊形式，它不能被重新赋值指向另一个变量。使用引用可以像访问变量一样直接访问另一个变量的值，而无需进行解引用运算符（*）。引用只能引用已经存在的变量，不能引用空值（null）。

### emm，托管指针，好家伙，来看看具体怎么用
```
using namespace System;

int main()
{
    // 定义一个托管整数类型的变量，并将其初始化为 42
    int^ x = gcnew int(42);

    // 使用托管指针访问 x 的值
    Console::WriteLine("x = {0}", *x);

    // 使用托管指针修改 x 的值
    *x = 99;
    Console::WriteLine("x = {0}", *x);

    // 释放托管指针所指向的内存
    delete x;

    return 0;
}
```
总结：表面上看起来和new差不多，只是使用时变成了`gcnew`和`delete`,解指针的时候还是`*`

未完待续，以上~~~

如有疑问：  
[🏳 **issue**](https://github.com/huaqfantasy/Maple_NOTE/issues)   
📩 邮箱: `hjf734628@gmail.com`   