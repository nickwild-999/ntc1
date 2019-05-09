import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import ReactPlayer from 'react-player'

import Layout from '../components/Layout'

export const ProjectTemplate = ({
  content,
  title,
  date,
  video_url, 

}) => (
  <section className="section">
    <div className="container content">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
            {title}
          </h1>
          <div>{date}</div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <div>
            <ReactPlayer url={video_url} light   /> 
          </div>
        </div>
      </div>
    </div>
  </section>
  )

ProjectTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const Project = ({ data }) => {
  const { wordpressWpProject: project } = data
  return (
    <Layout>
      <Helmet title={`${project.title} | Blog`} />
      <ProjectTemplate
        content={project.content}
        categories={project.categories}
        tags={project.tags}
        title={project.title}
        date={project.date}
        author={project.author}
        video_url={project.acf.video_url}
      />
    </Layout>
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Project

export const pageQuery = graphql`
  fragment ProjectFields on wordpress__wp_project {
    id
    slug
    content
    date(formatString: "DD MMMM, YYYY")
    title,
  }
  query ProjectByID($id: String!) {
    wordpressWpProject(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "DD MMMM, YYYY")
      acf {
      video_url 
      }
    }
  }
`
