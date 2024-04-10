/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {IoStar} from 'react-icons/io5'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {
    empData: [],
    salaryData: [],
    profile: {},
    isPfLoading: true,
    apiStatus: 'progress',
    checkBox: '',
    radioBtn: '',
    search: '',
    searchQ: '',
    mainData: [],
    isNoJobs: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'progress'})
    const {searchQ, checkBox, radioBtn} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const empData1 = Cookies.get('empData')
    const salaryData1 = Cookies.get('salaryData')
    const empData = JSON.parse(empData1)
    const salaryData = JSON.parse(salaryData1)
    this.setState({empData, salaryData})

    const option2 = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBox}&minimum_package=${radioBtn}&search=${searchQ}`
    const response2 = await fetch(jobUrl, option2)
    const jobData = await response2.json()
    console.log(jobData)
    if (response2.ok === true) {
      if (jobData.jobs.length === 0) {
        this.setState({isNoJobs: true, isJobLoading: false})
      } else {
        const updatedJobData = jobData.jobs.map(l => ({
          companyLogoUrl: l.company_logo_url,
          employmentType: l.employment_type,
          id: l.id,
          jobDescription: l.job_description,
          location: l.location,
          packagePerAnnum: l.package_per_annum,
          rating: l.rating,
          title: l.title,
        }))
        this.setState({
          mainData: updatedJobData,
          apiStatus: 'success',
          isNoJobs: false,
        })
      }
    } else {
      this.setState({apiStatus: 'failure'})
    }
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch('https://apis.ccbp.in/profile', option)
    const pfData = await profileResponse.json()
    if (profileResponse.ok === true) {
      const updatedPfData = {
        name: pfData.profile_details.name,
        profileImageUrl: pfData.profile_details.profile_image_url,
        shortBio: pfData.profile_details.short_bio,
      }
      this.setState({profile: updatedPfData, isPfLoading: false})
    }
  }

  checkBox = event => {
    console.log(event.target)
    this.setState({checkBox: event.target.value}, this.getData)
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.onAddSearchQ()
    }
  }

  radioButton = event => {
    console.log(event.target)
    this.setState({radioBtn: event.target.value}, this.getData)
  }

  SearchData = event => {
    const searchValue = event.target.value
    this.setState({search: searchValue}, this.getData)
  }

  onAddSearchQ = () => {
    const {search} = this.state
    this.setState({searchQ: search, isJobLoading: true}, this.getData)
  }

  onRetry = () => {
    this.getData()
  }

  onrenderMainEl = () => {
    const {
      profile,
      isPfLoading,
      empData,
      salaryData,
      searchQ,
      mainData,
      isJobLoading,
      isFail,
      isNoJobs,
    } = this.state
    const {profileImageUrl, name, shortBio} = profile
    const NoJobs = (
      <div className="bg-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="img-noj"
        />
        <h1 className="h22">No Jobs Found</h1>
        <p className="p22">We could not find any jobs. Try others filters</p>
      </div>
    )
    const ulEl = (
      <ul className="card-items">
        {mainData.map(l => (
          <Link to={`/jobs/${l.id}`} className="lnk" key={l.id}>
            <li className="li-2" key={l.id}>
              <div className="fl">
                <img
                  src={l.companyLogoUrl}
                  alt="company logo"
                  className="lg-1"
                />
                <div className="cl">
                  <h1 className="h2">{l.title}</h1>
                  <p className="pp2">
                    <IoStar className="st" />
                    {l.rating}
                  </p>
                </div>
              </div>
              <div className="jd">
                <div className="fl">
                  <div className="fl2">
                    <IoLocationSharp />
                    <p> {l.location}</p>
                  </div>
                  <div className="fl2">
                    <BsFillBriefcaseFill />
                    <p> {l.employmentType}</p>
                  </div>
                </div>
                <h4 className="h2">{l.packagePerAnnum}</h4>
              </div>
              <hr className="hrr" />
              <div className="ds">
                <h1 className="h2">Description</h1>
                <p className="p2">{l.jobDescription}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
    const MainEl = <>{isNoJobs === true ? NoJobs : ulEl}</>
    const LoadingEl = (
      <div className="pf">
        <img src={profileImageUrl} alt="profile" className="img-pf" />
        <h1 className="tl">{name}</h1>
        <p className="p1">{shortBio}</p>
      </div>
    )
    return (
      <>
        <Header />
        <div className="bg-con4">
          <div className="card2">
            <div>{LoadingEl}</div>
            <hr />
            <div className="crd4">
              <h1 className="fl-h">Type of Employment</h1>
              <ul className="ul-lt">
                {empData.map(l => (
                  <li className="li" key={l.employmentTypeId}>
                    <input
                      value={l.employmentTypeId}
                      type="checkbox"
                      id={l.employmentTypeId}
                      onChange={this.checkBox}
                    />
                    <label className="lb" htmlFor={l.employmentTypeId}>
                      {l.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="crd4">
              <h1 className="fl-h">Salary Range</h1>
              <ul className="ul-lt">
                {salaryData.map(l => (
                  <li className="li" key={l.salaryRangeId}>
                    <input
                      value={l.salaryRangeId}
                      type="radio"
                      name="salary"
                      onChange={this.radioButton}
                      id={l.salaryRangeId}
                    />
                    <label className="lb" htmlFor={l.salaryRangeId}>
                      {l.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card3">
            <div className="sr-bx">
              <input
                className="inp-src"
                type="search"
                placeholder="Search"
                onChange={this.SearchData}
                onKeyDown={this.onEnter}
              />
              <div className="src-logo">
                <button
                  className="btn-src"
                  type="button"
                  onClick={this.onAddSearchQ}
                  data-testid="searchButton"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="fail">{MainEl}</div>
          </div>
        </div>
      </>
    )
  }

  onrenderProgress = () => {
    const {
      profile,
      isPfLoading,
      empData,
      salaryData,
      searchQ,
      mainData,
      isJobLoading,
      isFail,
      isNoJobs,
    } = this.state
    const {profileImageUrl, name, shortBio} = profile
    console.log(searchQ)
    const NoJobs = (
      <div className="bg-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="img-noj"
        />
        <h1 className="h22">No Jobs Found</h1>
        <p className="p22">We could not find any jobs. Try others filters</p>
      </div>
    )
    const ulEl = (
      <ul className="card-items">
        {mainData.map(l => (
          <Link to={`/jobs/${l.id}`} className="lnk" key={l.id}>
            <li className="li-2" key={l.id}>
              <div className="fl">
                <img
                  src={l.companyLogoUrl}
                  alt="company logo"
                  className="lg-1"
                />
                <div className="cl">
                  <h1 className="h2">{l.title}</h1>
                  <p className="pp2">
                    <IoStar className="st" />
                    {l.rating}
                  </p>
                </div>
              </div>
              <div className="jd">
                <div className="fl">
                  <div className="fl2">
                    <IoLocationSharp />
                    <p> {l.location}</p>
                  </div>
                  <div className="fl2">
                    <BsFillBriefcaseFill />
                    <p> {l.employmentType}</p>
                  </div>
                </div>
                <h4 className="h2">{l.packagePerAnnum}</h4>
              </div>
              <hr className="hrr" />
              <div className="ds">
                <h1 className="h2">Description</h1>
                <p className="p2">{l.jobDescription}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
    const MainEl = <>{isNoJobs === true ? NoJobs : ulEl}</>
    const jobListEl = (
      <div className="loader-container bg" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
    const LoadingEl = (
      <div className="pf">
        <img src={profileImageUrl} alt="profile" className="img-pf" />
        <h1 className="tl">{name}</h1>
        <p className="p1">{shortBio}</p>
      </div>
    )
    return (
      <>
        <Header />
        <div className="bg-con4">
          <div className="card2">
            <div className="loader-container ld" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
            <hr />
            <div className="crd4">
              <h1 className="fl-h">Type of Employment</h1>
              <ul className="ul-lt">
                {empData.map(l => (
                  <li className="li" key={l.employmentTypeId}>
                    <input
                      value={l.employmentTypeId}
                      type="checkbox"
                      id={l.employmentTypeId}
                      onChange={this.checkBox}
                    />
                    <label className="lb" htmlFor={l.employmentTypeId}>
                      {l.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="crd4">
              <h1 className="fl-h">Salary Range</h1>
              <ul className="ul-lt">
                {salaryData.map(l => (
                  <li className="li" key={l.salaryRangeId}>
                    <input
                      value={l.salaryRangeId}
                      type="radio"
                      name="salary"
                      onChange={this.radioButton}
                      id={l.salaryRangeId}
                    />
                    <label className="lb" htmlFor={l.salaryRangeId}>
                      {l.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card3">
            <div className="sr-bx">
              <input
                className="inp-src"
                type="search"
                placeholder="Search"
                onChange={this.SearchData}
                onKeyDown={this.onEnter}
              />
              <div className="src-logo">
                <button
                  className="btn-src"
                  type="button"
                  onClick={this.onAddSearchQ}
                  data-testid="searchButton"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="fail">{jobListEl}</div>
          </div>
        </div>
      </>
    )
  }

  onrenderFailure = () => {
    const {
      profile,
      isPfLoading,
      empData,
      salaryData,
      searchQ,
      mainData,
      isJobLoading,
      isFail,
      isNoJobs,
    } = this.state
    const {profileImageUrl, name, shortBio} = profile
    console.log(searchQ)
    const NoJobs = (
      <div className="bg-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="img-noj"
        />
        <h1 className="h22">No Jobs Found</h1>
        <p className="p22">We could not find any jobs. Try others filters</p>
      </div>
    )
    const ulEl = (
      <ul className="card-items">
        {mainData.map(l => (
          <Link to={`/jobs/${l.id}`} className="lnk" key={l.id}>
            <li className="li-2" key={l.id}>
              <div className="fl">
                <img
                  src={l.companyLogoUrl}
                  alt="company logo"
                  className="lg-1"
                />
                <div className="cl">
                  <h1 className="h2">{l.title}</h1>
                  <p className="pp2">
                    <IoStar className="st" />
                    {l.rating}
                  </p>
                </div>
              </div>
              <div className="jd">
                <div className="fl">
                  <div className="fl2">
                    <IoLocationSharp />
                    <p> {l.location}</p>
                  </div>
                  <div className="fl2">
                    <BsFillBriefcaseFill />
                    <p> {l.employmentType}</p>
                  </div>
                </div>
                <h4 className="h2">{l.packagePerAnnum}</h4>
              </div>
              <hr className="hrr" />
              <div className="ds">
                <h1 className="h2">Description</h1>
                <p className="p2">{l.jobDescription}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
    const MainEl = <>{isNoJobs === true ? NoJobs : ulEl}</>

    const isFailEl = (
      <div className="fl2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="img-fl"
        />
        <h1 className="hh2">Oops! Something Went Wrong</h1>
        <p className="pp2">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="btn-log" onClick={this.onRetry}>
          Retry
        </button>
      </div>
    )
    const LoadingEl = (
      <div className="pf">
        <img src={profileImageUrl} alt="profile" className="img-pf" />
        <h1 className="tl">{name}</h1>
        <p className="p1">{shortBio}</p>
      </div>
    )
    return (
      <>
        <Header />
        <div className="bg-con4">
          <div className="card2">
            <div>{LoadingEl}</div>
            <hr />
            <div className="crd4">
              <h1 className="fl-h">Type of Employment</h1>
              <ul className="ul-lt">
                {empData.map(l => (
                  <li className="li" key={l.employmentTypeId}>
                    <input
                      value={l.employmentTypeId}
                      type="checkbox"
                      id={l.employmentTypeId}
                      onChange={this.checkBox}
                    />
                    <label className="lb" htmlFor={l.employmentTypeId}>
                      {l.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="crd4">
              <h1 className="fl-h">Salary Range</h1>
              <ul className="ul-lt">
                {salaryData.map(l => (
                  <li className="li" key={l.salaryRangeId}>
                    <input
                      value={l.salaryRangeId}
                      type="radio"
                      name="salary"
                      onChange={this.radioButton}
                      id={l.salaryRangeId}
                    />
                    <label className="lb" htmlFor={l.salaryRangeId}>
                      {l.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card3">
            <div className="sr-bx">
              <input
                className="inp-src"
                type="search"
                placeholder="Search"
                onChange={this.SearchData}
                onKeyDown={this.onEnter}
              />
              <div className="src-logo">
                <button
                  className="btn-src"
                  type="button"
                  onClick={this.onAddSearchQ}
                  data-testid="searchButton"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="fail">{isFailEl}</div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.onrenderMainEl()
      case 'failure':
        return this.onrenderFailure()
      case 'progress':
        return this.onrenderProgress()
      default:
        return null
    }
  }
}

export default Jobs
