import {atom} from 'jotai'
import {storage} from '../services/storage.service'


const userAtom = atom(storage.getUser() ?? null)

export const userAtomWithPersistence = atom(
    (get) => get(userAtom),
    (get, set, user) => {
        set(userAtom, user ?? null)
        storage.setUser(user)
    }
)