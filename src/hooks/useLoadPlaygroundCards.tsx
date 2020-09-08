import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { loadPlaygroundCards } from "../utils"
import { playgroundActions } from "../store/playgroundReducer"
import { useDispatch } from "react-redux"
import * as Sentry from "@sentry/react-native";

export default function useLoadPlaygroundCards() {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isFocused) {
            return
        }
        setLoading(true)
        const loadCards = async () => {
            try {
                const response = await loadPlaygroundCards({})
                dispatch(playgroundActions.setCards(response))
            } catch (e) {
                Sentry.captureException(e)
            } finally {
                setLoading(false)
            }
        }
        loadCards()
    }, [isFocused])

    return { loading }

}
