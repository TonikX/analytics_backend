const createAction = (type, ...argNames) => (...args) => {
    let action = {type};

    if (!argNames.length) argNames = ['payload'];

    argNames.forEach((argName, index) => {
        action[argName] = args[index];
    });

    return action;
};

export default createAction;