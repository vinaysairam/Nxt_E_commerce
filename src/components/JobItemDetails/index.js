/* eslint-disable dot-notation */
/* eslint-disable import/no-duplicates */
import {Component} from 'react'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {IoLocationSharp} from 'react-icons/io5'
import {IoStar} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobs: [],
    skills: [],
    apiStatus: 'progress',
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getDataList()
  }

  getDataList = async () => {
    this.setState({apiStatus: 'progress'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response1 = await fetch(url, options)
    const data3 = await response1.json()
    if (response1.ok === true) {
      const upJobDetails = {
        companyLogoUrl: data3.job_details.company_logo_url,
        companyWebsiteUrl: data3.job_details.company_website_url,
        employmentType: data3.job_details.employment_type,
        id: data3.job_details.id,
        jobDescription: data3.job_details.job_description,
        title: data3.job_details.title,
        rating: data3.job_details.rating,
        location: data3.job_details.location,
        packagePerAnnum: data3.job_details.package_per_annum,
      }
      const upLifeAtCompany = {
        description: data3.job_details.life_at_company.description,
        imageUrl: data3.job_details.life_at_company.image_url,
      }
      const upskills = data3.job_details.skills.map(l => ({
        imageUrl: l.image_url,
        name: l.name,
      }))
      const upsimilarJobs = data3.similar_jobs.map(l => ({
        companyLogoUrl: l.company_logo_url,
        employmentType: l.employment_type,
        id: l.id,
        jobDescription: l.job_description,
        location: l.location,
        rating: l.rating,
        title: l.title,
      }))
      console.log(upLifeAtCompany)
      this.setState({
        jobData: upJobDetails,
        similarJobs: upsimilarJobs,
        skills: upskills,
        lifeAtCompany: upLifeAtCompany,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onrenderMainElement = () => {
    const {jobData, skills, similarJobs, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData
    return (
      <>
        <Header />
        <div className="bg-con5">
          <div className="container">
            <div className="fl">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="lg-1"
              />
              <div className="cl">
                <h1 className="h2">{title}</h1>
                <p className="pp2">
                  <IoStar className="st" />
                  {rating}
                </p>
              </div>
            </div>
            <div className="jd1">
              <div className="fl">
                <div className="fl2">
                  <IoLocationSharp />
                  <p> {location}</p>
                </div>
                <div className="fl2">
                  <BsFillBriefcaseFill />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p className="h2">{packagePerAnnum}</p>
            </div>
            <hr className="hrr1" />
            <div className="crd11">
              <h1 className="h22">Description</h1>
              <div className="fll">
                <a href={companyWebsiteUrl} className="aa" target="__blank">
                  Visit
                  <FaExternalLinkAlt className="lnkk" />
                </a>
              </div>
            </div>
            <p className="pp3">{jobDescription}</p>
            <h1 className="h22">Skills</h1>
            <ul className="ul-4">
              {skills.map(l => (
                <li className="li1" key={l.name}>
                  <img src={l.imageUrl} className="img-lgg" alt={l.name} />
                  <h1 className="h3">{l.name}</h1>
                </li>
              ))}
            </ul>
            <h1 className="h22">Life at Company</h1>
            <div className="fll">
              <p className="pp3">{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.imageUrl} alt="img" className="img-4" />
            </div>
          </div>
          <h1 className="h22">Similar Jobs</h1>
          <ul className="ul-5">
            {similarJobs.map(l => (
              <li className="li22" key={l.id}>
                <div className="fl">
                  <img
                    src={l.companyLogoUrl}
                    alt="similar job company logo"
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
                <div>
                  <h1 className="h22 pd">Description</h1>
                  <p className="p22">{l.jobDescription}</p>
                </div>
                <div className="jd1">
                  <div className="fl">
                    <div className="fl2">
                      <IoLocationSharp />
                      <p>{l.location}</p>
                    </div>
                    <div className="fl2">
                      <BsFillBriefcaseFill />
                      <p>{l.employmentType}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  onRetry = () => {
    this.getDataList()
  }

  onrenderFailureElement = () => (
    <>
      <Header />
      <div className="bg-con5">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="fl-img"
        />
        <h1>Oops! Something Went Wrong </h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" className="btn-retry" onClick={this.onRetry}>
          Retry
        </button>
      </div>
    </>
  )

  onrenderLoadingElement = () => (
    <>
      <Header />
      <div className="bg-con5">
        <div className="ldd">
          <div className="loader-container ldd ld" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.onrenderMainElement()
      case 'failure':
        return this.onrenderFailureElement()
      case 'progress':
        return this.onrenderLoadingElement()
      default:
        return null
    }
  }
}
export default JobItemDetails
