export const init = {

    numOfFields: 20,
    specialFields: [
        {
        number: 12,
        isOver: true
        },
        {
        number: 19,
        isOver: false,
        moveTo: 11
        }
    ]

};

export const viewPresets = {

    showMainMenu: {
        showGame: false,
        showSettings: false,
        showMainMenu: true
    },
    showGame: {
        showGame: true,
        showSettings: false,
        showMainMenu: false
    },
    showSettings: {
        showGame: false,
        showSettings: true,
        showMainMenu: false
    }    

}