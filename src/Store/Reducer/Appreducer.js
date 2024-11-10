const initialstate = {
    isRegistered: true,
}

export const appreducer = (state = initialstate, action) => {
    switch (action.type) {
        case "user not registered":
            return { ...state, isRegistered: false }
        case "user registered":
            return { ...state, isRegistered: true }
        default:
            return state;
    }

}