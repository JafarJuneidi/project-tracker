import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Navbar from '../Dashboard';
import ForgotPassword from '../ForgotPassword';
import { AuthProvider } from '../../contexts/AuthContext';
// import { Container } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import Dashboard from '../Dashboard/Dashboard';
import Class from '../Class/Class';
import FaultPage from '../faultPage';
import Chat from '../Chat';
import Tasks from '../Tasks';
import Project from '../Project';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route exact path='/' element={<Navbar />}>
							<Route path='/' element={<Dashboard />} />
							<Route path='/Class' element={<Class />} />
							<Route path='/Chat' element={<Chat />} />
							<Route path='/Tasks' element={<Tasks />} />
							<Route path='/Project' element={<Project />} />
							<Route path='*' element={<FaultPage />} />
						</Route>
					</Route>
					<Route path='/signup' element={<SignUp />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
				</Routes>
				<Outlet />
			</AuthProvider>
		</Router>
	);
}

export default App;
