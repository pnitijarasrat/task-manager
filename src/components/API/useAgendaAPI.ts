import { useCallback, useState } from 'react'
import * as feedback from '../Function/feedback'
import { url } from '../Constant/url'
import { dataRemap } from '../Function/dataRemap'
import moment from 'moment'

export interface newAgendaType {
  titleName: string
  appointee: string
  location: string
  date: string
  time: string
}

export interface AgendaType extends newAgendaType {
  key: string
}

export default function useAgendaAPI() {
  const [isBooking, setIsBooking] = useState(false)
  const [isGettingAgenda, setIsGettingAgenda] = useState(false)
  const [agenda, setAgenda] = useState<AgendaType[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState<string>('')

  const getAgenda = useCallback(async () => {
    setAgenda([])
    setIsGettingAgenda(true)
    try {
      const res = await fetch(`${url}/agenda.json`)
      const data = await res.json()
      const arr = dataRemap(data).sort((a, b) => {
        const dateA = moment(a.dateString, 'YYYY-MM-DD');
        const dateB = moment(b.dateString, 'YYYY-MM-DD');
        return dateA.isBefore(dateB) ? 1 : -1;
      })
      setAgenda(arr)
      setIsGettingAgenda(false)
    }
    catch (e) {
      setIsGettingAgenda(false)
      feedback.error(e as Error)
    }
  }, [])

  const bookAgenda = useCallback(async (newAgenda: newAgendaType) => {
    setIsBooking(true)
    try {
      const res = await fetch(`${url}/agenda.json`, {
        method: 'POST',
        body: JSON.stringify(newAgenda),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsBooking(false)
      if (res.ok) { feedback.success("Book Agenda") }
    }
    catch (e) {
      setIsBooking(false)
      feedback.error(e as Error)
    }
  }, [])

  const deleteAgenda = useCallback(async (agendaId: string) => {
    setIsDeleting(true)
    setDeletingId(agendaId)
    try {
      const res = await fetch(`${url}/agenda/${agendaId}.json`, {
        method: 'DELETE',
        body: JSON.stringify(agendaId),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsDeleting(false)
      setDeletingId('')
      if (res.ok) feedback.success("Delete Task")
    } catch (e) {
      setIsDeleting(false)
      setDeletingId('')
      feedback.error(e as Error)
    }
  }, [])

  return {
    bookAgenda,
    isBooking,
    getAgenda,
    isGettingAgenda,
    agenda,
    deleteAgenda,
    isDeleting,
    deletingId
  }

}