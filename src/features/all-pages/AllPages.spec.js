import { MemoryRouter } from 'react-router-dom'
import { within } from '@testing-library/react'

import AllPages from './AllPages'
import { BlockModel } from '../block/blockModel'
import { render, screen } from '../../testUtils'

describe('<AllPages />', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AllPages />
      </MemoryRouter>,
      { initialState: { blocks: {} } }
    )
    const mentionsElement = screen.getByText('Mentions')
    expect(mentionsElement).toBeInTheDocument()
  })

  it('displays pages', () => {
    const page = BlockModel({ parentId: null, text: "I'm a page!" }, {})
    render(
      <MemoryRouter>
        <AllPages />
      </MemoryRouter>,
      {
        initialState: {
          blocks: {
            [page.id]: page
          }
        }
      }
    )
    const rows = screen.queryAllByRole('row')
    const expectedRows = 1
    expect(rows).toHaveLength(expectedRows + 1)
    const singlePage = screen.getByText("I'm a page!")
    expect(singlePage).toBeInTheDocument()
  })

  it('does not displays non-page blocks', () => {
    const block = BlockModel({ parentId: 'my-parent-page-id', text: "I'm a child block!" }, {})
    render(
      <MemoryRouter>
        <AllPages />
      </MemoryRouter>,
      {
        initialState: {
          blocks: {
            [block.id]: block
          }
        }
      }
    )
    const rows = screen.queryAllByRole('row')
    const expectedRows = 0
    expect(rows).toHaveLength(expectedRows + 1)
    const childBlock = screen.queryByText("I'm a child block!")
    expect(childBlock).toBeNull()
  })

  it('displays the number of links/mentions to each page', () => {
    const firstPage = BlockModel({ id: 'first-page', parentId: null, text: "I'm the first page" }, {})
    const secondPage = BlockModel({ id: 'second-page', parentId: null, text: "I'm the second page" }, {})
    render(
      <MemoryRouter>
        <AllPages />
      </MemoryRouter>,
      {
        initialState: {
          blocks: {
            [firstPage.id]: firstPage,
            [secondPage.id]: secondPage,
          },
          links: {
            to: {
              'first-page': ['second-page']
            }
          }
        }
      }
    )
    const rows = screen.queryAllByRole('row')
    const expectedRows = 2
    expect(rows).toHaveLength(expectedRows + 1)

    const mentionsColumnIndex = 2

    const [header, firstRow, secondRow] = rows
    const firstPageRow = within(firstRow).queryByText(firstPage.text) ? firstRow : secondRow
    const secondPageRow = within(firstRow).queryByText(firstPage.text) ? secondRow : firstRow

    const firstPageRowCells = within(firstPageRow).getAllByRole('cell')
    const firstPageRowMentions = firstPageRowCells[mentionsColumnIndex]
    expect(parseInt(firstPageRowMentions.textContent)).toEqual(1)

    const secondPageRowCells = within(secondPageRow).getAllByRole('cell')
    const secondPageRowMentions = secondPageRowCells[mentionsColumnIndex]
    expect(parseInt(secondPageRowMentions.textContent)).toEqual(0)
  })
})