import { useState, useCallback } from "react";
import { url } from "../Constant/url";
import * as feedback from '../Function/feedback'


export interface RoutineType {
    wakeUpTime: boolean
    isDrank: boolean
    isWorkOut: boolean
    todayPlan: object[]
}

export const defaultRoutine: RoutineType = {
    wakeUpTime: false,
    isDrank: false,
    isWorkOut: false,
    todayPlan: []
}

export default function useRoutineAPI() {
    const [isResetting, setIsResetting] = useState(false)
    const [isStarting, setIsStarting] = useState(false)
    const [routine, setRoutine] = useState<RoutineType>()

    const getRoutine = useCallback(async () => {
        setRoutine(defaultRoutine)
        setIsStarting(true)
        try {
            const res = await fetch(`${url}/routine.json`)
            const data = await res.json()
            setRoutine(data)
            setIsStarting(false)
        }
        catch (e) {
            setIsStarting(false)
            feedback.error(e as Error)
        }
    }, [])

    const resetRoutine = useCallback(async () => {
        setIsResetting(true)
        try {
            const res = await fetch(`${url}/routine.json`, {
                method: 'POST',
                body: JSON.stringify(defaultRoutine),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setIsResetting(false)
            if (res.ok) { feedback.success('Reset Routine') }
        } catch (e) {
            setIsResetting(false)
            feedback.error(e as Error)
        }
    }, [])

    return {
        isResetting,
        resetRoutine,
        routine,
        getRoutine,
        isStarting
    }
}