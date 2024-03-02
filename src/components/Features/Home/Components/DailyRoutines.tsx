import React, { useEffect } from "react";
import { Row, Button, Spin } from 'antd'
import useRoutineAPI from "../../../API/useRputineAPI";
import { LockOutlined } from '@ant-design/icons'
import Block from "../../../UI/Block";


const DailyRoutines: React.FC = () => {

    const { resetRoutine, isResetting, routine, getRoutine, isStarting } = useRoutineAPI()

    useEffect(() => { getRoutine() }, [])

    return (
        <Block>
            <Spin spinning={isStarting}>
                <Row gutter={[0, 16]}>
                    <Button
                        block
                        type="primary"
                        disabled={routine?.wakeUpTime}
                    >
                        Wake Up !
                    </Button>
                    <Button
                        block
                        type="primary"
                        disabled={!routine?.wakeUpTime}
                    >
                        {!routine?.wakeUpTime ? <LockOutlined rev="..." /> : 'Drink a Glass of Water'}
                    </Button>
                    <Button
                        block
                        type="primary"
                        disabled={!routine?.isDrank}
                    >
                        {!routine?.isDrank ? <LockOutlined rev="..." /> : 'Workout !'}
                    </Button>
                    <Button
                        block
                        type="primary"
                        disabled={!routine?.isWorkOut}
                    >
                        {!routine?.isWorkOut ? <LockOutlined rev="..." /> : 'Plan the Day'}
                    </Button>
                </Row>
            </Spin>
        </Block>
    )
}

export default DailyRoutines