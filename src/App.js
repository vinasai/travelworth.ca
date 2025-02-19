//[18/02/2025] [Oshen] [added the chatbot only to user pages and not to admin pages]
//[19/02/2025] [Shivan] [removed customerfeedback and customerdetails from user]
import React from "react";
import { Route, Routes , useLocation} from "react-router-dom";
import "./assets/css/tailwind.css";
import "./assets/css/materialdesignicons.min.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/index/index";
import Admin from "./pages/index/admin";
import IndexThree from "./pages/index/index-three";
import IndexFour from "./pages/index/index-four";
import IndexFive from "./pages/index/index-five";
import Grid from "./pages/listing/tour-grid/grid";
import GridLeftSidebar from "./pages/listing/tour-grid/grid-left-sidebar";
import GridRightSidebar from "./pages/listing/tour-grid/grid-right-sidebar";
import List from "./pages/listing/tour-list/list";
import ListLeftSidebar from "./pages/listing/tour-list/list-left-sidebar";
import ListRightSidebar from "./pages/listing/tour-list/list-right-sidebar";
import TourDetailOne from "./pages/listing/tour-detail/tour-detail-one";
import TourDetailTwo from "./pages/listing/tour-detail/tour-detail-two";
import Aboutus from "./pages/aboutus";
import UserProfile from "./pages/account/user-profile";
import UserPayment from "./pages/account/user-payment";
import UserInvoice from "./pages/account/user-invoice";
import UserSocial from "./pages/account/user-social";
import {ToastContainer} from "react-toastify";
import UserNotification from "./pages/account/user-notification";
import UserSetting from "./pages/account/user-setting";
import Helpcenter from "./pages/helpcenter/helpcenter";
import HelpcenterFaq from "./pages/helpcenter/helpcenter-faqs";
import HelpcenterGuides from "./pages/helpcenter/helpcenter-guides";
import HelpcenterSupport from "./pages/helpcenter/helpcenter-support";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import SignupSuccess from "./pages/auth/signup-success";
import ForgotPassword from "./pages/auth/forgot-password";
import LockScreen from "./pages/auth/lock-screen";
import Terms from "./pages/utility/terms";
import Privacy from "./pages/utility/privacy";
import Comingsoon from "./pages/special/comingsoon";
import Maintenance from "./pages/special/maintenance";
import Error from "./pages/special/404";
import Blogs from "./pages/blog/blogs";
import BlogStandard from "./pages/blog/blog-standard";
import BlogDetail from "./pages/blog/blog-detail";
import Contact from "./pages/contact";
import ExploreDestinations from "./pages/destinations/destinations";
import CityDestinations from "./pages/destinations/destination-city";
import 'react-toastify/dist/ReactToastify.css';
import AddPackageForm from "./components/AddPackageForm";
import CustomerFeedback from"./pages/index/CustomerFeedback";
import CustomerDetails from "./pages/index/CustomerDetails";

import ManageDestinations from './pages/ManageDestinations';
import ManagePlaces from './pages/ManagePlaces';
import AddDestinationForm from'./components/AddDestinationForm';
import ManageFood from'./pages/ManageFood';
import ManageCulture from'./pages/ManagaCulture';
import MustVisitPlace from'./pages/ManageMustVisitPlaces';
import Do from'./pages/ManageDolist';
import CityDestinationContent from "./components/destinations/city-destination";
import Placedetails from'./components/Placedetails';
import TravelChatbot from "./components/TravelChatbot";



function App() {
    const location = useLocation();
        // List of protected routes
    const protectedRoutes = [
            "/customerdetails",
            "/customerfeedback",
            "/admin",
            "/managedestinations",
            "/manageplaces",
            "/food",
            "/manageculture",
            "/managevisit",
            "/dolist"
        ];

    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/index-three" element={<IndexThree />} />
                <Route path="/index-four" element={<IndexFour />} />
                <Route path="/index-five" element={<IndexFive />} />
                <Route path="/grid" element={<Grid />} />
                <Route path="/grid-left-sidebar" element={<GridLeftSidebar />} />
                <Route path="/grid-right-sidebar" element={<GridRightSidebar />} />
                <Route path="/list" element={<List />} />
                <Route path="/list-left-sidebar" element={<ListLeftSidebar />} />
                <Route path="/list-right-sidebar" element={<ListRightSidebar />} />
                <Route path="/tour-detail-one/:id" element={<TourDetailOne />} />
                <Route path="/tour-detail-two" element={<TourDetailTwo />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/user-payment" element={<UserPayment />} />
                <Route path="/user-invoice" element={<UserInvoice />} />
                <Route path="/user-social" element={<UserSocial />} />
                <Route path="/user-notification" element={<UserNotification />} />
                <Route path="/user-setting" element={<UserSetting />} />
                <Route path="/helpcenter" element={<Helpcenter />} />
                <Route path="/helpcenter-faqs" element={<HelpcenterFaq />} />
                <Route path="/helpcenter-guides" element={<HelpcenterGuides />} />
                <Route path="/helpcenter-support" element={<HelpcenterSupport />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-success" element={<SignupSuccess />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/lock-screen" element={<LockScreen />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/comingsoon" element={<Comingsoon />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/404" element={<Error />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog-standard" element={<BlogStandard />} />
                <Route path="/blog-detail/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/destinations" element={<ExploreDestinations />} />
                <Route path="/Addpackages" element={<AddPackageForm />} />
                <Route path="/adddestinationform" element={<AddDestinationForm />} />
                <Route path="/city-destination" element={<CityDestinationContent />} />
                <Route path="/places/:placeId" element={<Placedetails />} />

                {/* Protected Routes (Admin Panel) */}
                <Route
                    path="/customerdetails"
                    element={
                        <ProtectedRoute>
                            <CustomerDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customerfeedback"
                    element={
                        <ProtectedRoute>
                            <CustomerFeedback />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/managedestinations"
                    element={
                        <ProtectedRoute>
                            <ManageDestinations />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manageplaces"
                    element={
                        <ProtectedRoute>
                            <ManagePlaces />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/food"
                    element={
                        <ProtectedRoute>
                            <ManageFood />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manageculture"
                    element={
                        <ProtectedRoute>
                            <ManageCulture />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/managevisit"
                    element={
                        <ProtectedRoute>
                            <MustVisitPlace />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dolist"
                    element={
                        <ProtectedRoute>
                            <Do />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            {/* Show TravelChatbot only for users, not in admin-related pages */}
            {!protectedRoutes.includes(location.pathname) && <TravelChatbot />}
        </>
    );
}

export default App;