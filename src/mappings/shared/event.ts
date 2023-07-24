import { create } from '@kodadot1/metasquid/entity'
import { Action, EventEntity, IEvent, eventFrom } from '../utils/types'
import { nanoid } from 'nanoid'

export const eventId = (id: string, event: Action) =>
  `${id}-${event}${nanoid()}`

export function createEvent<T extends Action>(id: string, from: IEvent<T>): EventEntity {
  const newEventId = eventId(id, from.interaction)
  const event = create(EventEntity, newEventId, from)
  return event
}
