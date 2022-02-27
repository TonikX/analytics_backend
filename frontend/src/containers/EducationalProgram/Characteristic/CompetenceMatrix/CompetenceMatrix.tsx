import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import actions from "../../../EducationalProgram/actions";

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getCompetenceMatrix(2));
    }, []);
    return <div>123</div>
}
