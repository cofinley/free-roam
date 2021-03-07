import React from 'react'
import { useSelector } from 'react-redux'
import { CaretRightFill, List } from "react-bootstrap-icons";

import './view-pane.scss'

import ViewPaneBlock from './ViewPaneBlock'

const ViewPane = ({ setShowViewPane }) => {
  const views = useSelector(state => state.viewPane.views)
  const viewPaneBlocks = views.map(view => <ViewPaneBlock view={view} />)

  return (
    <div className="pane view-pane">
      <div className="hide-sidebar" onClick={() => setShowViewPane(false)}>
        <div className="hide-sidebar__button">
          <List size={20}/>
          <CaretRightFill size={10} style={{marginLeft: "-3px"}} />
        </div>
      </div>
      {viewPaneBlocks}
    </div>
  )
}

export default ViewPane