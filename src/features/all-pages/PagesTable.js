import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import { ChevronDown, ChevronUp, Trash, Download } from 'react-bootstrap-icons'

import { save } from '../io/io'
import { serialize, flattenTreeIds } from '../block/blockModel'
import { updateBlock, removePage } from '../block/blockSlice'
import { popView } from '../view-pane/viewPaneSlice'
import { removeShortcut } from '../file-pane/filePaneSlice'
import { removeBlockLinks } from '../links/linksSlice'

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const PagesTable = ({ columns, data }) => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)
  const linksToBlocks = useSelector(state => state.links.to)

  const downloadRows = rows => {
    if (!rows.length) {
      return
    }
    const files = rows
      .map(row => row.original.blockId)
      .map(blockId => {
        const block = blocks[blockId]
        return { content: serialize(block, blocks), fileName: `${block.text}.json`}
      })
    save(files)
  }

  /**
   * Delete pages
   * This will:
   *   - Remove all children blocks of pages
   *   - Remove all links to and from the pages' children blocks
   *   - Remove all shortcuts to pages
   * @param {object} rows - table rows
   */
  const deleteRows = rows => {
    if (!rows.length) {
      return
    }
    rows
      .map(row => row.original.blockId)
      .map(blockId => {
        const block = blocks[blockId]
        const treeIds = flattenTreeIds(blocks[blockId], blocks)
        treeIds.map(treeBlockId => {
          dispatch(popView({ type: 'all', blockId: treeBlockId }))
          const blocksLinkingToBlockId = linksToBlocks[treeBlockId] || []
          blocksLinkingToBlockId.map(sourceBlockId => {
            const sourceBlock = blocks[sourceBlockId]
            const linkRegex = new RegExp(`\\[\\[(${block.text})\\]\\]`, 'g')
            const updatedText = sourceBlock.text.replace(linkRegex, '$1')
            dispatch(updateBlock({ blockId: sourceBlockId, text: updatedText }))
            return true
          })
          dispatch(removeBlockLinks({ blockId: treeBlockId }))
          return true
        })
        dispatch(removeShortcut({ blockId }))
        dispatch(removePage({ blockId }))
        return true
      })
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )
  return (
    <>
      <div className="all-pages__toolbar">
        <Trash
          onClick={() => deleteRows(selectedFlatRows)}
          className={`mr-3 all-pages__button${Object.keys(selectedRowIds).length ? ' active': ''}`}
        />
        <Download
          onClick={() => downloadRows(selectedFlatRows)}
          className={`all-pages__button${Object.keys(selectedRowIds).length ? ' active': ''}`}
        />
        <div className="flex-grow-1" />
      </div>
      <table className="table table-dark" {...getTableProps()}>
        <thead className="thead-dark">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th scope="col" {...column.getHeaderProps([
                  {
                    className: column.className,
                  },
                  column.getSortByToggleProps(),
                ])}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <ChevronDown color="white" />
                        : <ChevronUp color="white" />
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps([
                        {
                          className: cell.column.className,
                        }
                      ])}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </>
  )
}

export default PagesTable