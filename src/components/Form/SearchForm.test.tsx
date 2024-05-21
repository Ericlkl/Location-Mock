import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchForm from './SearchForm'

describe('SearchForm', () => {
  it('should renders Total distance and Total time when queryState.status is success', () => {
    render(<SearchForm
            origin={"origin"}
            setOrigin={() => {}}
            destination={"destination"}
            setDestination={() => {}}
            queryState={{ status: "success", total_time: 1000, total_distance: 2000, path: [] }}
            onReset={() => {}}
            onSubmit={() => {}}
      />)

  
    expect(screen.getByText("Total distance: 2000")).toBeDefined();
    expect(screen.getByText("Total time: 1000")).toBeDefined();
  })

  it('should renders error message when queryState.status is failure', () => {
    render(<SearchForm
            origin={"origin"}
            setOrigin={() => {}}
            destination={"destination"}
            setDestination={() => {}}
            queryState={{ status: "failure", error: "Error Message" }}
            onReset={() => {}}
            onSubmit={() => {}}
      />)
    expect(screen.getByText("Error Message")).toBeDefined();
  })
})