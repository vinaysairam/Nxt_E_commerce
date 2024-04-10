/* eslint-disable arrow-body-style */
import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => {
  return (
    <>
      <Header />
      <div className="bg-con2">
        <div className="card-1">
          <h1 className="hh">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="para">
            Millions of people are searching for jobs, salary <br />
            information, company reviews. Find the job that fits your
            <br /> abilities and potential
          </p>
          <Link to="/jobs" className="lnk">
            <button type="button" className="btn-jb">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
