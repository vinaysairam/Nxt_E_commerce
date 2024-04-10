import './App.css'
import Cookies from 'js-cookie'
import {Switch, Route} from 'react-router-dom'
import ProtectRoute from './components/ProtectRoute'
import JobItemDetails from './components/JobItemDetails'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Login from './components/Login'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
Cookies.set('empData', employmentTypesList, {
  expires: 30,
})
Cookies.set('salaryData', salaryRangesList, {
  expires: 30,
})

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectRoute exact path="/" component={Home} />
      <ProtectRoute exact path="/jobs" component={Jobs} />
      <ProtectRoute exact path="/jobs/:id" component={JobItemDetails} />
      <NotFound />
    </Switch>
  </>
)

export default App
