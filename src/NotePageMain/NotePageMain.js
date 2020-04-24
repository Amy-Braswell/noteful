import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  handleButtonClick = (noteId) => {
    this.context.handleEditNote(noteId)
  }

  render(){
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return(
        <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
          onEditNote={this.handleEditNote}
        />

        <button
          className='Note__edit'
          type='button'
          onClick={() => this.handleButtonClick(noteId)}
        >
          <Link to={`/edit-note`}>
            <FontAwesomeIcon 
              icon={['fa', 'edit']}
            />
            {' '}
            edit
          </Link>
        </button>

        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}