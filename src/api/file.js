import axios from '@/utils/axios'
export default {
  //根据id数组获取文件列表
  getFileList: ids => {
    return axios.file.post('file/manage/list', ids)
  },
  //根据id下载文件
  downloadFileById: id => {
    return axios.file.get(`file/commonFile/download/${id}`, { responseType: 'blob' })
  }
}
