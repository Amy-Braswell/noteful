import React from 'react'
import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import { findMember } from '../members-helpers'
import { countPostsForMember } from '../../Posts/posts-helpers'
import { countMessagesForMember } from '../../Messages/messages-helpers'
import { getMessagesFromMember } from '../../Messages/messages-helpers'
import ConnectivityButton from '../../ConnectivityButton/ConnectivityButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Message from '../../Messages/Message/Message'
import './MemberPageMain.css'



export default class MemberPageMain extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { 
        window.history.back()
       }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext


  render(){
    const { members=[], posts = [], messages = [] } = this.context
    const { memberId } = this.props.match.params
    const member = findMember(members, memberId) || { content: '' }
    const messagesFromMember = getMessagesFromMember(messages, memberId)
    
    return(
        <section>
          <div className='ItemPageMain'>
            <div className='Main__button-container'>
              <ConnectivityButton
                tag='button'
                role='link'
                onClick={() => this.props.history.goBack()}
                className='Nav__back-button'
              >
                <FontAwesomeIcon icon={['fa', 'chevron-left']} />
                <br />
                Back
              </ConnectivityButton>
            </div>

            <div className='ItemPageMain__content'>
              <div className='member__page__main__flexbox-container'>
                {/* <div className='member__page__img'>
                  <img 
                      src={require(`../../Images/User_${memberId}.jpg`)} 
                      alt='member headshot'
                  >
                  </img>    
                </div>   */}


                <div className='member__page__info'>
                  <h3 className='Member__nickname'>
                    {member.nickname} {' '} ({member.full_name}) 
                  </h3>
                  <p className='Member__location'>
                    Lives In:{' '}{member.city}, {member.state}
                  </p>
                  <p className='Member__email'>
                    Email:{' '}{member.email}
                  </p>
                  <p className='Member__about'>
                    About:{' '}{member.about}
                  </p> 
                </div>
              </div>
            </div>
          </div>

          <div className='Member__activity'>
              <div className='Member__activity__section'>
              <Link to={`/member-post-list`}>                                 
                <h3 className='SectionTitle'>Public Posts From This Member:{' '}{countPostsForMember(posts, member.id)} </h3>
              </Link>    
              </div>

              <div className='Member__activity__section'>
                <h3 className='SectionTitle'>Private Messages From This Member:{' '}{countMessagesForMember(messages, member.id)}</h3>
                  <ul>
                    {messagesFromMember.map(message =>
                      <li key={message.id}>
                        <Message
                          id={message.id}
                          content={message.content}
                          nickname={message.nickname}
                          modified={message.modified}
                        />
                      </li>
                    )}
                  </ul>
              </div>

          </div>
        </section>
    )
  }
}