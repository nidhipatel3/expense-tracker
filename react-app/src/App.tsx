import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import SideBar from './components/sidebar';
import SignUp from './components/signup';
import SignIn from './components/signin';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
    return (
        <Router>
            <UserProvider>
                <Header />
                <div className="row justify-content-start">
                    <div className="col-5">
                        <SideBar />
                    </div>
                    <div className="col-7">
                        <Routes>
                            <Route path='/user/signup' element={<SignUp />} />
                            <Route path='/user/signin' element={<SignIn />} />
                        </Routes>
                    </div>
                </div>
            </UserProvider>
        </Router>
    )
}

export default App;