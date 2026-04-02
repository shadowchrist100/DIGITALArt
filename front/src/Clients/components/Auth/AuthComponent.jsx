import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuthHook";

const AuthComponent = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                <span className="ml-3" style={{ color: '#2b2d42' }}>Vérification de la session...</span>
            </div>
        );
    }

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// const { pathname } = useLocation()
// const { Loading, user } = useAuth();
// if (Loading) {
//     return (
//         <div className="flex items-center justify-center h-screen">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//             <span className="ml-3">Vérification de la session...</span>
//         </div>
//     )
// }
// else {

//     if (user === null) {
//         return <Navigate to={`/login?redirect=${pathname}`} replace />;
//     }
// }
// return children;

export default AuthComponent;