import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import PagesTable from './PagesTable'
import { DAILY_NOTE_DISPLAY_FORMAT } from '../block/blockModel'
import PageLink from '../links/PageLink'

dayjs.extend(advancedFormat)

const getData = (blocks, linksToBlocks) => {
  return Object.values(blocks)
    .filter(block => !block.parentId)
    .map(block => ({
      text: block.text,
      blockId: block.id,
      created: block.created,
      updated: block.updated,
      mentions: linksToBlocks[block.id] || []
    }))
}


const AllPages = props => {
  const blocks = useSelector(state => state.blocks)
  const linksToBlocks = useSelector(state => state.links.to)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: (row) => <PageLink key={row.blockId} pageBlockId={row.blockId}>{row.text}</PageLink>,
        sortType: (rowA, rowB, id, desc) => rowA.original.text.localeCompare(rowB.original.text)
      }, {
        Header: 'Mentions',
        accessor: 'mentions',
        Cell: ({ value }) => value.length,
        sortType: (rowA, rowB, id, desc) => rowA.original.mentions.length - rowB.original.mentions.length
      }, {
        Header: 'Updated',
        accessor: 'updated',
        Cell: ({ value }) => value ? dayjs(value).format(DAILY_NOTE_DISPLAY_FORMAT) : null
      }, {
        Header: 'Created',
        accessor: 'created',
        Cell: ({ value }) => value ? dayjs(value).format(DAILY_NOTE_DISPLAY_FORMAT) : null
      }
    ],
    []
  )

  const data = React.useMemo(() => getData(blocks, linksToBlocks), [blocks, linksToBlocks])

  return (
    <div className="all-pages">
      <PagesTable columns={columns} data={data} />
    </div>
  )
}

export default AllPages