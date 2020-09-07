import { useEffect } from "react"
import dynamicLinks from '@react-native-firebase/dynamic-links'


export default function useInitialDynamicLink() {
    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (!link) {
                    return
                }
                console.log('link----------', link)
            })
    }, [])
}
