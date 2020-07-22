#include "pch.h"
#include <tchar.h>
#include <TlHelp32.h>
#include <direct.h>
#include <string.h>
#include <atlstr.h>

// dllFileName 被注入的dll路径
// exeName 被注入的应用程序路径
int Inject(char* dllFileName, char* exeName)

/*
状态码
0: 成功
1: 没有找到进程
2: 打开进程失败
3: 分配内存空间失败
4: 写入内存失败
5: 查找LoadLibraryA失败
6: 启动远程线程失败
*/