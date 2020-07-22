// 设置用户id
export function setUserId(str: string | undefined): string {
  if (str) {
    return str.split('_')[1]
  } else {
    return 'null'
  }
}

// 获取用户id
export function getUserId(str: string): string {
  if (str === 'null') {
    return 'null'
  } else {
    return `wxid_${str}`
  }
}
