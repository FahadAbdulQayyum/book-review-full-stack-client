import { useContext } from 'react';
import alertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const { alerts } = useContext(alertContext);

    if (alerts?.length === 0) {
        return null; // Return null if there are no alerts
    }

    return (
        <>
            {
                alerts?.map(alert => (
                    <div key={alert?.id} className={`alert alert-${alert.type}`}>
                        {alert?.msg}
                    </div>
                ))
            }
        </>
    );
};

export default Alerts;




// import { useContext } from 'react'
// import AlertContext from '../../context/alert/alertContext'

// const { alerts } = useContext(AlertContext)

// const Alerts = () => {
//     return (
//         alerts.length > 0 && alerts.map((alert: any) => {
//             <div key={alert.id}>
//                 <div className={`alert alert-${alert.type}`}>
//                     <i className="fas fa-info-circle" />
//                     {alert.msg}
//                 </div>
//             </div>
//         })
//     )
// }

// export default Alerts
