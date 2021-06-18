/*
 * @Description:甘特图假数据
 * @Version:
 * @Autor:
 * @Date: 2020-02-26 16:53:07
 * @LastEditTime: 2020-02-29 14:52:24
 */
let data = [
  {
    id: '10',
    rowId: '3bcb1407b82e483d8fa9be26f734a0ab',
    text: '里程碑1',
    actual_start: '2020-01-02 00:00:00',
    actual_end: '2020-01-30 00:00:00',
    start_date: '2020-01-01 00:00:00',
    end_date: '2020-01-22 00:00:00',
    progress: 30,
    dependencies: ['0']
  },
  {
    id: '1',
    rowId: '7c64c8fd726f4b23a66021a849db3d85',
    text: '重点任务1',
    actual_start: '2020-01-19 00:00:00',
    actual_end: '2020-01-29 00:00:00',
    start_date: '2020-01-19 00:00:00',
    end_date: '2020-01-29 00:00:00',
    progress: 50,
    dependencies: ['10']
  },
  {
    id: '2',
    rowId: 'c1afe0a277da46fb824c991cd09c67da',
    text: '任务2',
    actual_start: null,
    actual_end: null,
    start_date: '2020-02-01 00:00:00',
    end_date: '2020-02-25 00:00:00',
    progress: 30,
    dependencies: ['1']
  },
  {
    id: '5',
    rowId: '689d6c5c4676464780d51cf9d5be734a',
    text: '重点任务2',
    actual_start: null,
    actual_end: null,
    start_date: '2020-02-23 00:00:00',
    end_date: '2020-03-12 00:00:00',
    progress: 80,
    dependencies: ['2']
  },
  {
    id: '11',
    rowId: '4321e277cf5745e395eb77e9757e559d',
    text: '里程碑2',
    actual_start: '2020-03-13 00:00:00',
    actual_end: '2020-03-27 00:00:00',
    start_date: '2020-03-13 00:00:00',
    end_date: '2020-03-31 00:00:00',
    progress: 50,
    dependencies: ['10']
  },
  {
    id: '3',
    rowId: '3384cc02d0414e9eb7384c57e92273b8',
    text: '重点任务4',
    actual_start: null,
    actual_end: null,
    start_date: '2020-04-01 00:00:00',
    end_date: '2020-05-19 00:00:00',
    progress: 95,
    dependencies: ['11']
  },
  {
    id: '4',
    rowId: 'c6c2b02f3c4b4bdaa615e5a071f13f81',
    text: '任务4',
    actual_start: null,
    actual_end: null,
    start_date: '2020-05-20 00:00:00',
    end_date: '2020-06-19 00:00:00',
    progress: 100,
    dependencies: ['3']
  },
  {
    id: '12',
    rowId: '21677b7795b4454e85d30370dcd19731',
    text: '里程碑3',
    actual_start: '2020-06-20 00:00:00',
    actual_end: '2020-06-30 00:00:00',
    start_date: '2020-06-20 00:00:00',
    end_date: '2020-08-31 00:00:00',
    progress: 10,
    dependencies: ['11']
  },
  {
    id: '6',
    rowId: 'ecac59e9ecef4c6db9c58bd62aa0f02c',
    text: '任务1',
    actual_start: null,
    actual_end: null,
    start_date: '2020-09-01 00:00:00',
    end_date: '2020-10-19 00:00:00',
    progress: 80,
    dependencies: ['12']
  },
  {
    id: '9',
    rowId: 'e15333a294524657982a35651311f365',
    text: '任务1 版本2 修改版',
    actual_start: null,
    actual_end: null,
    start_date: '2020-10-19 00:00:00',
    end_date: '2020-11-01 00:00:00',
    progress: 30,
    dependencies: ['6']
  },
  {
    id: '13',
    rowId: '253586b8496548798a144a59c899684c',
    text: '里程碑4',
    actual_start: null,
    actual_end: null,
    start_date: '2020-11-03 00:00:00',
    end_date: '2020-12-19 00:00:00',
    progress: 100,
    dependencies: ['12']
  },
  {
    id: '7',
    rowId: '94588e8329f742d69cb4d5afe9ab0dc3',
    text: '重点任务3',
    actual_start: null,
    actual_end: null,
    start_date: '2020-12-19 00:00:00',
    end_date: '2021-02-19 00:00:00',
    progress: 10,
    dependencies: ['13']
  }
]
export default data
