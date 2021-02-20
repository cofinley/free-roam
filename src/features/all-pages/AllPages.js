import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import PagesTable from './PagesTable'
import { DAILY_NOTE_DISPLAY_FORMAT } from '../block/blockModel'
import PageLink from '../links/PageLink'
import { pushView } from '../view-pane/viewPaneSlice'

import './all-pages.scss'

dayjs.extend(advancedFormat)

const getData = (blocks, linksToBlocks) => {
  return Object.values(blocks)
    .filter(block => !block.parentId)
    .map(block => ({
      text: block.text,
      blockId: block.id,
      created: block.created,
      updated: block.updated,
      mentions: linksToBlocks[block.id] || [],
      dailyNote: !!block.dailyNote
    }))
}


const AllPages = props => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)
  const linksToBlocks = useSelector(state => state.links.to)

  const onMentionClick = useCallback((blockId, event) => {
    dispatch(pushView({ type: 'references', blockId }))
  }, [dispatch])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        className: 'font-weight-bold',
        accessor: (row) => <PageLink key={row.blockId} blockId={row.blockId}>{row.text}</PageLink>,
        sortType: (rowA, rowB, id, desc) => rowA.original.text.localeCompare(rowB.original.text)
      }, {
        Header: 'Mentions',
        accessor: 'mentions',
        className: 'text-center',
        Cell: ({ row, value }) => <div className="mentions-bubble" onClick={onMentionClick.bind(null, row.original.blockId)}><span>{value.length}</span></div>,
        sortType: (rowA, rowB, id, desc) => rowA.original.mentions.length - rowB.original.mentions.length
      }, {
        Header: 'Updated',
        accessor: 'updated',
        className: 'text-right',
        Cell: ({ value }) => value ? dayjs(value).format(DAILY_NOTE_DISPLAY_FORMAT) : null
      }, {
        Header: 'Created',
        accessor: 'created',
        className: 'text-right',
        Cell: ({ value }) => value ? dayjs(value).format(DAILY_NOTE_DISPLAY_FORMAT) : null
      }, {
        Header: 'Daily Note?',
        accessor: 'dailyNote',
        show: false
      }
    ],
    [onMentionClick]
  )

  const data = React.useMemo(() => getData(blocks, linksToBlocks), [blocks, linksToBlocks])

  return (
    <div className="all-pages">
      <PagesTable columns={columns} data={data} />
    </div>
  )
}

export default AllPages