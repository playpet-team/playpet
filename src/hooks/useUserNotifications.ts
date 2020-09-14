import * as Sentry from "@sentry/react-native";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducers";
import { addListenerNotification, FirebaseTimeStamp, hasNewNotification } from "../utils";

let snapshotListener: any
function useUserNotifications(getType: 'listener' | 'isNew' = 'listener') {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isNew, setIsNew] = useState(false)
    const { uid } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (getType === 'listener') {
            loadNotification()
        } else if (getType === 'isNew') {
            checkNewNotification()
        }


        return () => {
            if (typeof snapshotListener === 'function') {
                snapshotListener()
            }
        }
    }, [])

    const checkNewNotification = useCallback(async () => {
        setIsNew(await hasNewNotification(uid))
    }, [uid])

    const loadNotification = useCallback(async () => {
        try {
            snapshotListener = await addListenerNotification(uid, (data: any) => {
                setNotifications(data)
            })
        } catch (e) {
            Sentry.captureException(e)
        }
    }, [uid])

    return { notifications, isNew }
}

export default useUserNotifications

export interface Notification {
    actionUrl: string
    status: 'active' | 'deactive'
    data: {
        title: string
        description: string
        images: string[]
    }
    icon: string
    read: boolean
    toUid: string
    fromUid: string
    fromUsername: string
    title: string
    type: 'simple' | 'detail' | 'link'
    createdAt: FirebaseTimeStamp | string
    expiredAt: FirebaseTimeStamp | string
    updatedAt: FirebaseTimeStamp | string
}