import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MemberListMain from './MemberListMain'

describe(`MemberListMain component`, () => {
  it('renders a .MemberListMain by default', () => {
    const wrapper = shallow(<MemberListMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip('renders a Member in ul for each members in array', () => {
    const props = {
      match: {
        params: {
          memberid: 'THIS_MEMBER_ID'
        }
      }
    }
    const context = {
      members: [
        {
          "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Dogs",
          "modified": "2019-01-03T00:00:00.000Z",
          "memberid": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Corporis accusamus placeat.\n \rUnde."
        },
        {
          "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Cats",
          "modified": "2018-08-15T23:00:00.000Z",
          "memberid": "THIS_MEMBER_ID",
          "content": "Eos\n \rlaudantium."
        },
        {
          "id": "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Pigs",
          "modified": "2018-03-01T00:00:00.000Z",
          "memberid": "THIS_MEMBER_ID",
          "content": "Occaecati dignissimos\nvoluptatum nihil."
        },
        {
          "id": "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
          "name": "Birds",
          "modified": "2019-01-04T00:00:00.000Z",
          "memberid": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          "content": "Eum culpa odit."
        },
      ]
    }
    const ul = shallow(<MemberListMain {...props} />, context)
      .find('ul')
    expect(toJson(ul)).toMatchSnapshot()
  })
})