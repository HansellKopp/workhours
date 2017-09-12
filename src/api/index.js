const uuidV4 = require('uuid/v4')
const moment = require('moment')
const _ = require('lodash')
const SETTINGS = 'settings'
const WORK_DAYS_ITEMS = 'workdayItems'

export class WorkDays {
  constructor (storage) {
    this.storage = storage
    if (!this.storage.get(SETTINGS)) {
      this.storage.set(SETTINGS, JSON.stringify(
        {
          hourlyIncome: 8.84,
          currentFilter: moment().format('MMMM YYYY')
        }
      ))
    }
    if (!this.storage.get(WORK_DAYS_ITEMS)) {
      this.storage.set(WORK_DAYS_ITEMS, JSON.stringify([]))
    }
  }
  getAll (filter) {
    if (!filter) {
      return JSON.parse(this.storage.get(WORK_DAYS_ITEMS))
    }
    const currentFilter = this.getSettings().currentFilter
    const items = JSON.parse(this.storage.get(WORK_DAYS_ITEMS)).filter(s =>
      (moment(s.start).format('MMMM YYYY') === currentFilter)
    )
    return _.sortBy(items, 'start')
  }
  getAvailableFilters () {
    const list = this.getAll()
    const filters = [...new Set(list.map(item => moment(item.start).format('MMMM YYYY')))]
    return filters
  }
  getSettings () {
    return JSON.parse(this.storage.get(SETTINGS))
  }
  setHourlyIncome (hourlyIncome) {
    const settings = this.getSettings()
    settings.hourlyIncome = hourlyIncome
    this.storage.set(SETTINGS, JSON.stringify(settings))
  }
  setCurrentFilter (filter) {
    const settings = this.getSettings()
    settings.currentFilter = filter
    this.storage.set(SETTINGS, JSON.stringify(settings))
  }
  totalHours (data) {
    let total = 0
    data.map((s) => {
      total += moment.duration(s.end.diff(s.start))
    })
    return moment.duration(total).humanize
  }
  totalIncome (data) {
    let total = 0
    data.map((s) => {
      total += s.income
    })
    return total
  }
  getById (id) {
    const workdayItems = this.getAll()
    const itemIndex = workdayItems.findIndex(item => item.id === id)
    if (itemIndex >= 0) {
      const item = workdayItems[itemIndex]
      item.itemIndex = itemIndex
      return item
    } else {
      return null
    }
  }
  setDateTime (_date, _time) {
    let date = moment(_date)
    let time = moment(_time, 'HH:mm a')
    date.set({
      hour: time.get('hour'),
      minute: time.get('minute')
    })
    return date
  }
  save (item) {
    const workdayItems = this.getAll()
    const settings = this.getSettings()
    const start = this.setDateTime(item.date, item.start)
    const end = this.setDateTime(item.date, item.end)
    if (end < start) {
      end.add(1, 'day')
    }
    const minutes = Math.trunc(moment.duration(end.diff(start)).asMinutes())
    const hours = Math.trunc(minutes / 60)
    const lapse = `${hours}:${minutes - (hours * 60)}`
    const income = settings.hourlyIncome / 60 * minutes
    const newItem = {
      id: item.id || uuidV4(),
      start,
      end,
      lapse,
      income
    }
    const itemIndex = workdayItems.findIndex(s => s.id === item.id)
    if (itemIndex >= 0) {
      workdayItems[itemIndex] = newItem
    } else {
      workdayItems.push(newItem)
    }
    this.storage.set(WORK_DAYS_ITEMS, JSON.stringify(workdayItems))
  }
  delete (id) {
    const workdayItems = this.getAll()
    const itemIndex = workdayItems.findIndex(item => item.id === id)
    if (itemIndex >= 0) {
      workdayItems.splice(itemIndex, 1)
      this.storage.set(WORK_DAYS_ITEMS, JSON.stringify(workdayItems))
    }
  }
}
