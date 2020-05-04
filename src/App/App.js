import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble,faPencilAlt,} 
  from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import ConnectivityError from '../ConnectivityError/ConnectivityError'

import AddMessage from '../AddMessage/AddMessage'
import AddPost from '../AddPost/AddPost'

import AddMember from '../AddMember/AddMember'

import { findMessage, findMessageMember } from '../messages-helpers'
import { findPost, findPostMember } from '../posts-helpers'

import MessageListMain from '../Messages/MessageListMain/MessageListMain'
//import MessageListNav from '../MessageListNav/MessageListNav'
import MessagePageMain from '../Messages/MessagePageMain/MessagePageMain'
//import MessagePageNav from '../MessagePageNav/MessagePageNav/MessagePageNav'

import PostListMain from '../Posts/PostListMain/PostListMain'
import PostListNav from '../Posts/PostListNav/PostListNav'
import PostPageMain from '../Posts/PostPageMain/PostPageMain'
import PostPageNav from '../Posts/PostPageNav/PostPageNav'
import './App.css'


library.add(faPlus, faEdit, faChevronLeft, faTrashAlt, faCheckDouble, faPencilAlt)

class App extends Component {
  state = {
    editMessageId: null,
    posts: [],
    editPostId: null,
    members: [],
    err: null
  }

  MemberUrl = `${config.API_ENDPOINT}/members`
  PostUrl = `${config.API_ENDPOINT}/posts`
  MessageUrl = `${config.API_ENDPOINT}/messages`

  componentDidMount() {
    fetch(this.MemberUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          members: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
        console.log(err)
      })

    fetch(this.PostUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })

      fetch(this.MessageUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          messages: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  handleAddMember = member => {
    this.setState(
      {
        members: [...this.state.members, member]
      },
      () => this.props.history.replace('/')
    )
  }

  handleAddMessage = message => {
    this.setState({ messages: [...this.state.messages, message] }, () =>
      this.props.history.replace('/')
    )
  }

  handleDeleteMessage = messageId => {
    this.setState({
        messages: this.state.messages.filter(message => message.id !== messageId)
    })
  }

  handleAddPost = post => {
    this.setState({ posts: [...this.state.posts, post] }, () =>
      this.props.history.replace('/')
    )
  }

  handleDeletePost = postId => {
    this.setState({
        posts: this.state.posts.filter(post => post.id !== postId)
    })
  }

  renderNavRoutes() {
    const { messages, posts, members } = this.state
    return (
      <>
        {/* Main Route */}
        {['/', '/members/:memberid', '/messages'].map(path => (
          <Route exact key={path} path={path} component={PostListNav} />
        ))}
        <Route
          path='/posts/:postId'
          render={routeProps => {
            const { postId } = routeProps.match.params
            const post = findPost(posts, postId) || {}
            const member = findPostMember(members, post.memberid)
            return <PostPageNav {...routeProps} member={member} />
          }}
        />
        <Route
          path='/messages/:messageId'
          render={routeProps => {
            const { messageId } = routeProps.match.params
            const message = findMessage(messages, messageId) || {}
            const member = findMessageMember(members, message.memberid)
            return <PostPageNav {...routeProps} member={member} />
          }}
        />
        {/* Other Routes -- Back Button */}
        <Route path='/add-member' component={PostPageNav} />
        <Route path='/add-post' component={PostPageNav} />
        <Route path='/add-message' component={PostPageNav} />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {/* Main Route */}
        {['/', '/members/:memberid'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              return <PostListMain {...routeProps} />
            }}
          />
        ))}
        {/* Post Route */}
        <Route
          path='/posts/:postId'
          render={routeProps => {
            return <PostPageMain {...routeProps} />
          }}
        />
        {/* Message Route */}
        <Route
          exact
          path='/messages'
          render={routeProps => {
            return <MessageListMain {...routeProps} />
          }}
        />
        <Route
          path='/messages/:messageId'
          render={routeProps => {
            return <MessagePageMain {...routeProps} />
          }}
        />
        {/* Add-Member Route */}
        <Route path='/add-member' component={AddMember} />
        {/* Add-Message Route */}
        <Route path='/add-message' component={AddMessage} />
        {/* Add-Post Route */}
        <Route path='/add-post' component={AddPost} />
      </>
    )
  }
  render() {
    return (
      <ApiContext.Provider
        value={{
          members: this.state.members,
          messages: this.state.messages,
          posts: this.state.posts,
          handleAddMember: this.handleAddMember,
          handleAddMessage: this.handleAddMessage,
          handleDeleteMessage: this.handleDeleteMessage,
          handleAddPost: this.handleAddPost,
          handleDeletePost: this.handleDeletePost,
        }}
      >
        <div className='App'>
          <ConnectivityError>
            <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          </ConnectivityError>
          <header className='App__header'>
            <h1>
              <Link to='/'>Connectivity</Link>{' '}
              <FontAwesomeIcon icon={['fa', 'check-double']} />
            </h1>
          </header>
          <ConnectivityError>
            <main className='App__main'>{this.renderMainRoutes()}</main>
          </ConnectivityError>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default withRouter(App)