import { createContext, useState } from "react";

const NotificationContext = createContext({
    notification: null,
    showNotification: function(notificationData){},
    hideNotification: function(){},
});

export const NotificationContextProvider = (props) =>{
    const [active, setActive] = useState();
    const showNotificationHandler = (notificationData) => {
        setActive(notificationData)
    } 
    const hideNotificationHandler = () => {
        setActive(null);
    } 

    const context = {
        notification: active, 
        showNotification: showNotificationHandler, 
        hideNotification: hideNotificationHandler 
    }
    return <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
}

export default NotificationContext;