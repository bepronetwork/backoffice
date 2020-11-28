import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ReduxTest = () => {
    const { appName, setAppName } = useState("");

    useEffect(() => {
        const profile = useSelector(state => state.profile);

        const { params } = profile.app;

        setAppName(params.name)
    }, [])

    return (
        <span>{appName}</span>
    )
}


export default ReduxTest;