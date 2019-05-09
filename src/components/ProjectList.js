import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import ReactPlayer from 'react-player'
import { Col, Row, Card, Modal, Button } from 'antd'
import 'antd/lib/modal/style/css';
import 'antd/lib/col/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/card/style/css';
import _ from 'lodash';





export default class ArchivePage extends React.Component {

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    console.log(this.props.projects[0].node.fimg_url.souce_url)
    const { projects, title } = this.props

    return (

      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">{title}</h1>
          </div>
          <Row type="flex" gutter={16}>
            {projects.map(({ node: project }) => (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} key={project.id}>
                <Card 
                title={project.title}
                style={{backgroundColor: 'rgba(255, 255, 255, 0.0)'}}
                headStyle={{backgroundColor: '#812E82', color:'white'}}
                bodyStyle={{backgroundColor: '255, 255, 255, 0.0)'}}
                >
                  <div onClick={this.showModal} style={{ cursor: 'pointer' }}>
                  {project.fimg_url.source_url}
                  {`https://img.youtube.com/vi/${project.acf.video_url.split('=')[1]}/mqdefault.jpg`}
                  {project.fimg_url.source_url.length==0 
                    ?
                    <img src={`https://img.youtube.com/vi/${project.acf.video_url.split('=')[1]}/mqdefault.jpg`} alt="Test" ></img>
                    :
                    <img src={project.fimg_url.source_url} alt="Test" ></img>}

                    <small>
                      <p>shazam</p>
                      <p>{project.project_categories[0].name}</p>
                      <p>{project.date}</p>
                    </small>
                  </div>
                  <Modal
                    title={project.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <ReactPlayer url={project.acf.video_url} width="100%" />
                    <p>Some contents...</p>
                    {project.date}
                    {project.content}
                  </Modal>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    )
  }
}

ArchivePage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment ProjectListFields on wordpress__wp_project {
    id
    title
    date(formatString: "MMMM DD, YYYY")
    slug
    content
    acf {
      video_url 
      }
    project_categories {
      name
    }
    fimg_url {
      source_url
    }
  }
`
