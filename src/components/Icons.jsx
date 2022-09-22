

const iconGenerator = (icon_name) => <span className="material-symbols-outlined">{icon_name}</span>

const Icons = {
    settings: iconGenerator('settings'),
    home: iconGenerator('home_app_logo'),
    account: iconGenerator('account_circle'),
    chat: iconGenerator('chat'),
    groupChat: iconGenerator('forum'),
    weather: iconGenerator('nest_farsight_weather'),
    calendar: iconGenerator('calendar_month'),
    search:iconGenerator('search'),
    logout:iconGenerator('logout'),
    location: iconGenerator('person_pin_circle')
}


export default Icons